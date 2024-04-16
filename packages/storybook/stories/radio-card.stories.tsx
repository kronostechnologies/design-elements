import { RadioCardGroup, RadioCard } from '@equisoft/design-elements-react';
import { Meta, StoryFn, StoryObj } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

const meta: Meta<typeof RadioCardGroup> = {
    title: 'Components/Radio Card',
    component: RadioCardGroup,
};

export default meta;

type Story = StoryObj<typeof RadioCardGroup>;

export const Horizontal: Story = {
    args: {
        orientation: 'horizontal',
        label: 'Select card',
    },
    render: (args) => (
        <RadioCardGroup {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            <RadioCard data-testid="some-data-testid" name="horizontal" label="Card 1" value="card1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec commodo nulla sapien, at condimentum ipsum tristique id.
            </RadioCard>
            <RadioCard name="horizontal" label="Card 2" value="card2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec commodo nulla sapien, at condimentum ipsum tristique id.
            </RadioCard>
        </RadioCardGroup>
    ),
};

export const Vertical: Story = {
    args: {
        orientation: 'vertical',
        label: 'Select card',
    },
    render: (args) => (
        <RadioCardGroup {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            <RadioCard data-testid="some-data-testid" name="vertical" label="Card 1" value="card1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec commodo nulla sapien, at condimentum ipsum tristique id.
            </RadioCard>
            <RadioCard name="vertical" label="Card 2" value="card2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec commodo nulla sapien, at condimentum ipsum tristique id.
            </RadioCard>
        </RadioCardGroup>
    ),
};

export const DefaultChecked: Story = {
    render: (args) => (
        <RadioCardGroup {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            <RadioCard name="story-default" label="Card 1" value="card1" defaultChecked>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec commodo nulla sapien, at condimentum ipsum tristique id.
            </RadioCard>
            <RadioCard name="story-default" label="Card 2" value="card2">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Donec commodo nulla sapien, at condimentum ipsum tristique id.
            </RadioCard>
        </RadioCardGroup>
    ),
};

export const OnChangeCallback: StoryFn = () => (
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
