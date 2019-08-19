import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Card } from '@equisoft/design-elements-react';
import { withKnobs, text } from '@storybook/addon-knobs';

const stories = storiesOf('Card', module);
stories.addDecorator(withKnobs);

stories.add('default', () => (
        <Card>{text('Content', 'Hello, World!')}</Card>
));
