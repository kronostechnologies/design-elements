export function range(start: number, end: number): number[] {
    return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}

export function calculateShownPageRange(totalPages: number, pagesShown: number, currentPage: number):
{ begin: number, end: number} {
    const concretePagesShown = Math.min(totalPages, pagesShown);
    const pagesOnEachSide = (concretePagesShown - 1) / 2;
    const pagesOnLeft = Math.ceil(pagesOnEachSide);
    const pagesOnRight = Math.floor(pagesOnEachSide);
    let begin = currentPage - pagesOnLeft;
    let end = currentPage + pagesOnRight;
    let rangeShift = 0;
    if (begin < 1) {
        rangeShift = 1 - begin;
    } else if (end > totalPages) {
        rangeShift = totalPages - end;
    }
    begin += rangeShift;
    end += rangeShift;
    return { begin, end };
}
