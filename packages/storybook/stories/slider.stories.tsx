import { Slider } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const SliderMeta: Meta<typeof Slider> = {
    title: 'Components/Slider',
    component: Slider,
    args: {
        label: 'Label',
    },
};

export default SliderMeta;

type Story = StoryObj<typeof Slider>;

export const Basic: Story = {
    ...SliderMeta,
    args: {
        ...SliderMeta.args,
        min: 0,
        max: 100,
        defaultValue: 50,
    },
};

export const Range: Story = {
    ...SliderMeta,
    args: {
        ...SliderMeta.args,
        min: 0,
        max: 100,
        defaultValue: [30, 60],
    },
};

export const Steps: Story = {
    ...SliderMeta,
    args: {
        ...SliderMeta.args,
        min: 0,
        max: 1000,
        step: 100,
        defaultValue: 600,
    },
};

export const Disabled: Story = {
    ...SliderMeta,
    args: {
        ...SliderMeta.args,
        min: 0,
        max: 100,
        defaultValue: 50,
        step: 10,
        disabled: true,
    },
};

export const WithToggletip: Story = {
    ...SliderMeta,
    args: {
        ...SliderMeta.args,
        toggletip: {
            label: 'Toggletip',
            children: 'Toggletip content',
        },
    },
};
