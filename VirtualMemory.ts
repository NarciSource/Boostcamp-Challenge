type Page = number;

export default class VirtualMemory {
    currentPage: Page;
    currentPageIndex: number;
    swapFile: Page[];

    init(baseAddress: number) {
        this.swapFile = Array.from({ length: 8 }, (_, idx) => baseAddress + idx);

        this.currentPage = baseAddress;

        this.currentPageIndex = 0;
    }
}
