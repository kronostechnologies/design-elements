import { SectionalBanner } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { MobileDecorator } from './utils/device-context-decorator';

const Container = styled.div`
    > * + * {
        margin-top: 1rem;
    }
`;

export default {
    title: 'Components/Notification/Sectional Banner',
    component: SectionalBanner,
    decorators: [decorateWith(Container)],
};

interface DismissState {
    neutral: boolean;
    info: boolean;
    discovery: boolean;
    success: boolean;
    warning: boolean;
    alert: boolean;
}

export const AllMessageTypes: Story = () => {
    const [state, setState] = useState<DismissState>({
        neutral: true,
        info: true,
        discovery: true,
        success: true,
        warning: true,
        alert: true,
    });

    function handleDismiss(type: keyof DismissState): void {
        setState({ ...state, [type]: false });
    }

    return (
        <>
            {state.neutral && (
                <SectionalBanner type="neutral" onDismiss={() => handleDismiss('neutral')}>
                    Here&apos;s a contextual notice with an icon and title.
                </SectionalBanner>
            )}

            {state.info && (
                <SectionalBanner type="info" onDismiss={() => handleDismiss('info')}>
                    Here&apos;s a contextual notice with an icon and title.
                </SectionalBanner>
            )}

            {state.discovery && (
                <SectionalBanner type="discovery" onDismiss={() => handleDismiss('discovery')}>
                    Here&apos;s a contextual notice with an icon and title.
                </SectionalBanner>
            )}

            {state.success && (
                <SectionalBanner type="success" onDismiss={() => handleDismiss('success')}>
                    Here&apos;s a contextual notice with an icon and title.
                </SectionalBanner>
            )}

            {state.warning && (
                <SectionalBanner type="warning" onDismiss={() => handleDismiss('warning')}>
                    Here&apos;s a contextual notice with an icon and title.
                </SectionalBanner>
            )}

            {state.alert && (
                <SectionalBanner type="alert" onDismiss={() => handleDismiss('alert')}>
                    Here&apos;s a contextual notice with an icon and title.
                </SectionalBanner>
            )}
        </>
    );
};

export const MobileAllMessageTypes = AllMessageTypes.bind({});
MobileAllMessageTypes.decorators = [MobileDecorator];

export const WithButton: Story = () => {
    function handleClick(type: string): void {
        console.info(`Clicked on ${type}`);
    }

    return (
        <>
            <SectionalBanner type="neutral" buttonLabel="Click me" onButtonClicked={() => handleClick('neutral')}>
                Here&apos;s a contextual notice with an icon and title.
            </SectionalBanner>
            
            <SectionalBanner type="info" buttonLabel="Click me" onButtonClicked={() => handleClick('info')}>
                Here&apos;s a contextual notice with an icon and title.
            </SectionalBanner>
            
            <SectionalBanner type="discovery" buttonLabel="Click me" onButtonClicked={() => handleClick('discovery')}>
                Here&apos;s a contextual notice with an icon and title.
            </SectionalBanner>

            <SectionalBanner type="success" buttonLabel="Click me" onButtonClicked={() => handleClick('success')}>
                Here&apos;s a contextual notice with an icon and title.
            </SectionalBanner>

            <SectionalBanner type="warning" buttonLabel="Click me" onButtonClicked={() => handleClick('warning')}>
                Here&apos;s a contextual notice with an icon and title.
            </SectionalBanner>

            <SectionalBanner type="alert" buttonLabel="Click me" onButtonClicked={() => handleClick('alert')}>
                Here&apos;s a contextual notice with an icon and title.
            </SectionalBanner>
        </>
    );
};

export const WithCustomMessage: Story = () => (
    <SectionalBanner type="alert" title="Some title">
        <p>Some sub title</p>
        <ul>
            <li>Some bullet points</li>
            <li>Some bullet points</li>
        </ul>
    </SectionalBanner>
);

export const MobileWithButton = WithButton.bind({});
MobileWithButton.decorators = [MobileDecorator];
