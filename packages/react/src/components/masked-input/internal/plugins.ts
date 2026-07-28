import type { MaskitoElement, MaskitoPlugin } from '@maskito/core';

/**
 * A plugin that deletes fixed characters when pressing Backspace or Delete until it reaches a masked position.
 */
export function deleteFixedCharsPlugin(mask: Array<RegExp | string>): MaskitoPlugin {
    function isFixed(pos: number): boolean {
        return typeof mask[pos] === 'string';
    }

    return (element: MaskitoElement) => {
        function handleKeyDown(event: Event): void {
            const { key } = event as KeyboardEvent;
            const { selectionStart, selectionEnd, value } = element;

            if (selectionStart === null || selectionEnd === null || selectionStart !== selectionEnd) {
                return;
            }

            if (key === 'Backspace') {
                let pos = selectionStart - 1;
                if (pos < 0 || !isFixed(pos)) {
                    return;
                }
                while (pos > 0 && isFixed(pos - 1)) {
                    pos -= 1;
                }
                if (pos === 0) {
                    return;
                }

                const hasDataAfterCursor = value.slice(selectionStart)
                    .split('')
                    .some((_, i) => !isFixed(selectionStart + i));
                if (hasDataAfterCursor) {
                    element.setSelectionRange(pos, pos);
                } else {
                    event.preventDefault();
                    (element as HTMLInputElement).setRangeText('', pos - 1, selectionStart, 'end');
                    element.dispatchEvent(new Event('input', { bubbles: true }));
                }
            } else if (key === 'Delete') {
                let pos = selectionStart;
                if (pos >= value.length || !isFixed(pos)) {
                    return;
                }
                while (pos < value.length - 1 && isFixed(pos + 1)) {
                    pos += 1;
                }
                if (pos < value.length - 1) {
                    element.setSelectionRange(pos + 1, pos + 1);
                }
            }
        }

        element.addEventListener('keydown', handleKeyDown, { capture: true });
        return () => element.removeEventListener('keydown', handleKeyDown, { capture: true });
    };
}
