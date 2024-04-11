import { ToggleSwitch } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Toggle Switch',
    component: ToggleSwitch,
    parameters: rawCodeParameters,
};

export const Default: Story = () => {
    const [toggled, setToggled] = useState(false);

    return (
        <ToggleSwitch data-testid='some-data-testid' label="Show children organizations" toggled={toggled} onToggle={setToggled} />
    );
};
