import * as React from 'react';

import { Legend, ProgressCircle, ProgressBar } from '@equisoft/design-elements-react';
import { boolean, color, number, object, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const progressBars = [
  {
    color: 'rgb(101,226,255)',
    descriptionLabel: 'You',
    endLabel: '50k - 100k$',
    percent: '100',
  },
  {
    color: 'rgb(38, 50, 56)',
    descriptionLabel: 'Equisoft',
    endLabel: '150k - 250k$',
    percent: '60',
    secondary: true,
  },
  {
    color: 'rgb(99, 114, 130)',
    descriptionLabel: 'General',
    endLabel: '150k - 250k$',
    percent: '60',
    secondary: true,
  }
];

const legendItems = [{
    name: 'You',
    description: 'Data from your answers'
  },
  {
    name: 'Equisoft Peers',
    description: 'Private Equisoft data',
    color: '#000014'
  },
  {
    name: 'General Peers',
    description: 'Publicly accessible data',
    color: '#304E63'
  }
];

const legend = storiesOf('Results/Legend', module);
legend.addDecorator(withKnobs);

const progressCircle = storiesOf('Results/ProgressCircle', module);
progressCircle.addDecorator(withKnobs);

const progressBar = storiesOf('Results/ProgressBar', module);
progressBar.addDecorator(withKnobs);


legend.add('Default', () => (
        <Legend items={object('items', legendItems)} />
    ));

progressCircle.add('ProgressCircle', () => (
        <ProgressCircle
            percent={number('percent', 66)}
            color={color('color','rgb(101,226,255)')}
            descriptionLabel={text('descriptionLabel','RRSP')}
            resultLabel={text('resultLabel', '56 k$')}
            secondary={boolean('secondary', false)}
        />
    ))
    .add('ProgressCircle Secondary', () => (
        <ProgressCircle
            percent={number('percent', 66)}
            color={color('color','#304E63')}
            descriptionLabel={text('descriptionLabel','RRSP')}
            resultLabel={text('resultLabel', '56 k$')}
            secondary={boolean('secondary', true)}
        />
    ));

progressBar.add('Default', () => (
        <ProgressBar content={object('content', progressBars)} />
    ));
    