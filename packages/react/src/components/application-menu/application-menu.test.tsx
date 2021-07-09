import { shallow } from 'enzyme';
import React from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithProviders } from '../../test-utils/renderer';
import { ApplicationMenu } from './application-menu';

describe('Application Menu', () => {
    it('Matches the snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
        );

        expect(tree).toMatchSnapshot();
    });

    it('Matches the snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    it('mobileDrawerContent prop adds a side drawer and burger button in mobile', () => {
        const tree = renderWithProviders(
            <ApplicationMenu mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </ApplicationMenu>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    it('should have a SkipLink when skipLinkHref is provided', () => {
        const wrapper = shallow(
            <ApplicationMenu skipLinkHref="some href">
                Hello, World!
            </ApplicationMenu>,
        );

        const skipLink = getByTestId(wrapper, 'skip-link');

        expect(skipLink.exists()).toBe(true);
    });
});
