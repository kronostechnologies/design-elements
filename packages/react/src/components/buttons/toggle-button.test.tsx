import { renderWithProviders } from '../../test-utils/renderer';
import { ToggleButton } from './toggle-button';

describe('ToggleButton', () => {
    it('has default style', () => {
        const { container } = renderWithProviders(
            <ToggleButton pressed={false} label="Lock" value="lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has with icon style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed={false} label="Lock" value="lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has icon only style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed={false} ariaLabel="Lock" value="lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has pressed default style', () => {
        const { container } = renderWithProviders(
            <ToggleButton pressed label="Lock" value="lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has pressed with icon style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed label="Lock" value="lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has pressed icon only style', () => {
        const { container } = renderWithProviders(
            <ToggleButton iconName='lock' pressed ariaLabel="Lock" value="lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('has disabled style', () => {
        const { container } = renderWithProviders(
            <ToggleButton disabled pressed={false} label="Lock" value="lock" />,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('throws error when iconName is provided without ariaLabel', () => {
        expect(() => {
            renderWithProviders(
                <ToggleButton pressed={false} iconName="lock" value="lock" />,
            );
        }).toThrow('ToggleButton with iconName requires an ariaLabel.');
    });

    it('throws error when neither label nor iconName with ariaLabel is provided', () => {
        expect(() => {
            renderWithProviders(
                <ToggleButton pressed={false} value="lock" />,
            );
        }).toThrow('ToggleButton requires either a label or both an iconName and an ariaLabel.');
    });
});
