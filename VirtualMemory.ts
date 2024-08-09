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

    #pageIn() {
        this.currentPage = this.swapFile[this.currentPageIndex];
        this.#pageInCount++;
    }

    #pageOut() {
        this.swapFile[this.currentPageIndex] = this.currentPage;
        this.#pageOutCount++;
    }

    alloc(size: number, length: number): Address {
        for (let i = 0; i < 8; i++) {
            this.currentPageIndex++;
            const page = this.swapFile[this.currentPageIndex];
            this.currentPage = page;

            if (page.space.length > size * length) {
                return page[0];
            } else {
                this.#pageOut();
                this.#pageIn();
            }
        }
        return 0;
    }

    read(address: Address): number[] {
        if (this.currentPage.address < address && address < this.currentPage.address + PAGE_SIZE) {
            return this.currentPage.space.slice(8);
        } else {
            this.#pageOut();
            this.#pageIn();
        }

        return null;
    }

    write(address: Address, value: number[]) {
        if (this.currentPage.address < address && address < this.currentPage.address + PAGE_SIZE) {
            this.currentPage.space = value;

            this.#pageOut();
        } else {
            this.#pageOut();
            this.#pageIn();
        }
    }

    free(address: Address) {}
}
