import { Chooser } from '@equisoft/design-elements-react';
import React from 'react';

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

export const normal = () => (
    <Chooser
        groupName="maritalStatus"
        inColumns={false}
        options={maritalStatus}
    />
);

export const withASkipButton = () => (
    <Chooser
        groupName="maritalStatusSkip"
        inColumns={false}
        options={maritalStatus}
        skipOption={skipOption}
    />
);
export const withValue = () => (
    <Chooser
        groupName="ageRange"
        options={ageRange}
        value="35,49"
    />
);
export const inColumns = () => (
    <Chooser
        groupName="ageRangeColumn"
        inColumns={true}
        options={ageRange}
    />
);
export const withCallback = () => (
    <Chooser
        groupName="ageRangeCallback"
        inColumns={true}
        onChange={event => console.log(event)}
        options={ageRange}
    />
);
