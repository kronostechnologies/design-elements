import * as React from 'react';

import { EnsoSpinner } from '@equisoft/design-elements-react';
import { storiesOf } from '@storybook/react';

storiesOf('Spinners', module)
    .add('Enso', () => (
        <EnsoSpinner />
    ))
    