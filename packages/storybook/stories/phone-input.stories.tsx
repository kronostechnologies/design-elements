import { PhoneInput } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const PhoneInputMeta: Meta<typeof PhoneInput> = {
    title: 'Components/Phone Input',
    component: PhoneInput,
    args: {
        mask: '(___) ___-____',
        pattern: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    },
};

export default PhoneInputMeta;
type Story = StoryObj<typeof PhoneInput>;

export const Default: Story = {
    args: {
        hint: 'Hint',
        label: 'Label',
    },
    render: (args) => (
        <PhoneInput
            data-testid="custom-data-test-id"
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...args}
        />
    ),
};
