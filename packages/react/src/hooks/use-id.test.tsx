import { act, renderHook } from '@testing-library/react-hooks';
import { mount } from 'enzyme';
import { ReactElement, useEffect, VoidFunctionComponent } from 'react';
import { getByTestId } from '../test-utils/enzyme-selectors';
import { resetId, useId } from './use-id';

const DummyComponent = ({ onRendered = () => undefined }: { onRendered?(): void }): ReactElement => {
    const id = useId('id-');

    useEffect(onRendered);

    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{id}</>;
};

const DummyContainer: VoidFunctionComponent = () => (
    <>
        <DummyComponent data-testid="dummy-1" />
        <DummyComponent data-testid="dummy-2" />
    </>
);

describe('useId', () => {
    beforeEach(() => {
        resetId();
    });

    it('should use prefix', async () => {
        const { result } = renderHook(useId, { initialProps: 'some-prefix-' });

        expect(result.current).toEqual('some-prefix-1');
    });

    it('should increment when used multiple times', () => {
        const wrapper = mount(<DummyContainer />);

        const dummy1 = getByTestId(wrapper, 'dummy-1');
        const dummy2 = getByTestId(wrapper, 'dummy-2');

        expect(dummy1.text()).toEqual('id-1');
        expect(dummy2.text()).toEqual('id-2');
    });

    it('should keep same id when re-rendering', () => {
        const onRendered = jest.fn();
        const wrapper = mount(<DummyComponent onRendered={onRendered} />);

        act(() => {
            wrapper.setProps({});
        });

        expect(wrapper.text()).toEqual('id-1');
        expect(onRendered).toHaveBeenCalledTimes(2);
    });
});
