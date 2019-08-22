import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { Legend, ProgressCircle, ProgressBar } from '@equisoft/design-elements-react';

const progressBars = [
  {
    color: "rgb(101,226,255)",
    descriptionLabel: "You",
    endLabel: "50k - 100k$",
    percent: "100",
  },
  {
    color: "rgb(38, 50, 56)",
    descriptionLabel: "Equisoft",
    endLabel: "150k - 250k$",
    percent: "60",
    secondary: true,
  },
  {
    color: "rgb(99, 114, 130)",
    descriptionLabel: "General",
    endLabel: "150k - 250k$",
    percent: "60",
    secondary: true,
  }
];

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

storiesOf('Results/Legend', module)
    .add('Default', () => (
        <Legend items={legendItems} />
    ));

storiesOf('Results/ProgressCircle', module)
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

storiesOf('Results/ProgressBar', module)
    .add('Default', () => (
        <ProgressBar content={progressBars} />
    ));
    