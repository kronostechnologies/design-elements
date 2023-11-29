import { Carousel } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { ReactNodeArray } from 'react';
import styled from 'styled-components';

export default {
    title: 'Components/Disclosure/Carousel',
    component: Carousel,
};

const Slide = styled.div`
    align-items: center;
    display: flex;
    height: 100px;
    justify-content: center;
`;

const Header = styled.h1`
    text-align: center;
`;

function slides(): ReactNodeArray {
    return [
        <Slide key={1}>Slide 1</Slide>,
        <Slide key={2}>Slide 2</Slide>,
        <Slide key={3}>Slide 3</Slide>,
    ];
}

export const Base: Story = () => (
    <Carousel aria-label="A carousel">
        {slides()}
    </Carousel>
);

export const Loop: Story = () => (
    <Carousel aria-label="A carousel" loop>
        {slides()}
    </Carousel>
);

export const WithoutArrows: Story = () => (
    <Carousel aria-label="A carousel" withArrows={false}>
        {slides()}
    </Carousel>
);

export const WithHeader: Story = () => (
    <Carousel aria-label="A carousel" header={<Header>Header</Header>}>
        {slides()}
    </Carousel>
);

export const WithInitialSlide: Story = () => (
    <Carousel aria-label="A carousel" initialSlide={1}>
        {slides()}
    </Carousel>
);

export const WithAutomaticTransition: Story = () => (
    <Carousel aria-label="A carousel" autoTransitionDelay={1000} loop>
        {slides()}
    </Carousel>
);
