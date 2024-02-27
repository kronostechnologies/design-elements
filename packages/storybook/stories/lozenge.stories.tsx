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

const TypeDecorator = styled.div`
    > :not(:first-child) {
        margin-left: 1rem;
    }
`;

export const Variant: Story = () => (
    <>
        <div style={{
            display: 'flex', flexDirection: 'row', marginLeft: '1rem',
        }}
        >
            <div style={{ padding: '0.5rem' }}>
                <Lozenge>default</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge variant="neutral">neutral</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge variant="success">success</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge variant="alert">alert</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge variant="warning">warning</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge variant="info">info</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge variant="discovery">discovery</Lozenge>
            </div>
        </div>
        <div style={{
            display: 'flex', flexDirection: 'row',
        }}
        >
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle>default</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle variant="neutral">neutral</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle variant="success">success</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle variant="alert">alert</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle variant="warning">warning</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle variant="info">info</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle variant="discovery">discovery</Lozenge>
            </div>
        </div>
    </>
);

Variant.decorators = [decorateWith(TypeDecorator)];

export const WithIcon: Story = () => (
    <>
        <div style={{
            display: 'flex', flexDirection: 'row', marginLeft: '1rem',
        }}
        >
            <div style={{ padding: '0.5rem' }}>
                <Lozenge icon="star" variant="neutral">neutral</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge icon="check" variant="success">success</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge icon="alertOctagon" variant="alert">alert</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge icon="alertTriangle" variant="warning">warning</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge icon="info" variant="info">info</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge icon="star" variant="discovery">discovery</Lozenge>
            </div>
        </div>
        <div style={{
            display: 'flex', flexDirection: 'row',
        }}
        >
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle icon="star" variant="neutral">neutral</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle icon="check" variant="success">success</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle icon="alertOctagon" variant="alert">alert</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle icon="alertTriangle" variant="warning">warning</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle icon="info" variant="info">info</Lozenge>
            </div>
            <div style={{ padding: '0.5rem' }}>
                <Lozenge subtle icon="star" variant="discovery">discovery</Lozenge>
            </div>
        </div>
    </>
);

WithIcon.decorators = [decorateWith(TypeDecorator)];
