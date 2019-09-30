import { Checkbox } from '@equisoft/design-elements-react';
import * as React from 'react';

export default {
    title: 'Checkboxes',
    component: Checkbox,
};

export const Normal = () => (
    <Checkbox onChange={() => {console.log('Change event toggled'); }} />
);
export const checkedByDefault = () => (
    <Checkbox defaultChecked onChange={() => {console.log('Change event toggled'); }} />
);
export const eventCallback = () => (
    <Checkbox onChange={(_event, checked) => console.log(`Checkbox is ${checked ? 'checked' : 'unchecked'}!`)} />
);
