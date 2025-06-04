import { renderWithProviders } from '../../test-utils/renderer';
import { IconButton } from './icon-button';

describe('Icon Button', () => {
    test('Has disabled styles', () => {
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

    test('Has primary styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="primary"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Has secondary styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="secondary"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Has tertiary styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="tertiary"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Has destructive-secondary styles', () => {
        const { container } = renderWithProviders(
            <IconButton
                label="home"
                iconName="home"
                buttonType="destructive-secondary"
            />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Has small styles', () => {
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

    test('Has mobile styles', () => {
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
});
