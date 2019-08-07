import React, { Fragment } from 'react';
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

storiesOf('Results', module)
    .add('Legend', () => (
        <Legend legend={legend}
        />
    ))
    .add('Progress Bar', () => (
      <React.Fragment>
        <ProgressBar 
          label = "Vous"
          percent = "80"
          color = "#2CABCD"
          numbers= "50k - 100k$"
        />
        <ProgressBar 
          label = "Pairs Equisoft"
          percent = "60"
          color = "#263238"
          numbers= "150k - 250k$"
        />
        <ProgressBar 
          label = "Pairs General"
          percent = "85"
          color = "#637282"
          numbers= "425k - 500k$"
        />
      </React.Fragment>
  ));