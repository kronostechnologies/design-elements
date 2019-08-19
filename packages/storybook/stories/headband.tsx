import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Headband } from '@equisoft/design-elements-react';

storiesOf('Headband', module)
    .add('Equisoft Default', () => (
        <Headband appName="Benchmark">
            Hello, World!
        </Headband>
    ));
