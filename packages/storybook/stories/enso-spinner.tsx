import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { EnsoSpinner } from '@equisoft/design-elements-react';

storiesOf('Spinners', module)
    .add('Enso', () => (
        <EnsoSpinner />
    ))
    