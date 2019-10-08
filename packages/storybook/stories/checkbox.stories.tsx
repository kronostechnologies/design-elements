import { Checkbox } from '@equisoft/design-elements-react';
import * as React from 'react';

export default {
    title: 'Checkboxes',
    component: Checkbox,
};

const Checkboxes = [
    { label: 'Boat', name: 'vehicule1', value: 'boat' },
    { label: 'Plane', name: 'vehicule2', value: 'plane', defaultChecked: true },
    { label: 'Car', name: 'vehicule3', value: 'car', disabled: true },
    { label: 'Bike', name: 'vehicule4', value: 'bike' },
];

export const normal = () => (
    <Checkbox label="Vehicule" checkboxes={Checkboxes} />
);

export const disabled = () => (
    <Checkbox label="" checkboxes={[{ label: 'Car', name: 'vehicule', value: 'car', disabled: true }]} />
);

export const defaultChecked = () => (
    <Checkbox label="" checkboxes={[{ label: 'Plane', name: 'vehicule', value: 'plane', defaultChecked: true }]} />
);

export const callback = () => (
    <Checkbox
        label=""
        onChange={(event) => console.log(`Checkbox is ${event.target.checked ? 'checked' : 'unchecked'}!`)}
        checkboxes={[{ label: 'Bike', name: 'vehicule', value: 'bike' }]}
    />
);
