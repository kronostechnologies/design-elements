import React from 'react';
import { storiesOf } from '@storybook/react';
import { Legend, ProgressBar } from '@equisoft/design-elements-react';

const legend = [
    {
      name: "Vous",
      description: "Données provenants de vos réponses"
    },
    {
      name: "Pairs d'Equisoft",
      description: "Données privée d'Equisoft",
      color: "#000014"
    },
    {
      name: "Pairs Général",
      description: "Données publiques accessible à tous",
      color: "#304E63"
    }
];

const progressBars = [
  {
    main: true,
    label: "Vous",
    percent: "100",
    color: "rgb(0, 129, 165)",
    numbers: "50k - 100k$",
  },
  {
    label: "Pairs Equisoft",
    percent: "60",
    color: "rgb(38, 50, 56)",
    numbers: "150k - 250k$",
  },
  {
    label: "Pairs Général",
    percent: "60",
    color: "rgb(99, 114, 130)",
    numbers: "150k - 250k$",
  }
]

storiesOf('Results', module)
    .add('Legend', () => (
        <Legend legend={legend}
        />
    ))
    .add('Progress Bar', () => (
        <ProgressBar 
          content={progressBars}
        />
));
