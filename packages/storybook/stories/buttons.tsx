import * as React from 'react';

import { AddButton, Button } from '@equisoft/design-elements-react';
import { select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

const options = ['primary', 'secondary', 'tertiary'];

storiesOf('Buttons', module)
    .add('Primary', () => (
        <Button buttonType={select('buttonType', options, 'primary') as ButtonType}>
            {text('children', 'Primary Button')}
        </Button>
    ))
    .add('Secondary', () => (
        <Button buttonType={select('buttonType', options, 'secondary') as ButtonType}>
            {text('children', 'Secondary Button')}
        </Button>
    ))
    .add('Tertiary', () => (
        <Button buttonType={select('buttonType', options, 'tertiary') as ButtonType}>
            {text('children', 'Tertiary Button')}
        </Button>
    ))
    .add('Disabled', () => (
        <Button disabled buttonType={select('buttonType', options, 'primary') as ButtonType}>
            {text('children', 'Disabled Button')}
        </Button>
    ))
    .add('Event callback', () => (
        <Button
            onClick={() => { console.log('The button has been clicked!'); }}
            buttonType={select('buttonType', options, 'primary') as ButtonType}
        >
            {text('children', 'See Console For Callback')}
        </Button>
    ));

storiesOf('Buttons/Add', module)
    .add('Primary', () => (
        <AddButton buttonType={select('buttonType', options, 'primary') as ButtonType}>
            {text('children', 'Primary Button')}
        </AddButton>
    ))
    .add('Secondary', () => (
        <AddButton buttonType={select('buttonType', options, 'secondary') as ButtonType}>
            {text('children', 'Tertiary Button')}
        </AddButton>
    ))
    .add('Tertiary', () => (
        <AddButton buttonType={select('buttonType', options, 'tertiary') as ButtonType}>
            {text('children', 'Disabled Button')}
        </AddButton>
    ));
