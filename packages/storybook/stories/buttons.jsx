import React from 'react';
import { storiesOf } from '@storybook/react';
import { PrimaryAddButton, PrimaryButton, SecondaryAddButton, SecondaryButton } from '@equisoft/design-elements-react';

storiesOf('Buttons', module)
    .add('Primary', () => (
        <PrimaryButton>Primary Button</PrimaryButton>
    ))
    .add('Secondary', () => (
        <SecondaryButton>Secondary Button</SecondaryButton>
    ));

storiesOf('Buttons/Add', module)
    .add('Primary', () => (
        <PrimaryAddButton>Primary Add Button</PrimaryAddButton>
    ))
    .add('Secondary', () => (
        <SecondaryAddButton>Secondary Add Button</SecondaryAddButton>
    ));
