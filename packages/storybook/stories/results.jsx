import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Legend, ProgressCircle } from '@equisoft/design-elements-react';

const legend = [
    {
      name: "Vous",
      description: "Données provenants de vos réponses"
    },
    {
      name: "Pairs Equisoft",
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
        <Legend 
          legend={legend}
        />
    ))
    .add('Progress Circle', () => (
      <React.Fragment>
        <ProgressCircle 
          radius="60" 
          stroke="4" 
          progress="75"
          label="Vous"
          number="50k $"
          color="#65e2ff"
        />
        <ProgressCircle 
          radius="60" 
          stroke="4" 
          progress="75"
          label="Vous"
          number="50k $"
          color="#65e2ff"
        />
        <ProgressCircle 
          radius="60" 
          stroke="4" 
          progress="75"
          label="Vous"
          number="50k $"
          color="#65e2ff"
        />
      </React.Fragment>
    ));