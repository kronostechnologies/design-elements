import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { renderWithProviders } from '../../test-utils/testing-library';
import { ListOption, NavListItem } from './nav-list-item';

describe('NavListItem', () => {
    function givenOptionA(override: Omit<Partial<ListOption>, 'label' | 'value'> = {}): ListOption {
        return {
            id: 'an-id',
            focusIndex: 0,
            ref: React.createRef(),
            label: 'Option A',
            value: 'optionA',
            href: '/testA',
            ...override,
        };
    }

    it('should use react-router links by default', () => {
        const option = givenOptionA();

        renderWithProviders(<NavListItem option={option} />);

        const link = screen.getByRole('link', { name: 'Option A' });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/testA');
    });

    it('displays screen-reader-only text when router link opens in a new tab (target="_blank")', () => {
        const option = givenOptionA({ target: '_blank' });

        renderWithProviders(<NavListItem option={option} />);

        expect(screen.getByTestId('listitem-optionA-link-screen-reader-text')).toBeInTheDocument();
    });

    it('displays screen-reader-only text when html link opens in a new tab (target="_blank")', () => {
        const option = givenOptionA({ target: '_blank', isHtmlLink: true });

        renderWithProviders(<NavListItem option={option} />);

        expect(screen.getByTestId('listitem-optionA-link-screen-reader-text')).toBeInTheDocument();
    });

    it('should use html links when isHtmlLink is set to true', () => {
        const option = givenOptionA({ isHtmlLink: true });

        renderWithProviders(<NavListItem option={option} />);

        const link = screen.getByRole('link', { name: 'Option A' });
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute('href', '/testA');
    });

    it('should have start-icon when startIcon prop is defined', () => {
        const option = givenOptionA({ startIcon: 'home' });

        renderWithProviders(<NavListItem option={option} />);

        expect(screen.getByTestId('start-icon')).toBeInTheDocument();
    });

    it('should have end-icon when endIcon prop is defined', () => {
        const option = givenOptionA({ endIcon: 'home' });

        renderWithProviders(<NavListItem option={option} />);

        expect(screen.getByTestId('end-icon')).toBeInTheDocument();
    });

    it('calls option.onClick when an htmlLink is clicked', async () => {
        const onClick = jest.fn((e) => e.preventDefault());
        const option = givenOptionA({ isHtmlLink: true, onClick });
        renderWithProviders(<NavListItem option={option} />);

        await userEvent.click(screen.getByTestId('listitem-optionA-link'));

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('calls option.onClick when an ReactRouterNavLink is clicked', async () => {
        const onClick = jest.fn((e) => e.preventDefault());
        const option = givenOptionA({ onClick });
        renderWithProviders(<NavListItem option={option} />);

        await userEvent.click(screen.getByTestId('listitem-optionA-link'));

        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
