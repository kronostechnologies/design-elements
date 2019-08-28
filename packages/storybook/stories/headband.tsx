import * as React from 'react';

import { Headband } from '@equisoft/design-elements-react';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

storiesOf('Headband', module)
    .add('Equisoft Default', () => (
        <Headband appName={text('appName', 'Benchmark')}>
            {text('Children (not a property)', 'Hello World!')}
        </Headband>
    ));
