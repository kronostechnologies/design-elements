import { Legend, ProgressBar, ProgressCircle } from '@equisoft/design-elements-react';
import { boolean, color, number, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

const legendItems = [
    {
        name: 'You',
        description: 'Data from your answers',
    },
    {
        name: 'Equisoft Peers',
        description: 'Private Equisoft data',
        color: '#000014',
    },
    {
        name: 'General Peers',
        description: 'Publicly accessible data',
        color: '#304E63',
    },
];

storiesOf('Results/Legend', module)
    .add('Default', () => (
        <Legend items={object('items', legendItems)} />
    ));

storiesOf('Results/ProgressCircle', module)
    .add('ProgressCircle', () => (
        <ProgressCircle
            percent={number('percent', 66)}
            color={color('color', 'rgb(101,226,255)')}
            descriptionLabel={text('descriptionLabel', 'RRSP')}
            resultLabel={text('resultLabel', '56 k$')}
            secondary={boolean('secondary', false)}
        />
    ))
    .add('ProgressCircle Secondary', () => (
        <ProgressCircle
            percent={number('percent', 66)}
            color={color('color', '#304E63')}
            descriptionLabel={text('descriptionLabel', 'RRSP')}
            resultLabel={text('resultLabel', '56 k$')}
            secondary={boolean('secondary', true)}
        />
    ));

storiesOf('Results/ProgressBar', module)
    .add('Default', () => (
        <ProgressBar
            color="rgb(101,226,255)"
            descriptionLabel="You"
            resultLabel="50k - 100k$"
            percent={100}
        />
    ))
    .add('Secondary', () => (
        <ProgressBar
            color="rgb(38, 50, 56)"
            descriptionLabel="Equisoft"
            resultLabel="150k - 250k$"
            percent={60}
            secondary={true}
        />
    ));
