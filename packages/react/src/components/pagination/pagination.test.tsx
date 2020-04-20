import { renderWithProviders } from '@design-elements/test-utils/renderer';
import { mount } from 'enzyme';
import React, { ReactElement } from 'react';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { DeviceType } from '../device-context-provider/device-context-provider';
import { Pagination } from './pagination';

const renderComponent = (component: ReactElement, device?: DeviceType) => {
    return renderWithProviders(component, device);
};

describe('Pagination', () => {
    test('Matches the mobile snapshot', () => {
        const tree = renderComponent(
            <Pagination totalPages={12} />,
            'mobile');

        expect(tree).toMatchSnapshot();
    });

    test('Matches the desktop snapshot', () => {
        const tree = renderComponent(
            <Pagination totalPages={12} />,
            'desktop');

        expect(tree).toMatchSnapshot();
    });

    describe('pages list', () => {
        test('should display pages', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={5} pagesShown={5} />),
            );
            const pages = wrapper.find('li');

            expect(pages).toHaveLength(5);
        });

        test('should go to page 2 when clicking on page 2', () => {
            const callback = jest.fn();
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={3} defaultActivePage={1} onPageChange={callback} />),
            );
            const pageButton = wrapper.find('[data-testid="page-2"]').at(1);

            pageButton.simulate('click');

            expect(callback).toHaveBeenCalledWith(2);
        });

        test('should highlight selected page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={3} defaultActivePage={3} />),
            );
            const pageButton = wrapper.find('[data-testid="page-3"]').at(1);

            expect(pageButton.prop('isSelected')).toBeTruthy();
        });
    });

    describe('results label', () => {
        test('should display the number of results when provided', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={3} numberOfResults={12345} />),
            );
            const label = wrapper.find('[data-testid="resultsLabel"]').at(1);

            expect(label.text()).toEqual('12345 results');
        });

        test('should be hidden when number of results is not provided', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={3} />),
            );
            const label = wrapper.find('[data-testid="resultsLabel"]').at(1);

            expect(label.exists()).toBeFalsy();
        });
    });

    describe('navigation buttons', () => {
        const testCases = [
            { id: 'firstPageButton', goesToPage: 1, disabledWhenOnPage: 1, enabledWhenOnPage: 2, stopRenderAt: 11 },
            { id: 'previousPageButton', goesToPage: 2, disabledWhenOnPage: 1, enabledWhenOnPage: 2, stopRenderAt: 4 },
            { id: 'nextPageButton', goesToPage: 4, disabledWhenOnPage: 11, enabledWhenOnPage: 10, stopRenderAt: 4 },
            { id: 'lastPageButton', goesToPage: 11, disabledWhenOnPage: 11, enabledWhenOnPage: 10, stopRenderAt: 11 }];

        testCases.forEach(testCase => {
            describe(testCase.id, () => {
                test(`should go to page ${testCase.goesToPage} when clicked`, () => {
                    const callback = jest.fn();
                    const wrapper = mount(
                        ThemeWrapped(<Pagination totalPages={11} defaultActivePage={3} onPageChange={callback}/>),
                    );
                    const button = wrapper.find(`[data-testid=\"${testCase.id}\"]`).at(1);

                    button.simulate('click');

                    expect(callback).toHaveBeenCalledWith(testCase.goesToPage);
                });

                test(`should be disabled when on page ${testCase.disabledWhenOnPage}`, () => {
                    const wrapper = mount(
                        ThemeWrapped(<Pagination totalPages={11} defaultActivePage={testCase.disabledWhenOnPage}/>),
                    );
                    const button = wrapper.find(`[data-testid=\"${testCase.id}\"]`).at(1);

                    expect(button.prop('enabled')).toBeFalsy();
                });

                test(`should be enabled when on page ${testCase.enabledWhenOnPage}`, () => {
                    const wrapper = mount(
                        ThemeWrapped(<Pagination totalPages={11} defaultActivePage={testCase.enabledWhenOnPage}/>),
                    );
                    const button = wrapper.find(`[data-testid=\"${testCase.id}\"]`).at(1);

                    expect(button.prop('enabled')).toBeTruthy();
                });

                test(`should not be rendered when there\'s less than ${testCase.stopRenderAt} page`, () => {
                    const wrapper = mount(
                        ThemeWrapped(<Pagination totalPages={testCase.stopRenderAt - 1}/>),
                    );
                    const button = wrapper.find(`[data-testid=\"${testCase.id}\"]`).at(1);

                    expect(button.exists()).toBeFalsy();
                });
            });
        });
    });
});
