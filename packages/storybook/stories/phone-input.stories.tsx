import { PhoneInput } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

const PhoneInputMeta: Meta<typeof PhoneInput> = {
    title: 'Components/Phone Input',
    component: PhoneInput,
    args: {
        pattern: '(___) ___-____',
    },
};

export default PhoneInputMeta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
    ...PhoneInputMeta,
    args: {
        hint: 'Hint',
        label: 'Label',
    },
    decorators: [DesktopDecorator],
    render: (args) => (
        <PhoneInput
            data-testid='custom-data-test-id'
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...args}
        />
    ),
};

export const Mobile: Story = {
    ...PhoneInputMeta,
    decorators: [MobileDecorator],
};
