import * as React from 'react';

import { Progress } from '@equisoft/design-elements-react';
import { number } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Progress', module);

stories.add('Beginning', () => (
        <Progress max={number('max', 2)} value={number('value', 0)} />
    ))
    .add('Middle', () => (
        <Progress max={number('max', 2)} value={number('value', 1)} />
    ))
    .add('End', () => (
        <Progress max={number('max', 2)} value={number('value', 2)} />
    ));
