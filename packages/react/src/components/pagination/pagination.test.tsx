import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { DeviceContextWrapped } from '../../test-utils/device-context-wrapped';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Pagination } from './pagination';

describe('Pagination', () => {
    test('Matches the mobile snapshot', () => {
        const tree = renderer.create(
            DeviceContextWrapped(
                ThemeWrapped(<Pagination totalPages={12} />),
                'mobile'),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Matches the desktop snapshot', () => {
        const tree = renderer.create(
            DeviceContextWrapped(
                ThemeWrapped(<Pagination totalPages={12} />),
                'desktop'),
        ).toJSON();

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
            let pageButton = wrapper.find('[data-testid="page-2"]').at(1);

            pageButton.simulate('click');

            expect(callback).toHaveBeenCalledWith(2);
            pageButton = wrapper.find('[data-testid="page-2"]').at(1);
            expect(pageButton.prop('isSelected')).toBeTruthy();
        });
    });

    describe('first page button', () => {
        test('should move to first page when clicked', () => {
            const callback = jest.fn();
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={11} defaultActivePage={3} onPageChange={callback} />),
            );
            const button = wrapper.find('[data-testid="firstPageButton"]').at(1);

            button.simulate('click');

            expect(callback).toHaveBeenCalledWith(1);
            const page = wrapper.find('[data-testid="page-1"]').at(1);
            expect(page.prop('isSelected')).toBeTruthy();
        });

        test('should be disabled when on first page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={11} defaultActivePage={1} />),
            );
            const button = wrapper.find('[data-testid="firstPageButton"]').at(1);

            expect(button.prop('enabled')).toBeFalsy();
        });

        test('should be enabled when on second page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={11} defaultActivePage={2} />),
            );
            const button = wrapper.find('[data-testid="firstPageButton"]').at(1);

            expect(button.prop('enabled')).toBeTruthy();
        });

        test('should not be rendered when there\'s less than 11 page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={10} />),
            );
            const button = wrapper.find('[data-testid="firstPageButton"]').at(1);

            expect(button.exists()).toBeFalsy();
        });
    });

    describe('previous page button', () => {
        test('should move to previous page when clicked', () => {
            const callback = jest.fn();
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={4} defaultActivePage={3} onPageChange={callback} />),
            );
            const button = wrapper.find('[data-testid="previousPageButton"]').at(1);

            button.simulate('click');

            expect(callback).toHaveBeenCalledWith(2);
            const page = wrapper.find('[data-testid="page-2"]').at(1);
            expect(page.prop('isSelected')).toBeTruthy();
        });

        test('should be disabled when on first page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={4} defaultActivePage={1} />),
            );
            const button = wrapper.find('[data-testid="previousPageButton"]').at(1);

            expect(button.prop('enabled')).toBeFalsy();
        });

        test('should be enabled when on second page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={4} defaultActivePage={2} />),
            );
            const button = wrapper.find('[data-testid="previousPageButton"]').at(1);

            expect(button.prop('enabled')).toBeTruthy();
        });

        test('should not be rendered when there\'s less than 4 page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={3} />),
            );
            const button = wrapper.find('[data-testid="previousPageButton"]').at(1);

            expect(button.exists()).toBeFalsy();
        });

        test('should always be visible when some pages are not shown', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={3} pagesShown={1} />),
            );
            const button = wrapper.find('[data-testid="previousPageButton"]').at(1);

            expect(button.exists()).toBeTruthy();
        });
    });

    describe('next page button', () => {
        test('should move to next page when clicked', () => {
            const callback = jest.fn();
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={4} defaultActivePage={1} onPageChange={callback} />),
            );
            const button = wrapper.find('[data-testid="nextPageButton"]').at(1);

            button.simulate('click');

            expect(callback).toHaveBeenCalledWith(2);
            const page = wrapper.find('[data-testid="page-2"]').at(1);
            expect(page.prop('isSelected')).toBeTruthy();
        });

        test('should be disabled when on last page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={4} defaultActivePage={4} />),
            );
            const button = wrapper.find('[data-testid="nextPageButton"]').at(1);

            expect(button.prop('enabled')).toBeFalsy();
        });

        test('should be enabled when on second page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={4} defaultActivePage={2} />),
            );
            const button = wrapper.find('[data-testid="nextPageButton"]').at(1);

            expect(button.prop('enabled')).toBeTruthy();
        });

        test('should not be rendered when there\'s less than 4 page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={3} />),
            );
            const button = wrapper.find('[data-testid="nextPageButton"]').at(1);

            expect(button.exists()).toBeFalsy();
        });

        test('should always be visible when some pages are not shown', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={3} pagesShown={1} />),
            );
            const button = wrapper.find('[data-testid="nextPageButton"]').at(1);

            expect(button.exists()).toBeTruthy();
        });
    });

    describe('last page button', () => {
        test('should move to last page when clicked', () => {
            const callback = jest.fn();
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={11} onPageChange={callback} />),
            );
            wrapper.update();
            const button = wrapper.find('[data-testid="lastPageButton"]').at(1);

            button.simulate('click');

            expect(callback).toHaveBeenCalledWith(11);
            const page = wrapper.find('[data-testid="page-11"]').at(1);
            expect(page.prop('isSelected')).toBeTruthy();
        });

        test('should be disabled when on last page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={11} defaultActivePage={11} />),
            );
            const button = wrapper.find('[data-testid="lastPageButton"]').at(1);

            expect(button.prop('enabled')).toBeFalsy();
        });

        test('should be enabled when on second page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={11} defaultActivePage={2} />),
            );
            const button = wrapper.find('[data-testid="lastPageButton"]').at(1);

            expect(button.prop('enabled')).toBeTruthy();
        });

        test('should not be rendered when there\'s less than 11 page', () => {
            const wrapper = mount(
                ThemeWrapped(<Pagination totalPages={10} />),
            );
            const button = wrapper.find('[data-testid="lastPageButton"]').at(1);

            expect(button.exists()).toBeFalsy();
        });
    });
});
