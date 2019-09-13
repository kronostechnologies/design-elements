import React from 'react';

import { Card } from '@equisoft/design-elements-react';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

storiesOf('Card', module)
    .add('default', () => (
        <Card>{text('Children', 'Hello, World!')}</Card>
    ));
