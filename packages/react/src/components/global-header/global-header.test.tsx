import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { SkipLinkProps } from '../skip-link/skip-link';
import { GlobalHeader } from './global-header';

describe('Global Header', () => {
    it('Matches the snapshot (desktop)', () => {
        const tree = renderWithProviders(
            <GlobalHeader mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </GlobalHeader>,
        );

        expect(tree).toMatchSnapshot();
    });

    it('Matches the snapshot (mobile)', () => {
        const tree = renderWithProviders(
            <GlobalHeader mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </GlobalHeader>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    it('mobileDrawerContent prop adds a side drawer and burger button in mobile', () => {
        const tree = renderWithProviders(
            <GlobalHeader mobileDrawerContent={(<p>Test</p>)}>
                Hello, World!
            </GlobalHeader>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    describe('SkipLink', () => {
        it('should not exist when skipLink is not defined', () => {
            const wrapper = shallow(
                <GlobalHeader>
                    Test
                </GlobalHeader>,
            );

            expect(getByTestId(wrapper, 'skip-link').exists()).toBe(false);
        });

        it('should receive props when skipLink is defined', () => {
            const skipLink: SkipLinkProps = {
                href: '#test',
                onClick: jest.fn(),
            };

            const wrapper = shallow(
                <GlobalHeader skipLink={skipLink}>
                    Test
                </GlobalHeader>,
            );

            const skipLinkRef = getByTestId(wrapper, 'skip-link');
            expect(skipLinkRef.prop('href')).toBe(skipLink.href);
            expect(skipLinkRef.prop('onClick')).toBe(skipLink.onClick);
        });
    });

    describe('logo', () => {
        it('should use react-router-link when usesReactRouter is true', () => {
            const wrapper = shallow(<GlobalHeader usesReactRouter>test</GlobalHeader>);

            expect(getByTestId(wrapper, 'logo-react-router-link').exists()).toBe(true);
        });

        it('should use html-link when usesReactRouter is false', () => {
            const wrapper = shallow(<GlobalHeader usesReactRouter={false}>test</GlobalHeader>);

            expect(getByTestId(wrapper, 'logo-html-link').exists()).toBe(true);
        });

        it('contains app-title when appTitleDesktop prop is set given device is desktop', () => {
            const wrapper = mountWithProviders(
                <GlobalHeader appTitleDesktop="test">test</GlobalHeader>,
                { wrappingComponentProps: { staticDevice: 'desktop' } },
            );

            expect(getByTestId(wrapper, 'app-title').exists()).toBe(true);
        });

        it('does not contain app-title when device is mobile', () => {
            const wrapper = mountWithProviders(
                <GlobalHeader appTitleDesktop="test">test</GlobalHeader>,
                { wrappingComponentProps: { staticDevice: 'mobile' } },
            );

            expect(getByTestId(wrapper, 'app-title').exists()).toBe(false);
        });
    });
});
