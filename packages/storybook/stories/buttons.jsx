import React from 'react';
import { storiesOf } from '@storybook/react';

import { AddButton, Button } from '@equisoft/design-elements-react';

storiesOf('Buttons', module)
    .add('Primary', () => (
        <Button type="primary">Primary Button</Button>
    ))
    .add('Secondary', () => (
        <Button type="secondary">Secondary Button</Button>
    ))
    .add('Tertiary', () => (
        <Button type="tertiary">Tertiary Button</Button>
    ));

storiesOf('Buttons/Add', module)
    .add('Primary', () => (
        <AddButton type="primary">Primary Button</AddButton>
    ))
    .add('Secondary', () => (
        <AddButton type="secondary">Secondary Button</AddButton>
    ));
