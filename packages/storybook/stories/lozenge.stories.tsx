import { Lozenge } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Components/Lozenge/Stories',
    component: Lozenge,
};

export const Default: Story = () => (
    <Lozenge>This is to highlight some text</Lozenge>
);

export const Mobile: Story = () => (
    <Lozenge>This is to highlight some text</Lozenge>
);
Mobile.decorators = [MobileDecorator];

const VariantsContainer = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1rem;
`;

export const Neutral: Story = () => (
    <>
        <VariantsContainer>
            <Lozenge variant="neutral">neutral</Lozenge>
            <Lozenge subtle variant="neutral">neutral</Lozenge>
            <Lozenge icon="star" variant="neutral">neutral</Lozenge>
            <Lozenge subtle icon="star" variant="neutral">neutral</Lozenge>
        </VariantsContainer>
    </>
);

export const Success: Story = () => (
    <>
        <VariantsContainer>
            <Lozenge variant="success">success</Lozenge>
            <Lozenge subtle variant="success">success</Lozenge>
            <Lozenge icon="check" variant="success">success</Lozenge>
            <Lozenge subtle icon="check" variant="success">success</Lozenge>
        </VariantsContainer>
    </>
);

export const Alert: Story = () => (
    <>
        <VariantsContainer>
            <Lozenge variant="alert">alert</Lozenge>
            <Lozenge subtle variant="alert">alert</Lozenge>
            <Lozenge icon="alertOctagon" variant="alert">alert</Lozenge>
            <Lozenge subtle icon="alertOctagon" variant="alert">alert</Lozenge>
        </VariantsContainer>
    </>
);

export const Warning: Story = () => (
    <>
        <VariantsContainer>
            <Lozenge variant="warning">warning</Lozenge>
            <Lozenge subtle variant="warning">warning</Lozenge>
            <Lozenge icon="alertTriangle" variant="warning">warning</Lozenge>
            <Lozenge subtle icon="alertTriangle" variant="warning">warning</Lozenge>
        </VariantsContainer>
    </>
);

export const Informative: Story = () => (
    <>
        <VariantsContainer>
            <Lozenge variant="info">info</Lozenge>
            <Lozenge subtle variant="info">info</Lozenge>
            <Lozenge icon="info" variant="info">info</Lozenge>
            <Lozenge subtle icon="info" variant="info">info</Lozenge>
        </VariantsContainer>
    </>
);

export const Discovery: Story = () => (
    <>
        <VariantsContainer>
            <Lozenge variant="discovery">discovery</Lozenge>
            <Lozenge subtle variant="discovery">discovery</Lozenge>
            <Lozenge icon="star" variant="discovery">discovery</Lozenge>
            <Lozenge subtle icon="star" variant="discovery">discovery</Lozenge>
        </VariantsContainer>
    </>
);
