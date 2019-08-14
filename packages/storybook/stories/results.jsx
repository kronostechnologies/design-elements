import React from 'react';
import { storiesOf } from '@storybook/react';
import { Legend, ProgressBar } from '@equisoft/design-elements-react';

const progressBars = [
  {
    color1: "rgb(0, 128, 165)",
    color2: "rgb(101,226,255)",
    descriptionLabel: "You",
    endLabel: "50k - 100k$",
    percent: "100",
  },
  {
    color1: "rgb(38, 50, 56)",
    descriptionLabel: "Equisoft",
    endLabel: "150k - 250k$",
    percent: "60",
  },
  {
    color1: "rgb(99, 114, 130)",
    descriptionLabel: "General",
    endLabel: "150k - 250k$",
    percent: "60",
  }
]

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
    .add('Progress Bar', () => (
        <ProgressBar 
          content={progressBars}
        />
    ))
    .add('Legend', () => (
      <Legend items={legendItems} />
    ));
