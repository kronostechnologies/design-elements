import React from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Link } from './link';

describe('Link', () => {
    test('Link matches snapshot', () => {
        const tree = renderer.create(
            <Router>
                <Link routerLink={NavLink} href="/test" label="Navigation Link"/>
            </Router>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('Link with icon matches snapshot', () => {
        const tree = renderer.create(
            <Router>
                <Link routerLink={NavLink} href="/test" label="Navigation Link" iconName="mail"/>
            </Router>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
    test('Disabled link matches snapshot', () => {
        const tree = renderer.create(
            <Router>
                <Link routerLink={NavLink} href="/test" label="Navigation Link" disabled/>
            </Router>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
