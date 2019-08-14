import React from 'react';
import { storiesOf } from '@storybook/react';
import { Legend, ProgressBar } from '@equisoft/design-elements-react';

const progressBars = [
  {
    main: true,
    label: "You",
    percent: "100",
    color1: "rgb(0, 129, 165)",
    color2: "rgb(85,210,240)",
    numbers: "50k - 100k$",
  },
  {
    label: "Equisoft",
    percent: "60",
    color1: "rgb(38, 50, 56)",
    numbers: "150k - 250k$",
  },
  {
    label: "General",
    percent: "60",
    color1: "rgb(99, 114, 130)",
    numbers: "150k - 250k$",
  }
]

storiesOf('Results', module)
    .add('Progress Bar', () => (
        <ProgressBar 
          content={progressBars}
        />
));
