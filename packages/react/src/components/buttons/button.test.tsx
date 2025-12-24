import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { doNothing } from '../../test-utils/callbacks';
import { renderWithProviders } from '../../test-utils/renderer';
import { Button } from './button';

describe('Button', () => {
    it('has primary disabled styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" disabled label="Primary Button" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has primary styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Primary Button" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has primary styles (inverted)', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Primary Button" inverted />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has secondary styles', () => {
        const { container } = renderWithProviders(
            <Button
                onClick={doNothing}
                buttonType="secondary"
                label="Secondary Button"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has secondary styles (inverted)', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="secondary" label="Secondary Button" inverted />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has tertiary styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="tertiary" label="Tertiary Button" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has tertiary styles (inverted)', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="tertiary" label="Tertiary Button" inverted />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has destructive styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="destructive-primary" label="Destructive Button" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has destructive styles (inverted)', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="destructive-primary" label="Destructive Button" inverted />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has destructive-secondary styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="destructive-primary" label="Destructive Button" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has destructive-secondary styles (inverted)', () => {
        const { container } = renderWithProviders(
            <Button
                onClick={doNothing}
                buttonType="destructive-secondary"
                label="Destructive Secondary Button"
                inverted
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has small styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Small Primary Button" size="small" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has mobile styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Primary Button" />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has small styles on mobile', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Small Primary Button" size="small" />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has left and right icons', () => {
        const { container } = renderWithProviders(
            <Button
                buttonType="primary"
                label="Primary Button"
                leftIconName="chevronLeft"
                rightIconName="chevronRight"

            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('calls onClick callback when clicked', async () => {
        const callback = jest.fn();
        renderWithProviders(<Button onClick={callback} buttonType="primary" label="Primary Button" />);

        await userEvent.click(screen.getByRole('button', { name: 'Primary Button' }));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick callback when disabled', async () => {
        const callback = jest.fn();
        renderWithProviders(
            <Button
                onClick={callback}
                buttonType="primary"
                disabled
                label="Primary Button"
            />,
        );

        await expect(userEvent.click(screen.getByRole('button', { name: 'Primary Button' }))).toReject();
        expect(callback).toHaveBeenCalledTimes(0);
    });

    it('has no tabIndex prop when focusable', () => {
        renderWithProviders(<Button buttonType="primary" label="Primary Button" />);

        const button = screen.getByRole('button', { name: 'Primary Button' });
        expect(button).not.toHaveAttribute('tabIndex');
    });

    it('has tabIndex=-1 when non-focusable', () => {
        renderWithProviders(<Button buttonType="primary" label="Primary Button" focusable={false} />);

        const button = screen.getByText('Primary Button');
        expect(button).toHaveAttribute('tabIndex', '-1');
    });

    it('has focus styles when focusable', () => {
        renderWithProviders(<Button buttonType="primary" label="Primary Button" />);

        const button = screen.getByRole('button', { name: 'Primary Button' });
        expect(button).toMatchSnapshot();
    });

    it('does not have focus styles when non-focusable', () => {
        renderWithProviders(<Button buttonType="primary" label="Primary Button" focusable={false} />);

        const button = screen.getByText('Primary Button');
        expect(button).toMatchSnapshot();
    });

    it('renders icons on left and right', () => {
        renderWithProviders(
            <Button
                buttonType="primary"
                label="Primary Button"
                leftIconName="chevronLeft"
                rightIconName="chevronRight"
            />,
        );

        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });

    it('renders icon on left side only', () => {
        renderWithProviders(
            <Button
                buttonType="primary"
                label="Primary Button"
                leftIconName="chevronRight"
            />,
        );

        expect(screen.queryByTestId('right-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('left-icon')).toBeInTheDocument();
    });

    it('renders icon on right side only', () => {
        renderWithProviders(
            <Button
                buttonType="primary"
                label="Primary Button"
                rightIconName="chevronRight"
            />,
        );

        expect(screen.queryByTestId('left-icon')).not.toBeInTheDocument();
        expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
});
