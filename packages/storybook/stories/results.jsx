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
          radius="73" 
          stroke="8" 
          progress="75"
          label="Vous"
          number="50k $"
          color="#65e2ff"
        />
        <ProgressCircle 
          radius="73" 
          stroke="8" 
          progress="100"
          label="Pairs Equisoft"
          number="63k $"
          color="#263238"
        />
        <ProgressCircle 
          radius="73" 
          stroke="8" 
          progress="60"
          label="Pairs General"
          number="45k $"
          color="#637282"
        />
      </React.Fragment>
    ));