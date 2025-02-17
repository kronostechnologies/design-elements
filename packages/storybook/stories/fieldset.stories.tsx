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
    <div style={{ display: 'flex', flexDirection: 'column' }}>
        {/*  replace inline style with grid */}
        <Checkbox label='Checkbox 1!' />
        <Checkbox label='Checkbox 2!' />
        <Checkbox label='Checkbox 3!' />
    </div>
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
        legend: 'This is a legend!',
        children: withTextInputs,
    },
};

export const Disabled: Story = {
    args: {
        disabled: true,
        legend: { text: 'This is disabled!', size: 'xxsmall' },
        children: withCheckboxes,
    },
};

export const WithRadioButtons: Story = {
    args: {
        legend: { text: 'With Radio Buttons!', size: 'xxsmall' },
        children: withRadioButtons,
    },
};

export const WithRadioCards: Story = {
    args: {
        legend: { text: 'With Radio Buttons!', size: 'xxsmall' },
        children: withRadioCards,
    },
};
