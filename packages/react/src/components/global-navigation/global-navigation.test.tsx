import { mount } from 'enzyme';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { GlobalNavigation, GlobalNavigationItem } from './global-navigation';
import { ButtonProps } from '../buttons/icon-button';
import { findByTestId } from '../../test-utils/enzyme-selectors';

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

const coreActionButton: ButtonProps = {
    buttonType: 'primary',
    iconName: 'plusSign',
    label: 'add',
    type: 'button',
};

describe('Global Navigation', () => {
    test('Has showMore icon', () => {
        const wrapper = mount(
            setup(
                <div style={{ height: '600px' }}>
                    <GlobalNavigation mainItems={items} footerItems={footerItems} />
                </div>,
            ),
        );

        expect(findByTestId(wrapper, 'showMoreIcon').exists()).toBe(true);
    });

    test('Has CoreActionButton when needed', () => {
        const wrapper = mount(
            setup(
                <div style={{ height: '600px' }}>
                    <GlobalNavigation mainItems={items} footerItems={footerItems} coreActionButton={coreActionButton} />
                </div>,
            ),
        );

        expect(findByTestId(wrapper, 'coreActionButton').exists()).toBe(true);
    });

    test('Matches snapshot', () => {
        const tree = renderer.create(
            setup(
                <div style={{ height: '600px' }}>
                    <GlobalNavigation mainItems={items} footerItems={footerItems} coreActionButton={coreActionButton} />
                </div>,
            ),
        );

        expect(tree).toMatchSnapshot();
    });
});
