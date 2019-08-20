import * as React from 'react';

import { AddButton, Button } from '@equisoft/design-elements-react';
import { boolean, select, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const options = ['primary', 'secondary', 'tertiary'];

const stories = storiesOf('Buttons', module);
stories.addDecorator(withKnobs);

stories.add('Primary', () => (
        <Button buttonType={select('buttonType', options, 'primary')} onClick={() => {console.log('Button Clicked')}}>
            {text('Children (not a property)', 'Primary Button')}
        </Button>
    ))
    .add('Secondary', () => (
        <Button buttonType={select('buttonType', options, 'secondary')} onClick={() => {console.log('Button Clicked')}}>{text('Children (not a property)', 'Secondary Button')}</Button>
    ))
    .add('Tertiary', () => (
        <Button buttonType={select('buttonType', options, 'tertiary')} onClick={() => {console.log('Button Clicked')}}>{text('Children (not a property)', 'Tertiary Button')}</Button>
    ))
    .add('Disabled', () => (
        <Button disabled={boolean('disabled', true)} buttonType={select('buttonType', options, 'primary')} onClick={() => {console.log('Button Clicked')}}>{text('Children (not a property)', 'Disabled Button')}</Button>
    ))
    .add('Event callback', () => (
        <Button
            onClick={() => {console.log('The button has been clicked!')}}
            buttonType={select('buttonType', options, 'primary')}
        >
            {text('Children (not a property)', 'See Console for Callback')}
        </Button>
    ));

const nested = storiesOf('Buttons/Add', module);
nested.addDecorator(withKnobs);
  
nested.add('Primary', () => (
        <AddButton buttonType={select('buttonType', options, 'primary')} onClick={() => {console.log('Button Clicked')}}>{text('Children (not a property)', 'Primary Button')}</AddButton>
    ))
    .add('Secondary', () => (
        <AddButton buttonType={select('buttonType', options, 'secondary')} onClick={() => {console.log('Button Clicked')}}>{text('Children (not a property)', 'Secondary Button')}</AddButton>
    ))
    .add('Tertiary', () => (
        <AddButton buttonType={select('buttonType', options, 'tertiary')} onClick={() => {console.log('Button Clicked')}}>{text('Children (not a property)', 'Tertiary Button')}</AddButton>
    ));
