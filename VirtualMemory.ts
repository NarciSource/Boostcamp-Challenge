type Page = { address: Address; space: number[] };
type Address = number;

const PAGE_SIZE = 1024;

export default class VirtualMemory {
    currentPage: Page;
    currentPageIndex: number;
    swapFile: Page[];
    #pageInCount = 0;
    #pageOutCount = 0;

    init(baseAddress: number) {
        if (baseAddress < 0xf000 || baseAddress > 0xfa00) {
            throw "Error";
        }

        this.swapFile = Array.from({ length: 8 }).map((value, idx) => ({
            address: baseAddress + idx * PAGE_SIZE,
            space: Array.from({ length: PAGE_SIZE }),
        }));

        this.currentPage = this.swapFile[0];
        this.currentPageIndex = 0;
    }

    #pageIn(index: number) {
        this.currentPage = this.swapFile[index];
        this.#pageInCount++;
    }

    #pageOut(index: number) {
        this.swapFile[index] = this.currentPage;
        this.#pageOutCount++;
    }

    alloc(size: number, length: number): Address {
        for (let index = 0; index < 8; index++) {
            const page = this.swapFile[index];

            this.#pageOut(index);
            this.#pageIn(index);

            if (page.space.length > size * length) {
                return page[0];
            }
        }
        return 0;
    }

    find_page(target_address: Address): number {
        return this.swapFile.findIndex(
            ({ address }) => address < target_address && target_address < address + PAGE_SIZE,
        );
    }

    read(address: Address): number[] {
        let page: Page;
        if (this.currentPage.address < address && address < this.currentPage.address + PAGE_SIZE) {
            page = this.currentPage;
        } else {
            const index = this.find_page(address);

            this.#pageOut(index);
            this.#pageIn(index);

            page = this.swapFile[index];
        }

        return this.currentPage.space.slice(8);
    }

    write(address: Address, value: number[]): void {
        let page: Page;
        if (this.currentPage.address < address && address < this.currentPage.address + PAGE_SIZE) {
            page = this.currentPage;

            this.#pageOut(this.currentPageIndex);
        } else {
            const index = this.find_page(address);

            this.#pageOut(index);
            this.#pageIn(index);

            page = this.swapFile[index];
        }
        this.currentPage.space = value;
    }

    report(): [number, number] {
        return [this.#pageInCount, this.#pageOutCount];
    }

    free(address: Address) {
        const index = this.find_page(address);

        this.swapFile[index] = {
            ...this.swapFile[index],
            space: Array.from({ length: PAGE_SIZE }),
        };
    }
}
