import React from 'react';

import { AddButton } from '@equisoft/design-elements-react';
import { boolean, select, text } from '@storybook/addon-knobs';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

const options = ['primary', 'secondary', 'tertiary'];

export default {
    title: 'Buttons/Add',
    component: AddButton,
};

export const primary = () => (
    <AddButton
        label={text('label', 'Primary Button')}
        buttonType={select('buttonType', options, 'primary') as ButtonType}
        disabled={boolean('disabled', false)}
    />
);
export const secondary = () => (
    <AddButton
        label={text('label', 'Secondary Button')}
        buttonType={select('buttonType', options, 'secondary') as ButtonType}
        disabled={boolean('disabled', false)}
    />
);
export const tertiary = () => (
    <AddButton
        label={text('label', 'Tertiary Button')}
        buttonType={select('buttonType', options, 'tertiary') as ButtonType}
        disabled={boolean('disabled', false)}
    />
);
