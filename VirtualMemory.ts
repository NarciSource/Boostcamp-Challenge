type Page = number[];
type Address = number;

const PAGE_SIZE = 1024;

export default class VirtualMemory {
    currentPage: Page;
    currentPageIndex: number;
    swapFile: Page[];

    init(baseAddress: number) {
        if (baseAddress < 0xf000 || baseAddress > 0xfa00) {
            throw "Error";
        }

        this.swapFile = Array.from({ length: 8 }, () => Array.from({ length: PAGE_SIZE }));

        this.currentPage = this.swapFile[0];

        this.currentPageIndex = 0;
    }

    #pageIn() {}

    #pageOut() {}

    alloc(size: number, length: number): Address {
        for (let i = 0; i < 8; i++) {
            this.currentPageIndex++;
            const page = this.swapFile[this.currentPageIndex];
            this.currentPage = page;

            if (page.length > size * length) {
                return page[0];
            } else {
                this.#pageOut();
                this.#pageIn();
            }
        }
        return 0;
    }

    read(address: Address): number[] {
        if (this.currentPage.includes(address)) {
            return this.currentPage.slice(8);
        } else {
            this.#pageOut();
            this.#pageIn();
        }

        return null;
    }

    write(address: Address, value: number[]) {
        if (this.currentPage.includes(address)) {
            this.currentPage = value;

            this.#pageOut();
        }
        else {
            this.#pageOut();
            this.#pageIn();
        }
    }
}
