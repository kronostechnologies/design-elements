import { shallow } from 'enzyme';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithTheme } from '../../test-utils/renderer';
import { NavMenu, NavMenuOption, HtmlLink, ReactRouterNavLink } from './nav-menu';

jest.mock('../../utils/uuid');

const options: NavMenuOption[] = [
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

const optionWithStartIcon: NavMenuOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testA',
        startIcon: 'home',
    },
];

const optionWithEndIcon: NavMenuOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testA',
        endIcon: 'home',
    },
];

const optionsWithHtmlLinks: NavMenuOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testA',
        isHtmlLink: true,
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testB',
        isHtmlLink: true,
    },
];

describe('NavMenu', () => {
    test('Calls onChange callback when an option is clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<NavMenu options={options} onChange={callback} />);

        getByTestId(wrapper, 'listitem-optionC').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Calls onChange callback when enter key is pressed on option', () => {
        const callback = jest.fn();
        const wrapper = shallow(<NavMenu options={options} onChange={callback} />);

        getByTestId(wrapper, 'listitem-optionC').simulate('keydown', {
            key: 'Enter',
            preventDefault: jest.fn(),
            currentTarget: { click: jest.fn() },
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Calls onKeyDown callback when a key is pressed on option', () => {
        const callback = jest.fn();
        const wrapper = shallow(<NavMenu options={options} onKeyDown={callback} />);

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: '' });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Should have start-icon when startIcon prop is defined', () => {
        const wrapper = shallow(<NavMenu options={optionWithStartIcon} />);

        expect(getByTestId(wrapper, 'start-icon').exists()).toBe(true);
    });

    test('Should have end-icon when endIcon prop is defined', () => {
        const wrapper = shallow(<NavMenu options={optionWithEndIcon} />);

        expect(getByTestId(wrapper, 'end-icon').exists()).toBe(true);
    });

    test('Should use react-router links by default', () => {
        const wrapper = shallow(<NavMenu options={options} />);

        expect(wrapper.find(ReactRouterNavLink).length).toBe(options.length);
    });

    test('Should use html links when isHtmlLink is set to true', () => {
        const wrapper = shallow(<NavMenu options={optionsWithHtmlLinks} />);

        expect(wrapper.find(HtmlLink).length).toBe(optionsWithHtmlLinks.length);
    });

    test('Should update focused value when focusedValue prop changes', () => {
        const wrapper = mountWithProviders(
            <NavMenu options={options} />,
            { attachTo: document.body },
        );

        wrapper.setProps({ focusedValue: 'optionB' }).update();

        expect(document.activeElement).toBe(getByTestId(wrapper, 'listitem-optionB').getDOMNode());
    });

    test('calls option.onClick when an htmlLink is clicked', () => {
        const onClick = jest.fn();
        const wrapper = mountWithProviders(
            <NavMenu options={[
                {
                    label: 'Option A',
                    value: 'optionA',
                    href: '/testA',
                    onClick,
                    isHtmlLink: true,
                },
            ]}
            />,
        );

        getByTestId(wrapper, 'listitem-optionA').simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('calls option.onClick when an ReactRouterNavLink is clicked', () => {
        const onClick = jest.fn();
        const wrapper = mountWithProviders(
            <NavMenu options={[
                {
                    label: 'Option A',
                    value: 'optionA',
                    href: '/testA',
                    onClick,
                    isHtmlLink: false,
                },
            ]}
            />,
        );

        getByTestId(wrapper, 'listitem-optionA').simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <Router>
                <NavMenu options={options} />
            </Router>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Is hidden', () => {
        const tree = renderWithTheme(
            <Router>
                <NavMenu options={options} hidden />
            </Router>,
        );

        expect(tree).toMatchSnapshot();
    });
});
