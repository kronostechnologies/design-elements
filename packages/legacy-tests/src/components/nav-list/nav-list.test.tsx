import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavList } from '~/components/nav-list/nav-list';
import { NavListOption } from '~/components/nav-list/nav-list-option';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { actAndWaitForEffects, mountWithProviders, renderWithTheme } from '../../test-utils/renderer';

const options: NavListOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testA',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testB',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testC',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testD',
    },
];

const optionsDisabled: NavListOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testA',
        disabled: true,
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testB',
        disabled: true,
    },
];

describe('NavList', () => {
    it('Calls onChange callback when an option is clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<NavList options={options} onChange={callback} />);

        getByTestId(wrapper, 'listitem-optionC').simulate('select');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Does not call onChange callback when a disabled option is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<NavList options={optionsDisabled} onChange={callback} />);

        getByTestId(wrapper, 'listitem-optionA').simulate('select');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    it('Calls onChange callback when enter key is pressed on option', () => {
        const callback = jest.fn();
        const wrapper = shallow(<NavList options={options} onChange={callback} />);

        getByTestId(wrapper, 'listitem-optionC').simulate('keydown', {
            key: 'Enter',
            preventDefault: jest.fn(),
            currentTarget: { click: jest.fn() },
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Calls onKeyDown callback when a key is pressed on option', () => {
        const callback = jest.fn();
        const wrapper = shallow(<NavList options={options} onKeyDown={callback} />);

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: '' });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Should update focused value when focusedValue prop changes', async () => {
        const wrapper = mountWithProviders(
            <NavList options={options} />,
            { attachTo: document.body },
        );

        await actAndWaitForEffects(wrapper, () => {
            wrapper.setProps({ focusedValue: 'optionB' });
        });

        expect(document.activeElement).toBe(getByTestId(wrapper, 'listitem-optionB-link').getDOMNode());
    });

    it('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <Router>
                <NavList options={options} />
            </Router>,
        );

        expect(tree).toMatchSnapshot();
    });
});
