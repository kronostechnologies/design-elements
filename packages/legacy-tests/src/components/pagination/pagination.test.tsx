import { shallow } from 'enzyme';
import { Pagination } from '~/components/pagination/pagination';
import { findByTestId } from '../../test-utils/enzyme-selectors';

describe('Pagination', () => {
    describe('pages list', () => {
        it('should display pages', () => {
            const wrapper = shallow(<Pagination resultsPerPage={5} numberOfResults={25} pagesShown={5} />);
            const pages = findByTestId(wrapper, 'page-', { modifier: '^' });

            expect(pages).toHaveLength(5);
        });

        it('should go to page 2 when clicking on page 2', () => {
            const callback = jest.fn();
            const wrapper = shallow(
                <Pagination resultsPerPage={3} numberOfResults={6} defaultActivePage={1} onPageChange={callback} />,
            );
            const pageButton = findByTestId(wrapper, 'page-2');

            pageButton.simulate('click');

            expect(callback).toHaveBeenCalledWith(2);
        });

        it('should highlight selected page', () => {
            const wrapper = shallow(<Pagination resultsPerPage={3} numberOfResults={9} defaultActivePage={3} />);
            const pageButton = findByTestId(wrapper, 'page-3');

            expect(pageButton.prop('isSelected')).toBe(true);
        });
    });

    describe('results label', () => {
        it('should display zero results when number of results is undefined', () => {
            const wrapper = shallow(<Pagination resultsPerPage={0} numberOfResults={undefined} />);
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />0–0 of 0 results');
        });

        it('should display the number of results when provided', () => {
            const wrapper = shallow(<Pagination resultsPerPage={3} numberOfResults={12345} />);
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />1–3 of 12345 results');
        });

        it('should display first page results label when number of results is even', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={1} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />1–6 of 30 results');
        });

        it('should display second page results label when number of results is uneven', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={2} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />7–12 of 30 results');
        });

        it('should display last page results label when number of results is uneven', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={6} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />25–30 of 30 results');
        });

        it('should display first page results label when number of results is uneven', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={1} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />1–50 of 1530 results');
        });

        it('should display second page results label when number of results is uneven', () => {
            const wrapper = shallow(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={2} />,
            );
            const label = findByTestId(wrapper, 'resultsLabel');

            expect(label.text()).toEqual('<ScreenReaderOnlyText />51–100 of 1530 results');
        });

        it('should display last page results label when number of results is uneven', () => {
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
                it(`should go to page ${testCase.goesToPage} when clicked`, () => {
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

                it(`should be disabled when on page ${testCase.disabledWhenOnPage}`, () => {
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

                it(`should be enabled when on page ${testCase.enabledWhenOnPage}`, () => {
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

                it(`should not be rendered when there's less than ${testCase.stopRenderAt} page`, () => {
                    const wrapper = shallow(<Pagination resultsPerPage={testCase.stopRenderAt - 1} />);
                    const button = findByTestId(wrapper, testCase.id);

                    expect(button.exists()).toBe(false);
                });
            });
        });
    });
});
