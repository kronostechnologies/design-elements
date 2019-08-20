import * as React from 'react';

import { Headband } from '@equisoft/design-elements-react';
import { withKnobs, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Headband', module);
stories.addDecorator(withKnobs);

stories.add('Equisoft Default', () => (
        <Headband appName={text('appName', 'Benchmark')}>
            {text('Children (not a property)', 'Hello World!')}
        </Headband>
    ));
