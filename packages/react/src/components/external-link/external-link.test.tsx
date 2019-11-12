import React from 'react';

import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { ExternalLink } from './external-link';

describe('External Link', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <ExternalLink onClick={callback} href="#" label="External Link"/>,
        );
        wrapper.find(ExternalLink).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });
    test('matches snapshot', () => {
        const tree = renderer.create(
                <ExternalLink href="#" label="External Link"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('with icon matches snapshot', () => {
        const tree = renderer.create(
                <ExternalLink href="#" label="External Link" iconName="mail"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('link matches snapshot', () => {
        const tree = renderer.create(
                <ExternalLink href="#" label="External Link" disabled/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
