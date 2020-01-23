import { Carousel } from '@equisoft/design-elements-react';
import React, { ReactNodeArray } from 'react';
import styled from 'styled-components';

export default {
    title: 'Carousel',
    component: Carousel,
};

function slides(): ReactNodeArray {
    return [
        <Slide key={1}>Slide 1</Slide>,
        <Slide key={2}>Slide 2</Slide>,
        <Slide key={3}>Slide 3</Slide>,
    ];
}

export const base = () => (
    <Carousel aria-label="A carousel">
        {slides()}
    </Carousel>
);

export const loop = () => (
    <Carousel aria-label="A carousel" loop>
        {slides()}
    </Carousel>
);

export const withoutArrows = () => (
    <Carousel aria-label="A carousel" withArrows={false}>
        {slides()}
    </Carousel>
);

export const withHeader = () => (
    <Carousel aria-label="A carousel" header={<Header>Header</Header>}>
        {slides()}
    </Carousel>
);

export const withInitialSlide = () => (
    <Carousel aria-label="A carousel" initialSlide={1}>
        {slides()}
    </Carousel>
);

export const withAutomaticTransition = () => (
    <Carousel aria-label="A carousel" autoTransitionDelay={1000} loop={true}>
        {slides()}
    </Carousel>
);

const Slide = styled.div`
    align-items: center;
    display: flex;
    height: 100px;
    justify-content: center;
`;

const Header = styled.h1`
  text-align: center;
`;
