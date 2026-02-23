import { MaskedInput } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

const MaskedInputMeta: Meta<typeof MaskedInput> = {
    title: 'Components/Masked Input',
    component: MaskedInput,
    args: {
        mask: 'YYYY-MM-DD',
        pattern: '\\d{4}-\\d{1,2}-\\d{1,2}',
    },
};

export default MaskedInputMeta;
type Story = StoryObj<typeof MaskedInput>;

export const Default: Story = {
    ...MaskedInputMeta,
    args: {
        hint: 'Hint',
        label: 'Label',
    },
    decorators: [DesktopDecorator],
    render: (args) => (
        <MaskedInput
            data-testid='custom-data-test-id'
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...args}
        />
    ),
};

export const Mobile: Story = {
    ...MaskedInputMeta,
    decorators: [MobileDecorator],
};
