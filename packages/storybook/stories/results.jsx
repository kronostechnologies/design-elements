import React from 'react';
import { storiesOf } from '@storybook/react';
import { Legend } from '@equisoft/design-elements-react';

const legendItems = [
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
        <Legend items={legendItems} />
    ));
