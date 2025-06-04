import { renderWithProviders } from '../../test-utils/renderer';
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
    test('matches snapshot', () => {
        const { container } = renderWithProviders(
            <div style={{ height: '600px' }}>
                <GlobalNavigation mainItems={items} footerItems={footerItems} coreActionButton={coreActionButton} />
            </div>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
