import { ReactWrapper } from 'enzyme';
import { act } from 'react-dom/test-utils';

export async function waitForComponentToPaint<P = {}>(
    wrapper: ReactWrapper<P>,
    amount = 0,
): Promise<void> {
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, amount));
        wrapper.update();
    });
}

export function expectFocusToBeOn(element: ReactWrapper): void {
    expect(document.activeElement).toBe(element.getDOMNode());
}
