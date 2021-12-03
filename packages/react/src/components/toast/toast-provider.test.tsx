import { VoidFunctionComponent } from 'react';
import { useToasts } from '../../hooks/use-toasts';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { actAndWaitForEffects, mountWithProviders } from '../../test-utils/renderer';

const MESSAGE = 'A message';

const TestConsumer: VoidFunctionComponent = () => {
    const { addToast, removeToast, toasts } = useToasts();

    return (
        <>
            <button type="button" data-testid="btn-add" onClick={() => addToast('success', MESSAGE)} />
            <button type="button" data-testid="btn-remove" onClick={() => removeToast(toasts[0]?.id || '')} />
            {toasts.map((toast, i) => (
                <div key={toast.id} data-testid={`toast-${i}`}>{toast.message}</div>
            ))}
        </>
    );
};

describe('ToastProvider', () => {
    it('should add toast to context', () => {
        const wrapper = mountWithProviders(<TestConsumer />);

        getByTestId(wrapper, 'btn-add').simulate('click');

        const toast = getByTestId(wrapper, 'toast-0');
        expect(toast.text()).toBe(MESSAGE);
        expect(toast.key()).toBeDefined();
    });

    it('should remove toast from context', () => {
        const wrapper = mountWithProviders(<TestConsumer />);
        getByTestId(wrapper, 'btn-add').simulate('click');

        getByTestId(wrapper, 'btn-remove').simulate('click');

        const toast = getByTestId(wrapper, 'toast-0');
        expect(toast.exists()).toBe(false);
    });

    it('should remove toast after dismiss time', async () => {
        jest.useFakeTimers();

        const wrapper = mountWithProviders(<TestConsumer />);
        getByTestId(wrapper, 'btn-add').simulate('click');

        await actAndWaitForEffects(wrapper, () => {
            jest.runAllTimers();
        });

        const toast = getByTestId(wrapper, 'toast-0');
        expect(toast.exists()).toBe(false);
    });
});
