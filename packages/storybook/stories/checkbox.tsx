import React from 'react';
import { Checkbox } from '@equisoft/design-elements-react';
import { storiesOf } from '@storybook/react';

storiesOf('Checkboxes', module)
    .add('Normal', () => (
        <Checkbox
            defaultChecked={false}
            onChange={() => { console.log('Change event toggled'); }}
        />
    ))
    .add('Checked by default', () => (
        <Checkbox
            defaultChecked={true}
            onChange={() => { console.log('Change event toggled'); }}
        />
    ))
    .add('Event callback', () => (
        <Checkbox
            defaultChecked={false}
            // tslint:disable-next-line:variable-name
            onChange={(_event, checked) => console.log(`Checkbox is ${checked ? 'checked' : 'unchecked'}!`)}
        />
    ));
