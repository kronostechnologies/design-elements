import { shallow } from 'enzyme';
import React from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithProviders } from '../../test-utils/renderer';
import { ApplicationMenu } from './application-menu';
import { SkipLinkProps } from '../skip-link/skip-link';

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

    describe('SkipLink', () => {
        it('should not exist when skipLink is not defined', () => {
            const wrapper = shallow(
                <ApplicationMenu>
                    Test
                </ApplicationMenu>,
            );

            expect(getByTestId(wrapper, 'skip-link').exists()).toBe(false);
        });

        it('should receive props when skipLink is defined', () => {
            const skipLink: SkipLinkProps = {
                href: '#test',
                onClick: jest.fn(),
            };

            const wrapper = shallow(
                <ApplicationMenu skipLink={skipLink}>
                    Test
                </ApplicationMenu>,
            );

            const skipLinkRef = getByTestId(wrapper, 'skip-link');
            expect(skipLinkRef.prop('href')).toBe(skipLink.href);
            expect(skipLinkRef.prop('onClick')).toBe(skipLink.onClick);
        });
    });

    describe('logo', () => {
        it('should use react-router-link when usesReactRouter is true', () => {
            const wrapper = shallow(<ApplicationMenu usesReactRouter>test</ApplicationMenu>);

            expect(getByTestId(wrapper, 'logo-react-router-link').exists()).toBe(true);
        });

        it('should use html-link when usesReactRouter is false', () => {
            const wrapper = shallow(<ApplicationMenu usesReactRouter={false}>test</ApplicationMenu>);

            expect(getByTestId(wrapper, 'logo-html-link').exists()).toBe(true);
        });
    });
});
