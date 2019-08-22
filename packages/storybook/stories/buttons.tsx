import * as React from 'react';
import { storiesOf } from '@storybook/react';

import { AddButton, Button } from '@equisoft/design-elements-react';

storiesOf('Buttons', module)
    .add('Primary', () => (
        <Button buttonType="primary" onClick={() => {console.log('Button Clicked')}}>
            Primary Button
        </Button>
    ))
    .add('Secondary', () => (
        <Button buttonType="secondary" onClick={() => {console.log('Button Clicked')}}>Secondary Button</Button>
    ))
    .add('Tertiary', () => (
        <Button buttonType="tertiary" onClick={() => {console.log('Button Clicked')}}>Tertiary Button</Button>
    ))
    .add('Disabled', () => (
        <Button disabled buttonType="primary" onClick={() => {console.log('Button Clicked')}}>Disabled Button</Button>
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
        <AddButton buttonType="primary" onClick={() => {console.log('Button Clicked')}}>Primary Button</AddButton>
    ))
    .add('Secondary', () => (
        <AddButton buttonType="secondary" onClick={() => {console.log('Button Clicked')}}>Secondary Button</AddButton>
    ))
    .add('Tertiary', () => (
        <AddButton buttonType="tertiary" onClick={() => {console.log('Button Clicked')}}>Tertiary Button</AddButton>
    ));
