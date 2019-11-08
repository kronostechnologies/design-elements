import React from 'react';
import renderer from 'react-test-renderer';
import { ExternalLink } from './external-link';

describe('External Link', () => {
    test('Link matches snapshot', () => {
        const tree = renderer.create(
                <ExternalLink href="#" label="External Link"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('Link with icon matches snapshot', () => {
        const tree = renderer.create(
                <ExternalLink href="#" label="External Link" iconName="mail"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('Disabled link matches snapshot', () => {
        const tree = renderer.create(
                <ExternalLink href="#" label="External Link" disabled/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
