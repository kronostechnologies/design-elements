import { ChooserCard } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Controls/Chooser Card',
    component: ChooserCard,
};

export const Normal: Story = () => (
    <>
        <ChooserCard data-testid="some-data-testid" name="story1" label="Card 1" value="card1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </ChooserCard>
        <ChooserCard name="story1" label="Card 2" value="card2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </ChooserCard>
    </>
);

export const DefaultChecked: Story = () => (
    <>
        <ChooserCard name="story2" label="Card 1" value="card1" defaultChecked>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </ChooserCard>
        <ChooserCard name="story2" label="Card 2" value="card2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </ChooserCard>
    </>
);

export const Controlled: Story = () => {
    const [value, setValue] = useState('');

    return (
        <>
            <ChooserCard
                checked={value === 'card1'}
                onChange={(event) => setValue(event.target.value)}
                name="story3"
                label="Card 1"
                value="card1"
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec commodo nulla sapien, at condimentum ipsum tristique id.
            </ChooserCard>
            <ChooserCard
                checked={value === 'card2'}
                onChange={(event) => setValue(event.target.value)}
                name="story3"
                label="Card 2"
                value="card2"
            >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec commodo nulla sapien, at condimentum ipsum tristique id.
            </ChooserCard>
        </>
    );
};
Controlled.parameters = rawCodeParameters;

export const Disabled: Story = () => (
    <ChooserCard name="story4" label="Card" value="card" disabled>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec commodo nulla sapien, at condimentum ipsum tristique id.
    </ChooserCard>
);

export const onChangeCallback: Story = () => (
    <>
        <ChooserCard
            name="story5"
            label="Card 1"
            value="card1"
            onChange={(event) => console.info(`Selected ${event.target.value}`)}
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </ChooserCard>
        <ChooserCard
            name="story5"
            label="Card 2"
            value="card2"
            onChange={(event) => console.info(`Selected ${event.target.value}`)}
        >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </ChooserCard>
    </>
);
onChangeCallback.parameters = rawCodeParameters;
