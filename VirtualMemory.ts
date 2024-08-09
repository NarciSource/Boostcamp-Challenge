type Page = { address: Address; space: number[] };
type Address = number;

const PAGE_SIZE = 1024;
const FILE_SIZE = 8;

export default class VirtualMemory {
    currentPageIndex: number;
    swapFile: Page[];
    #pageInCount = 0;
    #pageOutCount = 0;

    init(baseAddress: number): void {
        if (baseAddress < 0xf000 || baseAddress > 0xfa00) {
            throw "Error";
        }

        this.swapFile = new Array(FILE_SIZE).fill(null).map((value, idx) => ({
            address: baseAddress + idx * PAGE_SIZE,
            space: new Array(PAGE_SIZE).fill(null),
        }));

        this.currentPageIndex = 0;
    }

    get currentPage(): Page {
        return this.swapFile[this.currentPageIndex];
    }

    #pageIn(index: number) {
        this.swapFile[this.currentPageIndex] = this.swapFile[index];
        this.#pageInCount++;
    }

    #pageOut(index: number) {
        this.swapFile[index] = this.currentPage;
        this.#pageOutCount++;
    }

    remain_space(page: Page): number {
        return page.space.filter((i) => !i).length;
    }

    alloc(size: number, length: number): Address {
        for (let index = 0; index < 8; index++) {
            const page = this.swapFile[index];

            this.#pageOut(index);
            this.#pageIn(index);

            if (this.remain_space(page) > size * length) {
                return page.address;
            }
        }
        return 0;
    }

    find_page(target_address: Address): number {
        return this.swapFile.findIndex(
            ({ address }) => address <= target_address && target_address <= address + PAGE_SIZE,
        );
    }

    read(address: Address): number[] {
        let page: Page;
        if (
            this.currentPage.address <= address &&
            address <= this.currentPage.address + PAGE_SIZE
        ) {
            page = this.currentPage;
        } else {
            const index = this.find_page(address);

            this.#pageOut(index);
            this.#pageIn(index);

            page = this.swapFile[index];
        }

        return page.space.slice(0, 8);
    }

    write(address: Address, value: number[]): void {
        let page: Page;
        if (
            this.currentPage.address <= address &&
            address <= this.currentPage.address + PAGE_SIZE
        ) {
            page = this.currentPage;

            this.#pageOut(this.currentPageIndex);
        } else {
            const index = this.find_page(address);

            this.#pageOut(index);
            this.#pageIn(index);

            page = this.swapFile[index];
        }
        page.space = value;
    }

    report(): [number, number] {
        return [this.#pageInCount, this.#pageOutCount];
    }

    free(address: Address) {
        const index = this.find_page(address);

        this.swapFile[index] = {
            ...this.swapFile[index],
            space: new Array(PAGE_SIZE).fill(null),
        };
    }

    peek(): string {
        return this.swapFile
            .flatMap(({ space }) => space.map((value) => value?.toString(16) || "").join(""))
            .join("");
    }
}
