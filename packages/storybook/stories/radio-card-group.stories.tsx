import { RadioCardGroup, RadioCard } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Controls/Radio Card Group',
    component: RadioCardGroup,
};

export const Normal: Story = () => (
    <RadioCardGroup label="Card Group with a Label">
        <RadioCard data-testid="some-data-testid" name="story1" label="Card 1" value="card1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </RadioCard>
        <RadioCard name="story1" label="Card 2" value="card2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </RadioCard>
    </RadioCardGroup>
);

export const Horizontal: Story = () => (
    <RadioCardGroup orientation="horizontal" label="Card Group with a Label">
        <RadioCard data-testid="some-data-testid" name="horizontal" label="Card 1" value="card1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </RadioCard>
        <RadioCard name="horizontal" label="Card 2" value="card2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </RadioCard>
    </RadioCardGroup>
);

export const DefaultChecked: Story = () => (
    <RadioCardGroup>
        <RadioCard name="story2" label="Card 1" value="card1" defaultChecked>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </RadioCard>
        <RadioCard name="story2" label="Card 2" value="card2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </RadioCard>
    </RadioCardGroup>
);

export const Controlled: Story = () => {
    const [value, setValue] = useState('');

    return (
        <RadioCardGroup>
            <RadioCard
                checked={value === 'card1'}
                onChange={(event) => setValue(event.target.value)}
                name="story3"
                label="Card 1"
                value="card1"
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec commodo nulla sapien, at condimentum ipsum tristique id.
            </RadioCard>
            <RadioCard
                checked={value === 'card2'}
                onChange={(event) => setValue(event.target.value)}
                name="story3"
                label="Card 2"
                value="card2"
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec commodo nulla sapien, at condimentum ipsum tristique id.
            </RadioCard>
        </RadioCardGroup>
    );
};
Controlled.parameters = rawCodeParameters;

export const Disabled: Story = () => (
    <RadioCardGroup>
        <RadioCard name="story4" label="Card" value="card1" disabled>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </RadioCard>
        <RadioCard name="story4" label="Card" value="card2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </RadioCard>
    </RadioCardGroup>
);

export const OnChangeCallback: Story = () => (
    <RadioCardGroup>
        <RadioCard
            name="story5"
            label="Card 1"
            value="card1"
            onChange={(event) => console.info(`Selected ${event.target.value}`)}
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </RadioCard>
        <RadioCard
            name="story5"
            label="Card 2"
            value="card2"
            onChange={(event) => console.info(`Selected ${event.target.value}`)}
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </RadioCard>
    </RadioCardGroup>
);
OnChangeCallback.parameters = rawCodeParameters;
