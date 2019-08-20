import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { AddButton, Button } from '@equisoft/design-elements-react';
import { action } from '@storybook/addon-actions';

storiesOf('Buttons', module)
    .add('Primary', () => (
        <Button buttonType="primary" onClick={action('Button clicked')}>
            Primary Button
        </Button>
    ))
    .add('Secondary', () => (
        <Button buttonType="secondary" onClick={action('Button clicked')}>Secondary Button</Button>
    ))
    .add('Tertiary', () => (
        <Button buttonType="tertiary" onClick={action('Button clicked')}>Tertiary Button</Button>
    ))
    .add('Disabled', () => (
        <Button disabled buttonType="primary" onClick={action('Button clicked')}>Disabled Button</Button>
    ))
    .add('Event callback', () => (
        <Button
            onClick={() => {console.log("The button has been clicked!")}}
            buttonType="primary"
        >
            See Console For Callback
        </Button>
    ));

storiesOf('Buttons/Add', module)
    .add('Primary', () => (
        <AddButton buttonType="primary" onClick={action('Button clicked')}>Primary Button</AddButton>
    ))
    .add('Secondary', () => (
        <AddButton buttonType="secondary" onClick={action('Button clicked')}>Secondary Button</AddButton>
    ))
    .add('Tertiary', () => (
        <AddButton buttonType="tertiary" onClick={action('Button clicked')}>Tertiary Button</AddButton>
    ));
