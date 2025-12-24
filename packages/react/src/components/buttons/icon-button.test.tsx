import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { IconButton } from './icon-button';

describe('Icon Button', () => {
    it('Has disabled styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
                disabled
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Has primary styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Has secondary styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="secondary"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Has tertiary styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="tertiary"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Has destructive-secondary styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="destructive-secondary"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Has small styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
                size="small"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Has mobile styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
            />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('onClick callback is called when clicked', async () => {
        const callback = jest.fn();
        renderWithProviders(
            <IconButton label="home" iconName="home" buttonType="primary" onClick={callback} />,
        );

        await userEvent.click(screen.getByRole('button', { name: 'home' }));

        expect(callback).toHaveBeenCalled();
    });

    it('onClick callback cannot be called when disabled', async () => {
        const callback = jest.fn();
        renderWithProviders(
            <IconButton label="home" iconName="home" onClick={callback} buttonType="primary" disabled />,
        );

        await expect(userEvent.click(screen.getByRole('button', { name: 'home' }))).toReject();
        expect(callback).not.toHaveBeenCalled();
    });

    it('focusable button has no tabIndex prop', () => {
        renderWithProviders(<IconButton iconName="home" buttonType="primary" label="home" />);

        expect(screen.getByRole('button', { name: 'home' })).not.toHaveAttribute('tabIndex');
    });

    it('non-focusable button has tabIndex=-1', () => {
        renderWithProviders(<IconButton iconName="home" buttonType="primary" label="home" focusable={false} />);

        expect(screen.getByRole('button', { name: 'home' })).toHaveAttribute('tabIndex', '-1');
    });

    it('focusable button has focus styles', async () => {
        renderWithProviders(<IconButton iconName="home" buttonType="primary" label="home" />);

        const button = screen.getByRole('button', { name: 'home' });
        await userEvent.tab();

        expect(button).toHaveFocus();
        expect(button).toHaveStyleRule('outline', '2px solid #84C6EA', {
            modifier: ':focus-visible',
        });
    });

    it('non-focusable button does not have focus styles', async () => {
        renderWithProviders(<IconButton iconName="home" buttonType="primary" label="home" focusable={false} />);

        const button = screen.getByRole('button', { name: 'home' });
        await userEvent.tab();

        expect(button).not.toHaveFocus();
        expect(button).not.toHaveStyleRule('outline', 'none', {
            modifier: ':focus',
        });
    });
});
