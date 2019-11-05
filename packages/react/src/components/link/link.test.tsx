import React from 'react';
import renderer from 'react-test-renderer';
import { Link } from './link';

describe('Link', () => {
    test('Navigation link matches snapshot', () => {
        const tree = renderer.create(
            <Link href="/" label="Navigation Link"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('Navigation link with icon matches snapshot', () => {
        const tree = renderer.create(
            <Link href="/story" label="Navigation Link" iconName="mail"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('External link matches snapshot', () => {
        const tree = renderer.create(
            <Link type="ext" href="https://github.com/" label="External Link"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('External link with icon matches snapshot', () => {
        const tree = renderer.create(
            <Link type="ext" href="https://github.com/" label="External Link"  iconName="mail"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
