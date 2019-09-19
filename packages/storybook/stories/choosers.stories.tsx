import React from 'react';

import { Chooser } from '@equisoft/design-elements-react';
import { action } from '@storybook/addon-actions';
import { boolean, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

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

storiesOf('Choosers', module)
    .add('Chooser with a skip button', () => (
        <Chooser
            groupName={text('groupName', 'maritalStatus')}
            inColumns={boolean('inColumns', false)}
            options={object('options', maritalStatus)}
            onChange={action('onChange callback')}
            skipOption={object('skipOption', skipOption)}
        />
    ))
    .add('Chooser in Columns with callback', () => (
        <Chooser
            groupName={text('groupName', 'ageRange')}
            inColumns={boolean('inColumns', true)}
            onChange={action('onChange callback')}
            options={object('options', ageRange)}
        />
    ));
