import { shallow } from 'enzyme';
import { doNothing } from '../../test-utils/callbacks';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { Button } from './button';
import { getByTestId } from '../../test-utils/enzyme-selectors';

describe('Button', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<Button onClick={callback} buttonType="primary" label="Primary Button" />);

        wrapper.simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(
            <Button
                onClick={callback}
                buttonType="primary"
                disabled
                label="Primary Button"
            />,
        );

        wrapper.simulate('click');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('has primary disabled styles', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" disabled label="Primary Button" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has primary styles', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Primary Button" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has primary styles (inverted)', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Primary Button" inverted />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has secondary styles', () => {
        const tree = renderWithProviders(
            <Button
                onClick={doNothing}
                buttonType="secondary"
                label="Secondary Button"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has secondary styles (inverted)', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="secondary" label="Secondary Button" inverted />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has tertiary styles', () => {
        const tree = renderWithProviders(<Button onClick={doNothing} buttonType="tertiary" label="Tertiary Button" />);

        expect(tree).toMatchSnapshot();
    });

    test('has tertiary styles (inverted)', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="tertiary" label="Tertiary Button" inverted />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has destructive styles', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="destructive-primary" label="Destructive Button" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has destructive styles (inverted)', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="destructive-primary" label="Destructive Button" inverted />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has destructive-secondary styles', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="destructive-primary" label="Destructive Button" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has destructive-secondary styles (inverted)', () => {
        const tree = renderWithProviders(
            <Button
                onClick={doNothing}
                buttonType="destructive-secondary"
                label="Destructive Secondary Button"
                inverted
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has small styles', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Small Primary Button" size="small" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has mobile styles', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Primary Button" />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('has small styles on mobile', () => {
        const tree = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Small Primary Button" size="small" />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('focusable button has no tabIndex prop', () => {
        const wrapper = mountWithProviders(<Button buttonType="primary" label="Primary Button" />);

        expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBeNull();
    });

    test('non-focusable button has tabIndex=-1', () => {
        const wrapper = mountWithProviders(<Button buttonType="primary" label="Primary Button" focusable={false} />);

        expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe('-1');
    });

    test('focusable button has focus styles', () => {
        const wrapper = mountWithProviders(<Button buttonType="primary" label="Primary Button" />);

        expect(wrapper).toHaveStyleRule('outline', '2px solid #84C6EA', {
            modifier: ':focus-visible',
        });
    });

    test('non-focusable button does not have focus styles', () => {
        const wrapper = mountWithProviders(<Button buttonType="primary" label="Primary Button" focusable={false} />);

        expect(wrapper).not.toHaveStyleRule('outline', 'none', {
            modifier: ':focus',
        });
    });

    test('icons can be placed left and right of the button', () => {
        const wrapper = shallow(
            <Button
                buttonType="primary"
                label="Primary Button"
                leftIconName="chevronLeft"
                rightIconName="chevronRight"
            />,
        );

        expect(getByTestId(wrapper, 'left-icon')).toHaveLength(1);
        expect(getByTestId(wrapper, 'right-icon')).toHaveLength(1);
    });

    test('icons can be placed on one side of the button', () => {
        const wrapper = shallow(
            <Button
                buttonType="primary"
                label="Primary Button"
                rightIconName="chevronRight"
            />,
        );

        expect(getByTestId(wrapper, 'left-icon')).toHaveLength(0);
        expect(getByTestId(wrapper, 'right-icon')).toHaveLength(1);
    });

    test('has left and right icons', () => {
        const tree = renderWithProviders(
            <Button
                buttonType="primary"
                label="Primary Button"
                leftIconName="chevronLeft"
                rightIconName="chevronRight"

            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
