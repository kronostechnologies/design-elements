import { Meta, StoryObj } from '@storybook/react';
import { MaskInput } from '@equisoft/design-elements-react/src/components/mask-input/mask-input';

const MaskInputMeta: Meta<typeof MaskInput> = {
    title: 'Components/Mask Input',
    component: MaskInput,
    args: {
        mask: '(111) AAA-1111',
    },
};

export default MaskInputMeta;
type Story = StoryObj<typeof MaskInput>;

export const Default: Story = {
    ...MaskInputMeta,
    render: (args) => (
        <MaskInput
            data-testid='custom-data-test-id'
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...args}
        />
    ),
};
