import { PhoneInput } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Components/Phone Input',
    component: PhoneInput,
};

export const Normal: Story = () => (
    <PhoneInput
        data-testid='custom-data-test-id'
        pattern='(___) ___-____'
        hint='Hint'
        label='Label'
    />
);
Normal.decorators = [DesktopDecorator];

export const Mobile: Story = () => <PhoneInput pattern='(___) ___-____' />;
Mobile.decorators = [MobileDecorator];

export const WithDefaultValue: Story = () => <PhoneInput pattern='(___) ___-____' defaultValue='1234567890' />;
WithDefaultValue.decorators = [DesktopDecorator];

export const Required: Story = () => <PhoneInput pattern='(___) ___-____' required />;
Required.decorators = [DesktopDecorator];

export const Disabled: Story = () => <PhoneInput pattern='(___) ___-____' disabled />;
Disabled.decorators = [DesktopDecorator];
