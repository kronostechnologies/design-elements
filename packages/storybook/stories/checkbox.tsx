import React from 'react';

import { Checkbox } from '@equisoft/design-elements-react';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';

storiesOf('Checkboxes', module)
    .add('Normal', () => (
        <Checkbox
            defaultChecked={false}
            onChange={action('onChange callback')}
        />
    ))
    .add('Checked by default', () => (
        <Checkbox
            defaultChecked={true}
            onChange={action('onChange callback')}
        />
    ))
    .add('Event callback', () => (
        <Checkbox
            defaultChecked={false}
            onChange={action('onChange callback')}
        />
    ));
