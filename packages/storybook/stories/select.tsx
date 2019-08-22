import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Select } from '@equisoft/design-elements-react';

const provinces = [{value: "", label: "-"},
                   {value: "on", label: "Ontario"},
                   {value: "qc", label: "Quebec"},
                   {value: "bc", label: "British Columbia"},
                   {value: "ab", label: "Alberta"},
                   {value: "mb", label: "Manitoba"},
                   {value: "sk", label: "Saskatchewan"},
                   {value: "ns", label: "Nova Scotia"},
                   {value: "nb", label: "New Brunswick"},
                   {value: "nl", label: "Newfoundland and Labrador"},
                   {value: "pe", label: "Prince Edward Island"},
                   {value: "nt", label: "Northwest Territories"},
                   {value: "nu", label: "Nunavut"},
                   {value: "yt", label: "Yukon"}];

storiesOf('Select', module)
    .add('Default', () => (
        <Select
            label="Choose your province or territory"
            onChange={(value) => {console.log(value);}}
            options={provinces}
        />
    ))
    .add('With Skip', () => (
        <Select
            label="Choose your province or territory"
            onChange={(value) => {console.log(value);}}
            options={provinces}
            skipLabel="Skip this question"
            skipValue="skip"
        />
    ))
    .add('Required', () => (
        <Select
            label="Choose your province or territory"
            onChange={(value) => {console.log(value);}}
            options={provinces}
            required
            skipLabel="Skip this question"
            skipValue="skip"
        />
    ));
