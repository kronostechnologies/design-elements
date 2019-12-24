import React, { ChangeEvent } from 'react';

import { ToggleButtonGroup } from '@equisoft/design-elements-react';

const buttonGroup = [
    {
        value: 'option1',
        label: 'Option 1',
    },
    {
        value: 'option2',
        label: 'Option 2',
    },
    {
        value: 'option3',
        label: 'Option 3',
    },
    {
        value: 'option4',
        label: 'Option 4',
    },
];

const defaultCheckedGroup = [
    {
        value: 'option1',
        label: 'Option 1',
    },
    {
        value: 'option2',
        label: 'Option 2',
        defaultChecked: true,
    },
    {
        value: 'option3',
        label: 'Option 3',
    },
    {
        value: 'option4',
        label: 'Option 4',
    },
];

const disabledGroup = [
    {
        value: 'option1',
        label: 'Option 1',
        disabled: true,
    },
    {
        value: 'option2',
        label: 'Option 2',
    },
    {
        value: 'option3',
        label: 'Option 3',
        disabled: true,
    },
    {
        value: 'option4',
        label: 'Option 4',
    },
];

export default {
    title: 'Toggle Button Group',
    component: ToggleButtonGroup,
};

export const toggleButtonGroup = () => (
    <ToggleButtonGroup groupName="Story1" buttonGroup={buttonGroup}/>
);
export const defaultChecked = () => (
    <ToggleButtonGroup groupName="Story2" buttonGroup={defaultCheckedGroup}/>
);
export const disabled = () => (
    <ToggleButtonGroup groupName="Story3" buttonGroup={disabledGroup}/>
);
export const mobile = () => (
    <ToggleButtonGroup groupName="Story4" device="mobile" buttonGroup={buttonGroup}/>
);
export const withCallback = () => (
    <ToggleButtonGroup
        groupName="Test5"
        buttonGroup={buttonGroup}
        onChange={(event: ChangeEvent<HTMLInputElement>) => console.log(`Toggled button value: ${event.target.value}`)}
    />
);
