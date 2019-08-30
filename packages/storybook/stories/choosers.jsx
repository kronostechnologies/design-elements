import React from 'react';
import { storiesOf } from '@storybook/react';
import { Chooser } from '@equisoft/design-elements-react';

const maritalStatus = [
    { value: 'single', label: 'Single, living alone or with a roommate' },
    { value: 'married', label: 'Married or living with a spouse' }
];

const ageRange = [
    { value: '0,24', label: 'Less than 24 years old' },
    { value: '25,34', label: '25 to 34 years old' },
    { value: '35,49', label: '35 to 49 years old' },
    { value: '50,64', label: '50 to 64 years old' },
    { value: '65+', label: '65+ years old' },
];

storiesOf('Choosers', module)
    .add('Chooser with a skip button', () => (
        <Chooser
            groupName="maritalStatus"
            options={maritalStatus}
            skipLabel="Would rather not say"
            skipValue="skip"
        />
    ))
    .add('Chooser in Columns with callback', () => (
        <Chooser
            groupName="ageRange"
            value={value}
            onChange={event => {
                console.log(event.currentTarget.value);
            }}
            options={ageRange}
            inColumns
        />
    ));
