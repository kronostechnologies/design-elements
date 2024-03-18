import { Lozenge } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Components/Structure/Lozenge',
    component: Lozenge,
};

export const Normal: Story = () => (
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

export const Variant: Story = () => (
    <>
        <VariantsContainer>
            <Lozenge>default</Lozenge>
            <Lozenge variant="neutral">neutral</Lozenge>
            <Lozenge variant="success">success</Lozenge>
            <Lozenge variant="alert">alert</Lozenge>
            <Lozenge variant="warning">warning</Lozenge>
            <Lozenge variant="info">info</Lozenge>
            <Lozenge variant="discovery">discovery</Lozenge>
        </VariantsContainer>

        <VariantsContainer>
            <Lozenge subtle>default</Lozenge>
            <Lozenge subtle variant="neutral">neutral</Lozenge>
            <Lozenge subtle variant="success">success</Lozenge>
            <Lozenge subtle variant="alert">alert</Lozenge>
            <Lozenge subtle variant="warning">warning</Lozenge>
            <Lozenge subtle variant="info">info</Lozenge>
            <Lozenge subtle variant="discovery">discovery</Lozenge>
        </VariantsContainer>
    </>
);

Variant.decorators = [decorateWith(VariantsContainer)];

export const WithIcon: Story = () => (
    <>
        <VariantsContainer>
            <Lozenge icon="star" variant="neutral">neutral</Lozenge>
            <Lozenge icon="check" variant="success">success</Lozenge>
            <Lozenge icon="alertOctagon" variant="alert">alert</Lozenge>
            <Lozenge icon="alertTriangle" variant="warning">warning</Lozenge>
            <Lozenge icon="info" variant="info">info</Lozenge>
            <Lozenge icon="star" variant="discovery">discovery</Lozenge>
        </VariantsContainer>

        <VariantsContainer>
            <Lozenge subtle icon="star" variant="neutral">neutral</Lozenge>
            <Lozenge subtle icon="check" variant="success">success</Lozenge>
            <Lozenge subtle icon="alertOctagon" variant="alert">alert</Lozenge>
            <Lozenge subtle icon="alertTriangle" variant="warning">warning</Lozenge>
            <Lozenge subtle icon="info" variant="info">info</Lozenge>
            <Lozenge subtle icon="star" variant="discovery">discovery</Lozenge>
        </VariantsContainer>
    </>
);

WithIcon.decorators = [decorateWith(VariantsContainer)];
