import React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '@equisoft/design-elements-react';

storiesOf('Checkboxes', module)
    .add('Normal', () => (
        <Checkbox />
    ))
    .add('Checked by default', () => (
        <Checkbox defaultChecked />
    ))
    .add('Event callback', () => (
        <Checkbox onChange={(checked) => console.log(`Checkbox is ${checked ? 'checked' : 'unchecked'}!`)} />
    ))
