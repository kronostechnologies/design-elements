import React from 'react';
import { storiesOf } from '@storybook/react';
import { Legend, ProgressCircle } from '@equisoft/design-elements-react';

const legendItems = [{
        name: "You",
        description: "Data from your answers"
    },
    {
        name: "Equisoft Peers",
        description: "Private Equisoft data",
        color: "#000014"
    },
    {
        name: "General Peers",
        description: "Publicly accessible data",
        color: "#304E63"
    }
];

storiesOf('Results', module)
    .add('Legend', () => (
        <Legend items={legendItems} />
    ))
    .add('ProgressCircle', () => (
        <ProgressCircle
            percent={66}
            color={'rgb(101,226,255)'}
            descriptionLabel='RRSP'
            resultLabel='56 k$'
        />
    ))
    .add('ProgressCircle Secondary', () => (
        <ProgressCircle
            percent={66}
            color={'#304E63'}
            descriptionLabel='RRSP'
            resultLabel='56 k$'
            secondary
        />
    ));
