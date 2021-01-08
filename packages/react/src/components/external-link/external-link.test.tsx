import React from 'react';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
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

    test('matches snapshot (label and icon)', () => {
        const tree = renderWithProviders(
            <ExternalLink href="#" label="External Link" iconName="mail" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (only icon)', () => {
        const tree = renderWithProviders(
            <ExternalLink href="#" iconName="mail" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (without href)', () => {
        const tree = renderWithProviders(
            <ExternalLink label="External Link" iconName="mail" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('matches snapshot (disabled)', () => {
        const tree = renderWithProviders(
            <ExternalLink href="#" label="External Link" disabled />,
        );

        expect(tree).toMatchSnapshot();
    });
});
