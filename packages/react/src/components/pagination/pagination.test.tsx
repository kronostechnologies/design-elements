import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { Pagination } from './pagination';

describe('Pagination', () => {
    it('matches the mobile snapshot', () => {
        const { container } = renderWithProviders(
            <Pagination resultsPerPage={12} />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches the desktop snapshot', () => {
        const { container } = renderWithProviders(
            <Pagination resultsPerPage={12} />,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches the mobile snapshot with multiples digits page numbers', () => {
        const { container } = renderWithProviders(
            <Pagination resultsPerPage={1000} />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches the desktop snapshot with multiples digits page numbers', () => {
        const { container } = renderWithProviders(
            <Pagination resultsPerPage={1000} />,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    describe('pages list', () => {
        it('should display pages', () => {
            renderWithProviders(<Pagination resultsPerPage={5} numberOfResults={25} pagesShown={5} />);
            const pages = screen.getAllByTestId(/^page-/);

            expect(pages).toHaveLength(5);
        });

        it('should go to page 2 when clicking on page 2', async () => {
            const callback = jest.fn();
            renderWithProviders(
                <Pagination resultsPerPage={3} numberOfResults={6} defaultActivePage={1} onPageChange={callback} />,
            );
            const pageButton = screen.getByTestId('page-2');

            await userEvent.click(pageButton);

            expect(callback).toHaveBeenCalledWith(2);
        });

        it('should highlight selected page', () => {
            renderWithProviders(<Pagination resultsPerPage={3} numberOfResults={9} defaultActivePage={3} />);
            const link = screen.getByLabelText(/go to page 3/i);

            expect(link).toHaveAttribute('aria-current', 'page');
        });
    });

    describe('results label', () => {
        it('should display zero results when number of results is undefined', () => {
            renderWithProviders(<Pagination resultsPerPage={0} numberOfResults={undefined} />);
            const label = screen.getByTestId('resultsLabel');

            expect(label).toHaveTextContent('0–0 of 0 results');
        });

        it('should display the number of results when provided', () => {
            renderWithProviders(<Pagination resultsPerPage={3} numberOfResults={12345} />);
            const label = screen.getByTestId('resultsLabel');

            expect(label).toHaveTextContent('1–3 of 12345 results');
        });

        it('should display first page results label when number of results is even', () => {
            renderWithProviders(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={1} />,
            );
            const label = screen.getByTestId('resultsLabel');

            expect(label).toHaveTextContent('1–6 of 30 results');
        });

        it('should display second page results label when number of results is uneven', () => {
            renderWithProviders(
                <Pagination resultsPerPage={6} numberOfResults={30} activePage={2} />,
            );
            const label = screen.getByTestId('resultsLabel');

            expect(label).toHaveTextContent('7–12 of 30 results');
        });

        it('should display first page results label when number of results is uneven', () => {
            renderWithProviders(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={1} />,
            );
            const label = screen.getByTestId('resultsLabel');

            expect(label).toHaveTextContent('1–50 of 1530 results');
        });

        it('should display second page results label when number of results is uneven', () => {
            renderWithProviders(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={2} />,
            );
            const label = screen.getByTestId('resultsLabel');

            expect(label).toHaveTextContent('51–100 of 1530 results');
        });

        it('should display last page results label when number of results is uneven', () => {
            renderWithProviders(
                <Pagination resultsPerPage={50} numberOfResults={1530} activePage={31} />,
            );
            const label = screen.getByTestId('resultsLabel');

            expect(label).toHaveTextContent('1501–1530 of 1530 results');
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
                it(`should go to page ${testCase.goesToPage} when clicked`, async () => {
                    const callback = jest.fn();
                    renderWithProviders(
                        <Pagination
                            resultsPerPage={11}
                            numberOfResults={121}
                            defaultActivePage={3}
                            onPageChange={callback}
                        />,
                    );
                    const button = screen.getByTestId(testCase.id);

                    await userEvent.click(button);

                    expect(callback).toHaveBeenCalledWith(testCase.goesToPage);
                });

                it(`should be disabled when on page ${testCase.disabledWhenOnPage}`, () => {
                    renderWithProviders(
                        <Pagination
                            resultsPerPage={11}
                            numberOfResults={121}
                            defaultActivePage={testCase.disabledWhenOnPage}
                        />,
                    );
                    const button = screen.getByTestId(testCase.id);

                    expect(button).toHaveAttribute('aria-disabled', 'true');
                });

                it(`should be enabled when on page ${testCase.enabledWhenOnPage}`, () => {
                    renderWithProviders(
                        <Pagination
                            resultsPerPage={11}
                            numberOfResults={121}
                            defaultActivePage={testCase.enabledWhenOnPage}
                        />,
                    );
                    const button = screen.getByTestId(testCase.id);

                    expect(button).toBeEnabled();
                });

                it(`should not be rendered when there's less than ${testCase.stopRenderAt} page`, () => {
                    renderWithProviders(<Pagination resultsPerPage={testCase.stopRenderAt - 1} />);
                    const button = screen.queryByTestId(testCase.id);

                    expect(button).not.toBeInTheDocument();
                });
            });
        });
    });
});
