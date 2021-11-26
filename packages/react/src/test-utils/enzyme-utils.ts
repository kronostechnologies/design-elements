import { act } from 'react-dom/test-utils';
import { ReactWrapper } from 'enzyme';

export async function waitForComponentToPaint<P = {}>(
    wrapper: ReactWrapper<P>,
    amount = 0,
): Promise<void> {
    await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, amount));
        wrapper.update();
    });
}
