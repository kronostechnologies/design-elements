import { ToggleSwitch} from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Toggle Switch',
    component: ToggleSwitch,
};

export const normal = () => (
    <>
        <ToggleSwitch label="Switch" />
    </>
);

export const toggled = () => (
    <>
        <ToggleSwitch label="Switch" toggled />
    </>
);

export const disabled = () => (
    <>
        <ToggleSwitch label="Switch" disabled />
        <br />
        <ToggleSwitch label="Switch" disabled toggled/>
    </>
);

export const withCallback = () => (
    <ToggleSwitch label="Switch" onToggle={(value: boolean) => console.log(`Toggled : ${value}`)} />
);
