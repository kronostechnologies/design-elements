import { shallow } from 'enzyme';
import React from 'react';
import {
    mountWithProviders,
    shallowWithTheme,
} from '../../test-utils/renderer';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { Breadcrumb } from './breadcrumb';

const defaultHistory = [
    { label: 'HOME', value: 'index', href: '/index' },
    { label: 'ROUTE', value: 'route', href: '/route' },
    { label: 'THREE', value: 'three', href: '/three' },
];

describe('Breadcrumb', () => {
    describe('Snapshots', () => {
        test('Matches snapshot (single entry)', () => {
            const history = [{
                label: 'HOME',
                href: '/home',
                value: 'index',
            }];
            const breadcrumb = shallowWithTheme(
                <Breadcrumb history={history} />,
            );

            expect(breadcrumb).toMatchSnapshot();
        });

        test('Matches snapshot (double entries)', () => {
            const history = [...defaultHistory];
            history.pop();

            const breadcrumb = shallowWithTheme(
                <Breadcrumb history={history} />,
            );

            expect(breadcrumb).toMatchSnapshot();
        });

        test('Matches snapshot (Three or more entries)', () => {
            const breadcrumb = shallowWithTheme(
                <Breadcrumb history={defaultHistory} />,
            );

            expect(breadcrumb).toMatchSnapshot();
        });

        test('Matches snapshot (Dropdown open with long text)', () => {
            const history = [
                ...defaultHistory,
                {
                    label: 'FOUR IS GOING TO BE TOO LONG FOR THE ACTUAL DROPDOWN SO IT WILL HAVE ELLIPSIS',
                    href: '/too-long',
                    value: 'three',
                },
            ];

            const breadcrumb = shallow(
                <Breadcrumb history={history} />,
            );

            findByTestId(breadcrumb, 'ellipse-button').simulate('click');

            expect(breadcrumb).toMatchSnapshot();
        });
    });

    test('Menu should be hidden by default', () => {
        const breadcrumb = mountWithProviders(
            <Breadcrumb history={defaultHistory} />,
        );

        expect(getByTestId(breadcrumb, 'nav-menu').prop('hidden')).toBe(true);
    });

    test('Menu should be displayed when button is clicked', () => {
        const breadcrumb = shallow(
            <Breadcrumb history={defaultHistory} />,
        );

        findByTestId(breadcrumb, 'ellipse-button').simulate('click');
        expect(getByTestId(breadcrumb, 'nav-menu').prop('hidden')).toBe(false);
    });
});
