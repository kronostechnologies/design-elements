import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '@equisoft/design-elements-react';

storiesOf('Checkboxes', module)
    .add('Normal', () => (
        <Checkbox onChange={() => {console.log('Change event toggled')}} />
    ))
    .add('Checked by default', () => (
        <Checkbox defaultChecked onChange={() => {console.log('Change event toggled')}} />
    ))
    .add('Event callback', () => (
        <Checkbox onChange={(event, checked) => console.log(`Checkbox is ${checked ? 'checked' : 'unchecked'}!`)} />
    ))
