import { Carousel } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { ReactNodeArray } from 'react';
import styled from 'styled-components';

export default {
    title: 'Components/Carousel',
    component: Carousel,
};

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

export const Default: Story = () => (
    <Carousel aria-label="A carousel">
        {slides()}
    </Carousel>
);
