import { shallow } from 'enzyme';
import { findByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { Pagination } from './pagination';
import { PageLink } from './page-link/page-link';

describe('Pagination', () => {
    test('Matches the mobile snapshot', () => {
        const tree = renderWithProviders(
            <Pagination resultsPerPage={12} />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches the desktop snapshot', () => {
        const tree = renderWithProviders(
            <Pagination resultsPerPage={12} />,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches the mobile snapshot with multiples digits page numbers', () => {
        const tree = renderWithProviders(
            <Pagination resultsPerPage={1000} />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches the desktop snapshot with multiples digits page numbers', () => {
        const tree = renderWithProviders(
            <Pagination resultsPerPage={1000} />,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    describe('pages list', () => {
        test('should display pages', () => {
            const wrapper = shallow(<Pagination resultsPerPage={5} numberOfResults={25} pagesShown={5} />);

            const pages = wrapper.find(PageLink);

            expect(pages).toHaveLength(5);
        });

        test('should go to page 2 when clicking on page 2', () => {
            const callback = jest.fn();
            const wrapper = mountWithProviders(
                <Pagination
                    resultsPerPage={3}
                    numberOfResults={6}
                    defaultActivePage={1}
                    onPageChange={callback}
                />,
            );
            const pageButton = findByTestId(wrapper, 'page-2').at(0);

            pageButton.simulate('click');

            expect(callback).toHaveBeenCalledWith(2);
            wrapper.unmount();
        });

        test('should highlight selected page', () => {
            const wrapper = mountWithProviders(
                <Pagination resultsPerPage={3} numberOfResults={9} defaultActivePage={3} />,
            );
            const pageButton = findByTestId(wrapper, 'page-3').at(0);

            expect(pageButton.prop('isSelected')).toBe(true);
            wrapper.unmount();
        });
    });

    describe('results label', () => {
        test('should display zero results when number of results is undefined', () => {
            const wrapper = mountWithProviders(
                <Pagination resultsPerPage={0} numberOfResults={undefined} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel').at(0);

            expect(label.text()).toEqual('Pagination - 0–0 of 0 results');
            wrapper.unmount();
        });

        test('should display the number of results when provided', () => {
            const wrapper = mountWithProviders(
                <Pagination resultsPerPage={3} numberOfResults={12345} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel').at(0);

            expect(label.text()).toEqual('Pagination - 1–3 of 12345 results');
            wrapper.unmount();
        });

        test('should display first page results label when number of results is even', () => {
            const wrapper = mountWithProviders(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={1} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel').at(0);

            expect(label.text()).toEqual('Pagination - 1–6 of 30 results');
            wrapper.unmount();
        });

        test('should display second page results label when number of results is uneven', () => {
            const wrapper = mountWithProviders(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={2} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel').at(0);

            expect(label.text()).toEqual('Pagination - 7–12 of 30 results');
            wrapper.unmount();
        });

        test('should display last page results label when number of results is uneven', () => {
            const wrapper = mountWithProviders(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={6} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel').at(0);

            expect(label.text()).toEqual('Pagination - 25–30 of 30 results');
            wrapper.unmount();
        });

        test('should display first page results label when number of results is uneven', () => {
            const wrapper = mountWithProviders(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={1} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel').at(0);

            expect(label.text()).toEqual('Pagination - 1–50 of 1530 results');
            wrapper.unmount();
        });

        test('should display second page results label when number of results is uneven', () => {
            const wrapper = mountWithProviders(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={2} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel').at(0);

            expect(label.text()).toEqual('Pagination - 51–100 of 1530 results');
            wrapper.unmount();
        });

        test('should display last page results label when number of results is uneven', () => {
            const wrapper = mountWithProviders(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={31} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel').at(0);

            expect(label.text()).toEqual('Pagination - 1501–1530 of 1530 results');
            wrapper.unmount();
        });
    });

    describe('navigation buttons', () => {
        const testCases = [
            {
                id: 'previousPageButton', goesToPage: 2, disabledWhenOnPage: 1, enabledWhenOnPage: 2, stopRenderAt: 4,
            },
            {
                id: 'nextPageButton', goesToPage: 4, disabledWhenOnPage: 11, enabledWhenOnPage: 10, stopRenderAt: 4,
            },
        ];

        testCases.forEach((testCase) => {
            describe(testCase.id, () => {
                test(`should go to page ${testCase.goesToPage} when clicked`, () => {
                    const callback = jest.fn();
                    const wrapper = mountWithProviders(
                        <Pagination
                            resultsPerPage={11}
                            numberOfResults={121}
                            defaultActivePage={3}
                            onPageChange={callback}
                        />,
                    );
                    const button = findByTestId(wrapper, testCase.id).at(0);

                    button.simulate('click');

                    expect(callback).toHaveBeenCalledWith(testCase.goesToPage);
                    wrapper.unmount();
                });

                test(`should be disabled when on page ${testCase.disabledWhenOnPage}`, () => {
                    const wrapper = mountWithProviders(
                        <Pagination
                            resultsPerPage={11}
                            numberOfResults={121}
                            defaultActivePage={testCase.disabledWhenOnPage}
                        />,
                    );
                    const button = findByTestId(wrapper, testCase.id).at(0);

                    expect(button.prop('isVisible')).toBe(false);
                    wrapper.unmount();
                });

                test(`should be enabled when on page ${testCase.enabledWhenOnPage}`, () => {
                    const wrapper = mountWithProviders(
                        <Pagination
                            resultsPerPage={11}
                            numberOfResults={121}
                            defaultActivePage={testCase.enabledWhenOnPage}
                        />,
                    );
                    const button = findByTestId(wrapper, testCase.id).at(0);

                    expect(button.prop('isVisible')).toBe(true);
                    wrapper.unmount();
                });

                test(`should not be rendered when there's less than ${testCase.stopRenderAt} page`, () => {
                    const wrapper = mountWithProviders(
                        <Pagination resultsPerPage={testCase.stopRenderAt - 1} />,
                    );
                    const button = findByTestId(wrapper, testCase.id).at(0);

                    expect(button.exists()).toBe(false);
                    wrapper.unmount();
                });
            });
        });
    });
});
