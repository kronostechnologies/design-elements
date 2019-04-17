import React from 'react';
import { storiesOf } from '@storybook/react';
import { Headband } from '@equisoft/design-elements-react';

storiesOf('Headband', module)
    .add('default', () => (
        <Headband>Hello, World!</Headband>
    ));
