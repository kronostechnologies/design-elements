import { doNothing } from '../../test-utils/callbacks';
import { renderWithProviders } from '../../test-utils/renderer';
import { Button } from './button';

describe('Button', () => {
    test('has primary disabled styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" disabled label="Primary Button" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has primary styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Primary Button" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has primary styles (inverted)', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Primary Button" inverted />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has secondary styles', () => {
        const { container } = renderWithProviders(
            <Button
                onClick={doNothing}
                buttonType="secondary"
                label="Secondary Button"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has secondary styles (inverted)', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="secondary" label="Secondary Button" inverted />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has tertiary styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="tertiary" label="Tertiary Button" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has tertiary styles (inverted)', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="tertiary" label="Tertiary Button" inverted />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has destructive styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="destructive-primary" label="Destructive Button" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has destructive styles (inverted)', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="destructive-primary" label="Destructive Button" inverted />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has destructive-secondary styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="destructive-primary" label="Destructive Button" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has destructive-secondary styles (inverted)', () => {
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

    test('has small styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Small Primary Button" size="small" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has mobile styles', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Primary Button" />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has small styles on mobile', () => {
        const { container } = renderWithProviders(
            <Button onClick={doNothing} buttonType="primary" label="Small Primary Button" size="small" />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('has left and right icons', () => {
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
});
