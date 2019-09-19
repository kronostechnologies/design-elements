import React from 'react';

import { AddButton, Button } from '@equisoft/design-elements-react';
import { boolean, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

const options = ['primary', 'secondary', 'tertiary'];

storiesOf('Buttons', module)
    .add('Primary', () => (
        <Button
            label={text('label', 'Primary Button')}
            buttonType={select('buttonType', options, 'primary') as ButtonType}
            disabled={boolean('disabled', false)}
        />
    ))
    .add('Secondary', () => (
        <Button
            label={text('label', 'Secondary Button')}
            buttonType={select('buttonType', options, 'secondary') as ButtonType}
            disabled={boolean('disabled', false)}
        />
    ))
    .add('Tertiary', () => (
        <Button
            label={text('label', 'Tertiary Button')}
            buttonType={select('buttonType', options, 'tertiary') as ButtonType}
            disabled={boolean('disabled', false)}
        />
    ))
    .add('Disabled', () => (
        <Button
            label={text('label', 'Disabled Button')}
            buttonType={select('buttonType', options, 'primary') as ButtonType}
            disabled={boolean('disabled', true)}
        />
    ))
    .add('Event callback', () => (
        <Button
            label={text('label', 'See Console For Callback')}
            onClick={() => { console.log('The button has been clicked!'); }}
            buttonType={select('buttonType', options, 'primary') as ButtonType}
            disabled={boolean('disabled', false)}
        />
    ));

storiesOf('Buttons/Add', module)
    .add('Primary', () => (
        <AddButton
            label={text('label', 'Primary Button')}
            buttonType={select('buttonType', options, 'primary') as ButtonType}
            disabled={boolean('disabled', false)}
        />
    ))
    .add('Secondary', () => (
        <AddButton
            label={text('label', 'Secondary Button')}
            buttonType={select('buttonType', options, 'secondary') as ButtonType}
            disabled={boolean('disabled', false)}
        />
    ))
    .add('Tertiary', () => (
        <AddButton
            label={text('label', 'Tertiary Button')}
            buttonType={select('buttonType', options, 'tertiary') as ButtonType}
            disabled={boolean('disabled', false)}
        />
    ));
