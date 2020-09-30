import React from 'react';

import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { ExternalLink } from './external-link';

describe('External Link', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<ExternalLink onClick={callback} href="#" label="External Link"/>),
        );

        wrapper.find(ExternalLink).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });
    test('matches snapshot', () => {
        const tree = renderer.create(
                ThemeWrapped(<ExternalLink href="https://www.google.ca/" label="External Link"/>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('with icon matches snapshot', () => {
        const tree = renderer.create(
                ThemeWrapped(<ExternalLink href="#" label="External Link" iconName="mail"/>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('without href matches snapshot', () => {
        const tree = renderer.create(
                ThemeWrapped(<ExternalLink label="External Link" iconName="mail"/>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('disabled matches snapshot', () => {
        const tree = renderer.create(
                ThemeWrapped(<ExternalLink href="#" label="External Link" disabled/>),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
