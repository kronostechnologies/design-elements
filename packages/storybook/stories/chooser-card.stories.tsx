import { ChooserCard } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';

const FlexContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
`;

export default {
    title: 'Chooser Card',
    component: ChooserCard,
};

export const Normal: Story = () => (
    <FlexContainer>
        <ChooserCard name="story1" label="Card 1" value="card1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </ChooserCard>
        <ChooserCard name="story1" label="Card 2" value="card2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </ChooserCard>
    </FlexContainer>
);

export const DefaultChecked: Story = () => (
    <FlexContainer>
        <ChooserCard name="story2" label="Card 1" value="card1" defaultChecked>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </ChooserCard>
        <ChooserCard name="story2" label="Card 2" value="card2">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec commodo nulla sapien, at condimentum ipsum tristique id.
        </ChooserCard>
    </FlexContainer>
);

export const Controlled: Story = () => {
    const [value, setValue] = useState('');

    return (
        <FlexContainer>
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
        </FlexContainer>
    );
};

export const Disabled: Story = () => (
    <ChooserCard name="story4" label="Card" value="card" disabled>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Donec commodo nulla sapien, at condimentum ipsum tristique id.
    </ChooserCard>

);

export const onChangeCallback: Story = () => (
    <FlexContainer>
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
    </FlexContainer>
);
