import { renderWithProviders } from '../../test-utils/renderer';
import { ToggleButton } from './toggle-button';

describe('ToggleButton', () => {
    it('has default style', () => {
        const { container } = renderWithProviders(
            <ToggleButton pressed={false} label="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has icon with label style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed={false} label="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has icon only style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed={false} ariaLabel="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has pressed default style', () => {
        const { container } = renderWithProviders(
            <ToggleButton pressed label="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has pressed icon with label style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed label="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has pressed icon only style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed ariaLabel="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has disabled style', () => {
        const { container } = renderWithProviders(
            <ToggleButton disabled pressed={false} label="Lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
