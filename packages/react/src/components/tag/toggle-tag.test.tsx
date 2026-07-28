import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { DeviceType } from '../device-context-provider';
import { ToggleTag, ToggleTagProps } from './toggle-tag';

describe('ToggleTag', () => {
    const tagSizes: ToggleTagProps['size'][] = ['small', 'medium'];
    tagSizes.forEach((size) => {
        describe(`ToggleTag ${size}`, () => {
            (['mobile', 'desktop'] as DeviceType[]).forEach((deviceType) => {
                it(`matches snapshot (${deviceType})`, () => {
                    const { container } = renderWithProviders(
                        <ToggleTag size={size} value={{ label: 'Test' }} />,
                        'desktop',
                    );

                    expect(container.firstChild).toMatchSnapshot();
                });

                it(`matches snapshot (${deviceType})`, () => {
                    const { container } = renderWithProviders(
                        <ToggleTag size={size} value={{ label: 'Test' }} />,
                        'mobile',
                    );

                    expect(container.firstChild).toMatchSnapshot();
                });

                it(`matches snapshot (${deviceType} with icons)`, () => {
                    const { container } = renderWithProviders(
                        <ToggleTag
                            size={size}
                            iconName="home"
                            value={{ label: 'Test' }}
                        />,
                    );

                    expect(container.firstChild).toMatchSnapshot();
                });

                it(`matches snapshot (${deviceType} clickable)`, () => {
                    const { container } = renderWithProviders(
                        <ToggleTag
                            size={size}
                            value={{ label: 'Test' }}
                            onClick={jest.fn()}
                        />,
                    );

                    expect(container.firstChild).toMatchSnapshot();
                });

                it('calls onClick callback when tag is clicked', async () => {
                    const callback = jest.fn();
                    renderWithProviders(
                        <ToggleTag size={size} value={{ label: 'Test' }} onClick={callback} />,
                        deviceType,
                    );

                    await userEvent.click(screen.getByRole('button', { name: 'Test' }));

                    expect(callback).toHaveBeenCalledTimes(1);
                });

                it(
                    'has aria-hidden="false" and an aria-label on icon when the label is not the same as iconName',
                    () => {
                        renderWithProviders(
                            <ToggleTag size={size} iconName="home" value={{ label: 'Test' }} />,
                            deviceType,
                        );

                        const icon = screen.getByTestId('Test-icon');

                        expect(icon).toHaveAttribute('aria-label', 'home');
                        expect(icon).toHaveAttribute('aria-hidden', 'false');
                    },
                );

                it('has aria-hidden="true" and no label on icon when the label is the same as the iconName', () => {
                    renderWithProviders(
                        <ToggleTag size={size} iconName="home" value={{ label: 'Home' }} />,
                        deviceType,
                    );

                    const icon = screen.getByTestId('Home-icon');

                    expect(icon).not.toHaveAttribute('aria-label');
                    expect(icon).toHaveAttribute('aria-hidden', 'true');
                });
            });
        });
    });
});
