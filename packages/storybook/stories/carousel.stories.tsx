import { Carousel } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNodeArray } from 'react';
import styled from 'styled-components';

const Header = styled.h1`
    text-align: center;
`;

const Slide = styled.div`
    align-items: center;
    display: flex;
    height: 100px;
    justify-content: center;
`;

function slides(): ReactNodeArray {
    return [
        <Slide key={1}>Slide 1</Slide>,
        <Slide key={2}>Slide 2</Slide>,
        <Slide key={3}>Slide 3</Slide>,
    ];
}

const CarouselMeta: Meta<typeof Carousel> = {
    title: 'Components/Carousel',
    component: Carousel,
    argTypes: {
        children: {
            control: { disable: true },
        },
        header: {
            control: { disable: true },
        },
    },
    render: (args) => (
        <Carousel
            {...args /* eslint-disable-line react/jsx-props-no-spreading */}
            aria-label="A carousel"
        >
            {slides()}
        </Carousel>
    ),
};

export default CarouselMeta;
type Story = StoryObj<typeof Carousel>;

export const Default: Story = {
    ...CarouselMeta,
};

export const Loop: Story = {
    args: {
        loop: true,
        autoTransitionDelay: 0,
    },
    ...CarouselMeta,
};

export const WithAutomaticTransition: Story = {
    args: {
        loop: true,
        autoTransitionDelay: 1000,
    },
    ...CarouselMeta,
};

export const WithoutArrows: Story = {
    args: {
        withArrows: false,
    },
    ...CarouselMeta,
};

export const WithHeader: Story = {
    args: {
        header: <Header>Header</Header>,
    },
    ...CarouselMeta,
};

export const WithInitialSlide: Story = {
    args: {
        initialSlide: 1,
    },
    ...CarouselMeta,
};
