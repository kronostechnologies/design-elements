import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import { Checkbox } from '@equisoft/design-elements-react';

storiesOf('Checkboxes', module)
    .add('Normal', () => (
        <Checkbox onChange={action('Change event toggled')} />
    ))
    .add('Checked by default', () => (
        <Checkbox defaultChecked onChange={action('Change event toggled')} />
    ))
    .add('Event callback', () => (
        <Checkbox onChange={action('Checked property is')} />
    ))
