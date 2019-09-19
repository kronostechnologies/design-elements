import React from 'react';

import { Card } from '@equisoft/design-elements-react';
import { storiesOf } from '@storybook/react';

storiesOf('Card', module)
    .add('default', () => (
        <Card>{'Hello, World!'}</Card>
    ));
