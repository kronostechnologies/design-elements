import * as React from 'react';

import { AddButton, Button } from '@equisoft/design-elements-react';
import { select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const buttons = storiesOf('Buttons', module);
buttons.addDecorator(withKnobs);

const addButtons = storiesOf('Buttons/Add', module);
addButtons.addDecorator(withKnobs);
const options = ['primary', 'secondary', 'tertiary'];

buttons.add('Primary', () => (
        <Button buttonType={select('buttonType', options, 'primary')}>
            {text('children', 'Primary Button')}
        </Button>
    ))
    .add('Secondary', () => (
        <Button buttonType={select('buttonType', options, 'secondary')}>
            {text('children', 'Secondary Button')}
        </Button>
    ))
    .add('Tertiary', () => (
        <Button buttonType={select('buttonType', options, 'tertiary')}>
            {text('children', 'Tertiary Button')}
        </Button>
    ))
    .add('Disabled', () => (
        <Button disabled buttonType={select('buttonType', options, 'primary')}>
            {text('children', 'Disabled Button')}
        </Button>
    ))
    .add('Event callback', () => (
        <Button
            onClick={() => { console.log('The button has been clicked!'); }}
            buttonType={select('buttonType', options, 'primary')}
        >
            {text('children', 'See Console For Callback')}
        </Button>
    ));

addButtons.add('Primary', () => (
        <AddButton buttonType={select('buttonType', options, 'primary')}>
            {text('children', 'Primary Button')}
        </AddButton>
    ))
    .add('Secondary', () => (
        <AddButton buttonType={select('buttonType', options, 'secondary')}>
            {text('children', 'Tertiary Button')}
        </AddButton>
    ))
    .add('Tertiary', () => (
        <AddButton buttonType={select('buttonType', options, 'tertiary')}>
            {text('children', 'Disabled Button')}
        </AddButton>
    ));
