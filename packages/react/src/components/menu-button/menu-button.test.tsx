import { mount } from 'enzyme';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { mountWithTheme, renderWithTheme, shallowWithTheme } from '@design-elements/test-utils/renderer';
import { ThemeWrapped } from '@design-elements/test-utils/theme-wrapped';
import { MenuButton } from './menu-button';

jest.mock('uuid/v4');

describe('MenuButton', () => {
    test('Listbox is open given defaultOpen prop is set to true', () => {
        const wrapper = shallowWithTheme(<MenuButton defaultOpen label="Test Button" options={options}/>);

        expect(getByTestId(wrapper, 'menu-listbox').prop('visible')).toBeTruthy();
    });

    test('Opens listbox when button is clicked', () => {
        const wrapper = shallowWithTheme(<MenuButton label="Test Button" options={options}/>);

        getByTestId(wrapper, 'menu-button').simulate('click');

        expect(getByTestId(wrapper, 'menu-listbox').prop('visible')).toBeTruthy();
    });

    test('Focuses the first menu-item when menu opens', () => {
        const wrapper = mountWithTheme(setup(<MenuButton label="Test Button" options={options}/>));

        getByTestId(wrapper, 'menu-button').simulate('click');

        expect(getByTestId(wrapper, 'menu-listbox').prop('focusedValue')).toBe('optionA');
    });

    test('Focuses menu-button given escape key is pressed inside listbox', () => {
        const wrapper = mount(
            ThemeWrapped(setup(<MenuButton defaultOpen label="Test Button" options={options}/>)),
            { attachTo: document.body },
        );

        getByTestId(wrapper, 'listbox-list').simulate('keydown', { key: 'Escape' });

        expect(document.activeElement).toBe(getByTestId(wrapper, 'menu-button').getDOMNode());
    });

    test('Should close when escape is pressed in listbox', () => {
        const wrapper = shallowWithTheme(<MenuButton defaultOpen label="Test Button" options={options}/>);

        getByTestId(wrapper, 'menu-listbox').simulate('keydown', { key: 'Escape' });

        expect(getByTestId(wrapper, 'menu-listbox').props().visible).toBeFalsy();
    });

    test('Matches Snapshot', () => {
        const tree = renderWithTheme(setup(<MenuButton label="Test Button" options={options}/>));

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const tree = renderWithTheme(setup(<MenuButton defaultOpen label="Test Button" options={options}/>));

        expect(tree).toMatchSnapshot();
    });
});

const setup = (children: ReactElement) => (
    <Router>
        {ThemeWrapped(children)}
    </Router>
);

const options = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testc',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testd',
    },
];
