import { mount } from 'enzyme';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { GlobalNavigation, GlobalNavigationItem } from './global-navigation';

function setup(children: ReactElement): ReactElement {
    return (
        <Router>
            {ThemeWrapped(children)}
        </Router>
    );
}

const items: GlobalNavigationItem[] = [
    {
        iconName: 'home',
        name: 'test',
        href: '/test1',
    },
    {
        iconName: 'edit',
        name: 'test',
        href: '/test2',
    },
    {
        iconName: 'mapPin',
        name: 'test',
        href: '/test3',
    },
    {
        iconName: 'mail',
        name: 'test',
        href: '/test4',
    },
    {
        iconName: 'phone',
        name: 'test',
        href: '/test5',
    },
];

const footerItems: GlobalNavigationItem[] = [
    {
        iconName: 'info',
        name: 'test',
        href: '/test6',
    },
    {
        iconName: 'helpCircle',
        name: 'test',
        href: '/test7',
    },
];

describe('Global Navigation', () => {
    test('Has showMore icon', () => {
        const wrapper = mount(
            setup(
                <div style={{ height: '600px' }}>
                    <GlobalNavigation mainItems={items} footerItems={footerItems} />
                </div>,
            ),
        );

        expect(wrapper.find('[data-testid="showMoreIcon"]').at(0).length).toBe(1);
    });

    test('Matches snapshot', () => {
        const tree = renderer.create(
            setup(
                <div style={{ height: '600px' }}>
                    <GlobalNavigation mainItems={items} footerItems={footerItems} />
                </div>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });
});
