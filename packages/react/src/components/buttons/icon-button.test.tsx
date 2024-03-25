import { shallow } from 'enzyme';
import { mountWithProviders, mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { IconButton } from './icon-button';

describe('Icon Button', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
                onClick={callback}
            />,
        );

        wrapper.simulate('click');
        expect(callback).toHaveBeenCalled();
    });

    test('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <IconButton
                label="home"
                iconName="home"
                onClick={callback}
                buttonType="primary"
                disabled
            />,
        );

        wrapper.simulate('click');
        expect(callback).not.toHaveBeenCalled();
    });

    test('Has disabled styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
                disabled
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has primary styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has secondary styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="secondary"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has tertiary styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="tertiary"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has destructive-secondary styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="destructive-secondary"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has small styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
                size="small"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has mobile styles', () => {
        const tree = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
            />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('focusable button has no tabIndex prop', () => {
        const wrapper = mountWithProviders(<IconButton
            iconName="home"
            buttonType="primary"
            label="home"
        />);

        expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBeNull();
    });

    test('non-focusable button has tabIndex=-1', () => {
        const wrapper = mountWithProviders(<IconButton
            iconName="home"
            buttonType="primary"
            label="home"
            focusable={false}
        />);

        expect(wrapper.getDOMNode().getAttribute('tabIndex')).toBe('-1');
    });

    test('focusable button has focus styles', () => {
        const wrapper = mountWithProviders(<IconButton
            iconName="home"
            buttonType="primary"
            label="home"
        />);

        expect(wrapper).toHaveStyleRule('outline', '2px solid #84C6EA', {
            modifier: ':focus',
        });
    });

    test('non-focusable button does not have focus styles', () => {
        const wrapper = mountWithProviders(<IconButton
            iconName="home"
            buttonType="primary"
            label="home"
            focusable={false}
        />);

        expect(wrapper).not.toHaveStyleRule('outline', 'none', {
            modifier: ':focus',
        });
    });
});
