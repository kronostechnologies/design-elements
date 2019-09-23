import React from 'react';

import { AddButton, Button } from '@equisoft/design-elements-react';
import { action } from '@storybook/addon-actions';
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
            onClick={action('onClick callback')}
        />
    ))
    .add('Secondary', () => (
        <Button
            label={text('label', 'Secondary Button')}
            buttonType={select('buttonType', options, 'secondary') as ButtonType}
            disabled={boolean('disabled', false)}
            onClick={action('onClick callback')}
        />
    ))
    .add('Tertiary', () => (
        <Button
            label={text('label', 'Tertiary Button')}
            buttonType={select('buttonType', options, 'tertiary') as ButtonType}
            disabled={boolean('disabled', false)}
            onClick={action('onClick callback')}
        />
    ))
    .add('Disabled', () => (
        <Button
            label={text('label', 'Disabled Button')}
            buttonType={select('buttonType', options, 'primary') as ButtonType}
            disabled={boolean('disabled', true)}
            onClick={action('onClick callback')}
        />
    ));

storiesOf('Buttons/Add', module)
    .add('Primary', () => (
        <AddButton
            label={text('label', 'Primary Button')}
            buttonType={select('buttonType', options, 'primary') as ButtonType}
            disabled={boolean('disabled', false)}
            onClick={action('onClick callback')}
        />
    ))
    .add('Secondary', () => (
        <AddButton
            label={text('label', 'Secondary Button')}
            buttonType={select('buttonType', options, 'secondary') as ButtonType}
            disabled={boolean('disabled', false)}
            onClick={action('onClick callback')}
        />
    ))
    .add('Tertiary', () => (
        <AddButton
            label={text('label', 'Tertiary Button')}
            buttonType={select('buttonType', options, 'tertiary') as ButtonType}
            disabled={boolean('disabled', false)}
            onClick={action('onClick callback')}
        />
    ));
