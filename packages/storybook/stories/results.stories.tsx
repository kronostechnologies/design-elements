import { Legend, ProgressBar, ProgressCircle } from '@equisoft/design-elements-react';
import { boolean, color, number, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import React from 'react';

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
            descriptionLabel={text('descriptionLabel', 'RRSP')}
            resultLabel={text('resultLabel', '56 k$')}
            percent={number('percent', 66)}
            color={color('color', 'rgb(101,226,255)')}
            secondary={boolean('secondary', false)}
        />
    ))
    .add('ProgressCircle Secondary', () => (
        <ProgressCircle
            descriptionLabel={text('descriptionLabel', 'RRSP')}
            resultLabel={text('resultLabel', '56 k$')}
            percent={number('percent', 66)}
            color={color('color', '#304E63')}
            secondary={boolean('secondary', true)}
        />
    ));

// storiesOf('Results/ProgressBar', module)
//     .add('Default', () => progressBars.map(bar => (
//             <ProgressBar {...bar} key={bar.descriptionLabel} />
//         ),
//     ));

storiesOf('Results/ProgressBar', module)
    .add('Default', () => (
        <ProgressBar
            descriptionLabel={text('descriptionLabel', 'You')}
            resultLabel={text('resultLabel', '50k - 100k$')}
            percent={number('percent', 100)}
            color={color('color', 'rgb(101,226,255)')}
            secondary={boolean('secondary', false)}
        />
    ))
    .add('Secondary', () => (
        <ProgressBar
            descriptionLabel={text('descriptionLabel', 'Equisoft')}
            resultLabel={text('resultLabel', '150k - 250k$')}
            percent={number('percent', 60)}
            color={color('color', 'rgb(38, 50, 56)')}
            secondary={boolean('secondary', true)}
        />
    ));
