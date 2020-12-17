import { ToggleSwitch } from '@equisoft/design-elements-react';
import React, { useState } from 'react';

export default {
    title: 'Toggle Switch',
    component: ToggleSwitch,
};

export const Normal = () => {
    const [toggled, setToggled] = useState(false);

    return (
        <ToggleSwitch label="Switch" toggled={toggled} onToggle={(value: boolean) => setToggled(value)} />
    );
};

export const Toggled = () => {
    const [toggled, setToggled] = useState(true);

    return (
        <ToggleSwitch label="Switch" toggled={toggled} onToggle={(value: boolean) => setToggled(value)} />
    );
};

export const Disabled = () => (
    <>
        <ToggleSwitch label="Switch" disabled toggled={false} onToggle={() => console.log('Should not be called!')} />
        <br />
        <ToggleSwitch label="Switch" disabled toggled onToggle={() => console.log('Should not be called!')} />
    </>
);
