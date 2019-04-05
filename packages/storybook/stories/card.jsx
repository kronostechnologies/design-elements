import React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from '@equisoft/design-elements-react';

storiesOf('Card', module)
    .add('default', () => (
        <Card>Hello, World!</Card>
    ));
