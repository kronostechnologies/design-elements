import { Meta, StoryObj } from '@storybook/react';
import { Checkbox, Fieldset, RadioButton, RadioCard, TextInput } from '@equisoft/design-elements-react';
import { rawCodeParameters } from './utils/parameters';

const fieldsetMeta: Meta<typeof Fieldset> = {
    title: 'Components/Fieldset',
    component: Fieldset,
    parameters: rawCodeParameters,
};

export default fieldsetMeta;

type Story = StoryObj<typeof Fieldset>;

const withCheckboxes = (
    <>
        <Checkbox label='Checkbox 1!' />
        <Checkbox label='Checkbox 2!' />
        <Checkbox label='Checkbox 3!' />
    </>
);

const withRadioButtons = (
    <>
        <RadioButton label='Radio 1!' />
        <RadioButton label='Radio 2!' />
        <RadioButton label='Radio 3!' />
    </>
);

const withTextInputs = (
    <>
        <TextInput label='Text Input 1!' />
        <TextInput label='Text Input 2!' />
        <TextInput label='Text Input 2!' />
    </>
);

const withRadioCards = (
    <>
        <RadioCard label='Radio Card 1!' name='radio-card-1' value='radio-1' />
        <RadioCard label='Radio Card 2!' name='radio-card-2' value='radio-2' />
        <RadioCard label='Radio Card 3!' name='radio-card-3' value='radio-3' />
    </>
);

export const Default: Story = {
    args: {
        children: withCheckboxes,
    },
};

export const Legend: Story = {
    args: {
        legend: { children: 'This is a legend!', bold: true, size: 'large' },
        children: withCheckboxes,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        legend: { children: 'This is disabled!', size: 'large' },
        children: withCheckboxes,
    },
};

export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
        legend: { children: 'This is horizontal with text inputs!', size: 'large' },
        children: withTextInputs,
    },
};

export const WithRadioButtons: Story = {
    args: {
        legend: { children: 'With Radio Buttons!', size: 'large' },
        children: withRadioButtons,
    },
};

export const WithRadioCards: Story = {
    args: {
        legend: { children: 'With Radio Buttons!', size: 'large' },
        children: withRadioCards,
    },
};
