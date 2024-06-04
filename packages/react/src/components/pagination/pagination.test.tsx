import { shallow } from 'enzyme';
import { findByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithProviders } from '../../test-utils/renderer';
import { Pagination } from './pagination';

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
            const pages = findByTestId(wrapper, 'page-', { modifier: '^' });

            expect(pages).toHaveLength(5);
        });

        test('should go to page 2 when clicking on page 2', () => {
            const callback = jest.fn();
            const wrapper = shallow(
                <Pagination resultsPerPage={3} numberOfResults={6} defaultActivePage={1} onPageChange={callback} />,
            );
            const pageButton = findByTestId(wrapper, 'page-2');

            pageButton.simulate('click');

            expect(callback).toHaveBeenCalledWith(2);
        });

        test('should highlight selected page', () => {
            const wrapper = shallow(<Pagination resultsPerPage={3} numberOfResults={9} defaultActivePage={3} />);
            const pageButton = findByTestId(wrapper, 'page-3');

            expect(pageButton.prop('isSelected')).toBe(true);
        });
    });

    describe('results label', () => {
        test('should display zero results when number of results is undefined', () => {
            const wrapper = shallow(<Pagination resultsPerPage={0} numberOfResults={undefined} />);
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />0–0 of 0 results');
        });

        test('should display the number of results when provided', () => {
            const wrapper = shallow(<Pagination resultsPerPage={3} numberOfResults={12345} />);
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />1–3 of 12345 results');
        });

        test('should display first page results label when number of results is even', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={1} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />1–6 of 30 results');
        });

        test('should display second page results label when number of results is uneven', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={2} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />7–12 of 30 results');
        });

        test('should display last page results label when number of results is uneven', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={6} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />25–30 of 30 results');
        });

        test('should display first page results label when number of results is uneven', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={1} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />1–50 of 1530 results');
        });

        test('should display second page results label when number of results is uneven', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={2} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />51–100 of 1530 results');
        });

        test('should display last page results label when number of results is uneven', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={31} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />1501–1530 of 1530 results');
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
                    const wrapper = shallow(
                        <Pagination
                            resultsPerPage={11}
                            numberOfResults={121}
                            defaultActivePage={3}
                            onPageChange={callback}
                        />,
                    );
                    const button = findByTestId(wrapper, testCase.id);

                    button.simulate('click');

                    expect(callback).toHaveBeenCalledWith(testCase.goesToPage);
                });

                test(`should be disabled when on page ${testCase.disabledWhenOnPage}`, () => {
                    const wrapper = shallow(
                        <Pagination
                            resultsPerPage={11}
                            numberOfResults={121}
                            defaultActivePage={testCase.disabledWhenOnPage}
                        />,
                    );
                    const button = findByTestId(wrapper, testCase.id);

                    expect(button.prop('enabled')).toBe(false);
                });

                test(`should be enabled when on page ${testCase.enabledWhenOnPage}`, () => {
                    const wrapper = shallow(
                        <Pagination
                            resultsPerPage={11}
                            numberOfResults={121}
                            defaultActivePage={testCase.enabledWhenOnPage}
                        />,
                    );
                    const button = findByTestId(wrapper, testCase.id);

                    expect(button.prop('enabled')).toBe(true);
                });

                test(`should not be rendered when there's less than ${testCase.stopRenderAt} page`, () => {
                    const wrapper = shallow(<Pagination resultsPerPage={testCase.stopRenderAt - 1} />);
                    const button = findByTestId(wrapper, testCase.id);

                    expect(button.exists()).toBe(false);
                });
            });
        });
    });
});
