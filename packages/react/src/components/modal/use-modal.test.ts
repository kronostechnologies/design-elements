import { act, renderHook } from '@testing-library/react-hooks';
import { useModal } from './use-modal';

describe('useModal', () => {
    it('should be initially hidden by default', () => {
        const { result } = renderHook(useModal);

        expect(result.current.isModalOpen).toBe(false);
    });

    describe('isModalOpen', () => {
        it('should be initially hidden when value is false', () => {
            const { result } = renderHook(useModal, { initialProps: false });

            expect(result.current.isModalOpen).toBe(false);
        });

        it('should be initially visible when value is true', () => {
            const { result } = renderHook(useModal, { initialProps: true });

            expect(result.current.isModalOpen).toBe(true);
        });
    });

    describe('openModal', () => {
        it('should be visible on open', () => {
            const { result } = renderHook(useModal);

            act(() => {
                result.current.openModal();
            });

            expect(result.current.isModalOpen).toBe(true);
        });

        it('should be visible on open when modal is already visible', () => {
            const { result } = renderHook(useModal, { initialProps: true });

            act(() => {
                result.current.openModal();
            });

            expect(result.current.isModalOpen).toBe(true);
        });
    });

    describe('closeModal', () => {
        it('should be hidden on close when modal is already hidden', () => {
            const { result } = renderHook(useModal);

            act(() => {
                result.current.closeModal();
            });

            expect(result.current.isModalOpen).toBe(false);
        });

        it('should be hidden on close', () => {
            const { result } = renderHook(useModal, { initialProps: true });

            act(() => {
                result.current.closeModal();
            });

            expect(result.current.isModalOpen).toBe(false);
        });
    });
});
