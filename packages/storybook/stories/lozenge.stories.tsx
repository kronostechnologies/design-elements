import { Lozenge } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Structure/Lozenge',
    component: Lozenge,
};

export const Normal: Story = () => (
    <Lozenge>This is to highlight some text</Lozenge>
);

export const Mobile: Story = () => (
    <Lozenge>This is to highlight some text</Lozenge>
);
Mobile.decorators = [MobileDecorator];

const TypeDecorator = styled.div`
    > :not(:first-child) {
        margin-left: 1rem;
    }
`;

export const Type: Story = () => (
    <>
        <Lozenge>default no type</Lozenge>
        <Lozenge type='default'>default</Lozenge>
        <Lozenge type='success'>success</Lozenge>
        <Lozenge type='alert'>alert</Lozenge>
        <Lozenge type='warning'>warning</Lozenge>
        <Lozenge type='info'>info</Lozenge>
        <Lozenge type='disabled'>disabled</Lozenge>
    </>
);

Type.decorators = [decorateWith(TypeDecorator)];

export const WithIcon: Story = () => (
    <Lozenge icon="eye">With icon</Lozenge>
);
