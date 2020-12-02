import { mountWithProviders, renderWithProviders } from '@design-elements/test-utils/renderer';
import React from 'react';
import { ExternalLink } from './external-link';

describe('External Link', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(
            <ExternalLink onClick={callback} href="#" label="External Link" />,
        );

        wrapper.find(ExternalLink).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });
    test('matches snapshot', () => {
        const tree = renderWithProviders(
            <ExternalLink href="https://www.google.ca/" label="External Link" />,
        );

        expect(tree).toMatchSnapshot();
    });
    test('with icon matches snapshot', () => {
        const tree = renderWithProviders(
            <ExternalLink href="#" label="External Link" iconName="mail" />,
        );

        expect(tree).toMatchSnapshot();
    });
    test('without href matches snapshot', () => {
        const tree = renderWithProviders(
            <ExternalLink label="External Link" iconName="mail" />,
        );

        expect(tree).toMatchSnapshot();
    });
    test('disabled matches snapshot', () => {
        const tree = renderWithProviders(
            <ExternalLink href="#" label="External Link" disabled />,
        );

        expect(tree).toMatchSnapshot();
    });
});
