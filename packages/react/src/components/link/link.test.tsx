import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Link } from './link';

describe('Link', () => {
    test('Navigation link matches snapshot', () => {
        const tree = renderer.create(
            <Router>
                <Link routerLink={NavLink} href="/test" label="Navigation Link"/>
            </Router>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('Navigation link with icon matches snapshot', () => {
        const tree = renderer.create(
            <Router>
                <Link routerLink={NavLink} href="/test" label="Navigation Link" iconName="mail"/>
            </Router>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('External link matches snapshot', () => {
        const tree = renderer.create(
            <Link href="https://github.com/" label="External Link"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('External link with icon matches snapshot', () => {
        const tree = renderer.create(
            <Link href="https://github.com/" label="External Link"  iconName="mail"/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
