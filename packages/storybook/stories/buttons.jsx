import React from 'react';
import { storiesOf } from '@storybook/react';
import {
    ButtonPrimary,
    ButtonSecondary,
    ButtonTertiary,
    ButtonAddPrimary,
    ButtonAddSecondary

} from '@equisoft/design-elements-react';

storiesOf('Buttons', module)
    .add('Primary', () => (
        <ButtonPrimary>Primary Button</ButtonPrimary>
    ))
    .add('Secondary', () => (
        <ButtonSecondary>Secondary Button</ButtonSecondary>
    ))
    .add('Tertiary', () => (
        <ButtonTertiary>Tertiary Button</ButtonTertiary>
    ));

storiesOf('Buttons/Add', module)
    .add('Primary', () => (
        <ButtonAddPrimary>Primary Button</ButtonAddPrimary>
    ))
    .add('Secondary', () => (
        <ButtonAddSecondary>Secondary Button</ButtonAddSecondary>
    ));
