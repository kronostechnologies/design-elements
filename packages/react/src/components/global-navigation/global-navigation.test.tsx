import { mount } from 'enzyme';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import renderer from 'react-test-renderer';

import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { IconButton } from '../buttons/icon-button';
import { GlobalNavigation } from './global-navigation';

const setup = (children: ReactElement) => (
    <Router>
        {ThemeWrapped(children)}
    </Router>
);

const items = [
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

describe('Global Navigation', () => {
    test('Has more icon button', () => {
        const wrapper = mount(
            setup(
                <div style={{ height: '600px' }}>
                    <GlobalNavigation
                        mainItems={items}
                        routerLink={NavLink}
                        footerItems={[
                            {
                                iconName: 'info',
                                name: 'story',
                                href: '/story6',
                            },
                            {
                                iconName: 'helpCircle',
                                name: 'story',
                                href: '/story7',
                            },
                        ]}
                    />
                </div>,
            ),
        );

        expect(wrapper.find(IconButton).length).toBe(1);
    });

    test('Matches snapshot', () => {
        const tree = renderer.create(
            setup(
                <div style={{ height: '600px' }}>
                    <GlobalNavigation
                        mainItems={items}
                        routerLink={NavLink}
                        footerItems={[
                            {
                                iconName: 'info',
                                name: 'story',
                                href: '/story6',
                            },
                            {
                                iconName: 'helpCircle',
                                name: 'story',
                                href: '/story7',
                            },
                        ]}
                    />
                </div>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });
});
