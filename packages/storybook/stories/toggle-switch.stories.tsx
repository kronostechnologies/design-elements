import { ToggleSwitch } from '@equisoft/design-elements-react';
import React, { useState } from 'react';
import { Story } from '@storybook/react';

export default {
    title: 'Controls/Toggle Switch',
    component: ToggleSwitch,
};

export const Normal: Story = () => {
    const [toggled, setToggled] = useState(false);

    return (
        <ToggleSwitch label="Switch" toggled={toggled} onToggle={setToggled} />
    );
};

export const Toggled: Story = () => {
    const [toggled, setToggled] = useState(true);

    return (
        <ToggleSwitch label="Switch" toggled={toggled} onToggle={setToggled} />
    );
};

export const Disabled: Story = () => (
    <>
        <ToggleSwitch label="Switch" disabled toggled={false} onToggle={() => console.info('Should not be called!')} />
        <br />
        <ToggleSwitch label="Switch" disabled toggled onToggle={() => console.info('Should not be called!')} />
    </>
);
