import React from 'react';

import { Button } from '@equisoft/design-elements-react';
import { boolean, select, text } from '@storybook/addon-knobs';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

const options = ['primary', 'secondary', 'tertiary'];

export default {
    title: 'Buttons',
    component: Button,
};

export const primary = () => (
    <Button
        label={text('label', 'Primary Button')}
        buttonType={select('buttonType', options, 'primary') as ButtonType}
        disabled={boolean('disabled', false)}
    />
);
export const secondary = () => (
    <Button
        label={text('label', 'Secondary Button')}
        buttonType={select('buttonType', options, 'secondary') as ButtonType}
        disabled={boolean('disabled', false)}
    />
);
export const tertiary = () => (
    <Button
        label={text('label', 'Tertiary Button')}
        buttonType={select('buttonType', options, 'tertiary') as ButtonType}
        disabled={boolean('disabled', false)}
    />
);
export const disabled = () => (
    <Button
        label={text('label', 'Disabled Button')}
        buttonType={select('buttonType', options, 'primary') as ButtonType}
        disabled={boolean('disabled', true)}
    />
);
export const eventCallback = () => (
    <Button
        label={text('label', 'See Console For Callback')}
        onClick={() => { console.log('The button has been clicked!'); }}
        buttonType={select('buttonType', options, 'primary') as ButtonType}
        disabled={boolean('disabled', false)}
    />
);
