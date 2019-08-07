import React, { Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import { Legend, ProgressCircle, ProgressCircleTest } from '@equisoft/design-elements-react';

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
          main={true}
          percent="75"
          label="Vous"
          number="50k $"
          color="#65e2ff"
        />
        <ProgressCircle 
          percent="100"
          label="Pairs Equisoft"
          number="63k $"
          color="#263238"
        />
        <ProgressCircle 
          percent="60"
          label="Pairs General"
          number="45k $"
          color="#637282"
        />
      </React.Fragment>
    ));