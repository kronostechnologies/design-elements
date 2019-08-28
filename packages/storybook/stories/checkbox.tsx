import * as React from 'react';

import { Checkbox } from '@equisoft/design-elements-react';
import { boolean } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Checkboxes', module);

stories.add('Normal', () => (
        <Checkbox
            defaultChecked={boolean('defaultChecked', false)}
            onChange={() => { console.log('Change event toggled'); }}
        />
    ))
    .add('Checked by default', () => (
        <Checkbox
            defaultChecked={boolean('defaultChecked', true)}
            onChange={() => { console.log('Change event toggled'); }}
        />
    ))
    .add('Event callback', () => (
        <Checkbox
            onChange={(_event, checked) => console.log(`Checkbox is ${checked ? 'checked' : 'unchecked'}!`)}
            defaultChecked={boolean('defaultChecked', false)}
        />
    ));
