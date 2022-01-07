import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { IconButtonProps } from '../buttons/icon-button';
import { GlobalNavigation, GlobalNavigationItem } from './global-navigation';

const items: GlobalNavigationItem[] = [
    {
        iconName: 'home',
        name: 'home',
        href: '/test1',
    },
    {
        iconName: 'edit',
        name: 'edit',
        href: '/test2',
    },
    {
        iconName: 'mapPin',
        name: 'map',
        href: '/test3',
    },
    {
        iconName: 'mail',
        name: 'mail',
        href: '/test4',
    },
    {
        iconName: 'phone',
        name: 'phone',
        href: '/test5',
    },
];

const footerItems: GlobalNavigationItem[] = [
    {
        iconName: 'info',
        name: 'info',
        href: '/test6',
    },
    {
        iconName: 'helpCircle',
        name: 'help',
        href: '/test7',
    },
];

const coreActionButton: IconButtonProps = {
    buttonType: 'primary',
    iconName: 'plusSign',
    label: 'add',
    type: 'button',
};

describe('Global Navigation', () => {
    test('opens show-more-menu when show-more-button is clicked', () => {
        const wrapper = mountWithProviders(
            <div style={{ height: '600px' }}>
                <GlobalNavigation mainItems={items} footerItems={footerItems} />
            </div>,
        );

        getByTestId(wrapper, 'show-more-button').simulate('click');

        expect(getByTestId(wrapper, 'show-more-menu').prop('open')).toBe(true);
    });

    test('calls onClick callback when item-link is clicked', () => {
        const callback = jest.fn();
        const testItem: GlobalNavigationItem[] = [
            {
                iconName: 'home',
                name: 'home',
                href: '/test1',
                onClick: callback,
            },
        ];
        const wrapper = shallow(<GlobalNavigation mainItems={testItem} footerItems={footerItems} />);

        getByTestId(wrapper, 'home-home-link').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('calls onClick callback when item-link is clicked inside show-more-menu', () => {
        const callback = jest.fn();
        const lastItem: GlobalNavigationItem = {
            iconName: 'info',
            name: 'info',
            href: '/info',
            onClick: callback,
        };
        const wrapper = mountWithProviders(
            <div style={{ height: '600px' }}>
                <GlobalNavigation mainItems={[...items, lastItem]} footerItems={footerItems} />
            </div>,
        );

        getByTestId(wrapper, `${lastItem.name}-${lastItem.iconName}-menu-link`).simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('has core-action-button when needed', () => {
        const wrapper = shallow(
            <GlobalNavigation mainItems={items} footerItems={footerItems} coreActionButton={coreActionButton} />,
        );

        expect(getByTestId(wrapper, 'core-action-button').exists()).toBe(true);
    });

    test('matches snapshot', () => {
        const tree = renderWithProviders(
            <div style={{ height: '600px' }}>
                <GlobalNavigation mainItems={items} footerItems={footerItems} coreActionButton={coreActionButton} />
            </div>,
        );

        expect(tree).toMatchSnapshot();
    });
});
