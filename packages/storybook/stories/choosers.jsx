import React from 'react';
import { storiesOf } from '@storybook/react';
import Chooser from '@equisoft/design-elements-react';

const maritalStatus = [
    {value: "single", label: "Célibataire, vivant seul ou en colocation"},
    {value: "married", label: "Marié ou vivant avec  un conjoint"}
];

const ageRange = [
    {value: "0,24", label: "0 à 24 ans"},
    {value: "25,34", label: "25 à 34 ans"},
    {value: "35,49", label: "35 à 49 ans"},
    {value: "50,64", label: "50 à 64 ans"},
    {value: "65,Infinity", label: "65+"},
];

storiesOf('Choosers', module)
    .add('Chooser with a skip button', () => (
        <Chooser groupName="maritalStatus" options={maritalStatus} skippable />
    ))
    .add('Chooser in Columns', () => (
        <Chooser groupName="ageRange" options={ageRange} inColumns />
    ));
