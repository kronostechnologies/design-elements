import { shallow } from 'enzyme';
import React from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';
import { HtmlLink, ListOption, NavListItem, ReactRouterNavLink } from './nav-list-item';

describe('NavListItem', () => {
    function givenOptionA(override: Omit<Partial<ListOption>, 'label' | 'value'> = {}): ListOption {
        return {
            id: 'an-id',
            focusIndex: 0,
            ref: React.createRef(),
            label: 'Option A',
            value: 'optionA',
            href: '/testA',
            ...override,
        };
    }

    it('Should use react-router links by default', () => {
        const option = givenOptionA();

        const wrapper = shallow(<NavListItem option={option} />);

        expect(wrapper.find(ReactRouterNavLink).isEmptyRender()).toBe(false);
    });

    it('displays screen-reader-only text when router link opens in a new tab (target="_blank")', () => {
        const option = givenOptionA({ target: '_blank' });

        const wrapper = mountWithProviders(<NavListItem option={option} />);

        const navListOptionScreenReaderText = getByTestId(wrapper, 'listitem-optionA-link-screen-reader-text');
        expect(navListOptionScreenReaderText.exists()).toBe(true);
    });

    it('displays screen-reader-only text when html link opens in a new tab (target="_blank")', () => {
        const option = givenOptionA({ target: '_blank', isHtmlLink: true });

        const wrapper = mountWithProviders(<NavListItem option={option} />);

        const navListOptionScreenReaderText = getByTestId(wrapper, 'listitem-optionA-link-screen-reader-text');
        expect(navListOptionScreenReaderText.exists()).toBe(true);
    });

    it('Should use html links when isHtmlLink is set to true', () => {
        const option = givenOptionA({ isHtmlLink: true });

        const wrapper = shallow(<NavListItem option={option} />);

        expect(wrapper.find(HtmlLink).isEmptyRender()).toBe(false);
    });

    it('Should have start-icon when startIcon prop is defined', () => {
        const option = givenOptionA({ startIcon: 'home' });

        const wrapper = mountWithProviders(<NavListItem option={option} />);

        expect(getByTestId(wrapper, 'start-icon').exists()).toBe(true);
    });

    it('Should have end-icon when endIcon prop is defined', () => {
        const option = givenOptionA({ endIcon: 'home' });

        const wrapper = mountWithProviders(<NavListItem option={option} />);

        expect(getByTestId(wrapper, 'end-icon').exists()).toBe(true);
    });

    it('calls option.onClick when an htmlLink is clicked', () => {
        const onClick = jest.fn();
        const option = givenOptionA({ isHtmlLink: true, onClick });
        const wrapper = mountWithProviders(<NavListItem option={option} />);

        getByTestId(wrapper, 'listitem-optionA-link').simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls option.onClick when an ReactRouterNavLink is clicked', () => {
        const onClick = jest.fn();
        const option = givenOptionA({ onClick });
        const wrapper = mountWithProviders(<NavListItem option={option} />);

        getByTestId(wrapper, 'listitem-optionA-link').simulate('click');

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
