export function calculateShownPageRange(
    totalPages: number,
    pagesShown: number,
    currentPage: number,
): PageRange {
    const concretePagesShown = Math.min(totalPages, pagesShown);
    const pagesOnEachSide = (concretePagesShown - 1) / 2;
    const pagesOnLeft = Math.ceil(pagesOnEachSide);
    const pagesOnRight = Math.floor(pagesOnEachSide);
    const pageRange = { begin: currentPage - pagesOnLeft, end: currentPage + pagesOnRight };
    return clampPageRange(pageRange, totalPages);
}

function clampPageRange(currentRange: PageRange, totalPages: number): PageRange {
    const { begin, end } = currentRange;
    let rangeShift = 0;
    if (begin < 1) {
        rangeShift = 1 - begin;
    } else if (end > totalPages) {
        rangeShift = totalPages - end;
    }
    return { begin: begin + rangeShift, end: end + rangeShift };
}

interface PageRange {
    begin: number;
    end: number;
}
