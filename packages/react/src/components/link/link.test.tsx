import React, { ReactElement } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { Link } from './link';

const setup = (children: ReactElement) => {
    const tree = renderer.create(
        <Router>
            {children}
        </Router>,
    ).toJSON();
    return tree;
};

describe('Link', () => {
    test('Link matches snapshot', () => {
        const tree = setup(<Link routerLink={NavLink} href="/test" label="Navigation Link"/>);
        expect(tree).toMatchSnapshot();
    });
    test('Link with icon matches snapshot', () => {
        const tree = setup(<Link routerLink={NavLink} href="/test" label="Navigation Link" iconName="mail"/>);
        expect(tree).toMatchSnapshot();
    });
    test('Disabled link matches snapshot', () => {
        const tree = setup(<Link routerLink={NavLink} href="/test" label="Navigation Link" disabled/>);
        expect(tree).toMatchSnapshot();
    });
});
