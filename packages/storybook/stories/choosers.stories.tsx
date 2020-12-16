import { Chooser } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

const maritalStatus = [
    { value: 'single', label: 'Single, living alone or with a roommate' },
    { value: 'married', label: 'Married or living with a spouse' },
];

const ageRange = [
    { value: '0,24', label: 'Less than 24 years old' },
    { value: '25,34', label: '25 to 34 years old' },
    { value: '35,49', label: '35 to 49 years old' },
    { value: '50,64', label: '50 to 64 years old' },
    { value: '65+', label: '65+ years old' },
];

const skipOption = {
    value: 'skip',
    label: 'Would rather not say',
};

export default {
    title: 'Choosers',
    component: Chooser,
};

export const Normal: Story = () => (
    <Chooser
        groupName="maritalStatus"
        inColumns={false}
        options={maritalStatus}
    />
);

export const WithASkipButton: Story = () => (
    <Chooser
        groupName="maritalStatusSkip"
        inColumns={false}
        options={maritalStatus}
        skipOption={skipOption}
    />
);
export const WithValue: Story = () => {
    const [value, setValue] = useState('35,49');

    return (
        <Chooser
            groupName="ageRange"
            options={ageRange}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
        />
    );
};
export const InColumns: Story = () => (
    <Chooser
        groupName="ageRangeColumn"
        inColumns
        options={ageRange}
    />
);
export const WithCallback: Story = () => (
    <Chooser
        groupName="ageRangeCallback"
        inColumns
        onChange={(event) => console.info(event)}
        options={ageRange}
    />
);
