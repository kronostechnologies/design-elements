import React from 'react';
import { storiesOf } from '@storybook/react';
import { Progress } from '@equisoft/design-elements-react';

storiesOf('Progress', module)
    .add('Beginning', () => (
        <Progress max={2} value={0} />
    ))
    .add('Middle', () => (
        <Progress max={2} value={1} />
    ))
    .add('End', () => (
        <Progress max={2} value={2} />
    ));
