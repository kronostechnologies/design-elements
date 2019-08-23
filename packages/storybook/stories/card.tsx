import * as React from 'react';

import { Card } from '@equisoft/design-elements-react';
import { text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Card', module);
stories.addDecorator(withKnobs);

stories.add('default', () => (
        <Card>{text('Children', 'Hello, World!')}</Card>
));
