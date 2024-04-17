import { PhoneInput } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Components/Phone Input',
    component: PhoneInput,
};

export const Default: Story = () => (
    <PhoneInput
        data-testid='custom-data-test-id'
        pattern='(___) ___-____'
        hint='Hint'
        label='Label'
    />
);
Default.decorators = [DesktopDecorator];

export const Mobile: Story = () => <PhoneInput pattern='(___) ___-____' />;
Mobile.decorators = [MobileDecorator];
