import React from 'react';
import { storiesOf } from '@storybook/react';

import { AddButton, Button } from '@equisoft/design-elements-react';

storiesOf('Buttons', module)
    .add('Primary', () => (
        <Button type="primary">
            Primary Button
        </Button>
    ))
    .add('Secondary', () => (
        <Button type="secondary">Secondary Button</Button>
    ))
    .add('Tertiary', () => (
        <Button type="tertiary">Tertiary Button</Button>
    ))
    .add('Disabled', () => (
        <Button disabled type="primary">Disabled Button</Button>
    ))
    .add('Event callback', () => (
        <Button
            onClick={() => {console.log("The button has been clicked!")}}
            type="primary"
        >
            See Console For Callback
        </Button>
    ));

storiesOf('Buttons/Add', module)
    .add('Primary', () => (
        <AddButton type="primary">Primary Button</AddButton>
    ))
    .add('Secondary', () => (
        <AddButton type="secondary">Secondary Button</AddButton>
    ));
