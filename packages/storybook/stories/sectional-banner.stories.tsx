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
    title: 'Components/Sectional Banner',
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

export const Neutral: Story = () => {
    const [dismissed, setDismissed] = useState<boolean>(false);

    return !dismissed ? (
        <SectionalBanner type="neutral" onDismiss={() => setDismissed(true)}>
            Here&apos;s a contextual notice with an icon and title.
        </SectionalBanner>
    ) : (
        <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
    );
};

export const Informative: Story = () => {
    const [dismissed, setDismissed] = useState<boolean>(false);

    return !dismissed ? (
        <SectionalBanner type="info" onDismiss={() => setDismissed(true)}>
            Here&apos;s a contextual notice with an icon and title.
        </SectionalBanner>
    ) : (
        <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
    );
};

export const Success: Story = () => {
    const [dismissed, setDismissed] = useState<boolean>(false);

    return !dismissed ? (
        <SectionalBanner type="success" onDismiss={() => setDismissed(true)}>
            Here&apos;s a contextual notice with an icon and title.
        </SectionalBanner>
    ) : (
        <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
    );
};

export const Warning: Story = () => {
    const [dismissed, setDismissed] = useState<boolean>(false);

    return !dismissed ? (
        <SectionalBanner type="warning" onDismiss={() => setDismissed(true)}>
            Here&apos;s a contextual notice with an icon and title.
        </SectionalBanner>
    ) : (
        <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
    );
};

export const Alert: Story = () => {
    const [dismissed, setDismissed] = useState<boolean>(false);

    return !dismissed ? (
        <SectionalBanner type="alert" onDismiss={() => setDismissed(true)}>
            Here&apos;s a contextual notice with an icon and title.
                <p>Some sub title</p>
                        <ul>
                            <li>Some bullet points</li>
                            <li>Some bullet points</li>
                        </ul>
        </SectionalBanner>
    ) : (
        <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
    );
};

export const Discovery: Story = () => {
    const [dismissed, setDismissed] = useState<boolean>(false);

    return !dismissed ? (
        <SectionalBanner type="discovery" onDismiss={() => setDismissed(true)}>
            Here&apos;s a contextual notice with an icon and title.
        </SectionalBanner>
    ) : (
        <Button buttonType="primary" onClick={() => setDismissed(false)}>Show banner</Button>
    );
};
