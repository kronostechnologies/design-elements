import { Button, DesignSystem, ThemeCustomization, useToast } from '@equisoft/design-elements-react';
import { VoidFunctionComponent } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Toast/Stories',
    component: useToast,
    parameters: rawCodeParameters,
};

const discoveryCustomization: ThemeCustomization = {
    component: {
        'button-primary-background-color': 'color-discovery-50',
        'button-primary-border-color': 'color-discovery-50',
        'button-primary-text-color': 'color-white',
        'button-primary-hover-background-color': 'color-discovery-70',
        'button-primary-hover-border-color': 'color-discovery-70',
        'button-primary-hover-text-color': 'color-white',
        'button-primary-focus-background-color': 'color-discovery-50',
        'button-primary-focus-border-color': 'color-discovery-50',
        'button-primary-focus-text-color': 'color-white',
    },
};

const successCustomization: ThemeCustomization = {
    component: {
        'button-primary-background-color': 'color-success-50',
        'button-primary-border-color': 'color-success-50',
        'button-primary-text-color': 'color-white',
        'button-primary-hover-background-color': 'color-success-70',
        'button-primary-hover-border-color': 'color-success-70',
        'button-primary-hover-text-color': 'color-white',
        'button-primary-focus-background-color': 'color-success-50',
        'button-primary-focus-border-color': 'color-success-50',
        'button-primary-focus-text-color': 'color-white',
    },
};

const warningCustomization: ThemeCustomization = {
    component: {
        'button-primary-background-color': 'color-warning-50',
        'button-primary-border-color': 'color-warning-50',
        'button-primary-text-color': 'color-neutral-90',
        'button-primary-hover-background-color': 'color-warning-60',
        'button-primary-hover-border-color': 'color-warning-60',
        'button-primary-hover-text-color': 'color-neutral-90',
        'button-primary-focus-background-color': 'color-warning-50',
        'button-primary-focus-border-color': 'color-warning-50',
        'button-primary-focus-text-color': 'color-neutral-90',
    },
};

export const Default: VoidFunctionComponent = () => {
    const { showToast } = useToast();
    return (
        <>
            <Button
                label="Click here!"
                buttonType="primary"
                onClick={() => showToast('success', 'This is a confirmation toast')}
            />
        </>
    );
};

export const Neutral: VoidFunctionComponent = () => {
    const { showToast } = useToast();
    return (
        <>
            <Button
                label="Neutral"
                buttonType="tertiary"
                onClick={() => showToast('neutral', 'Document currently uploading...')}
            />
        </>
    );
};

export const Discovery: VoidFunctionComponent = () => {
    const { showToast } = useToast();
    return (
        <>
            <DesignSystem theme={discoveryCustomization}>
                <Button
                    label="Discovery"
                    buttonType="primary"
                    onClick={() => showToast('discovery', 'A discovery message!')}
                />
            </DesignSystem>
        </>
    );
};

export const Confirmation: VoidFunctionComponent = () => {
    const { showToast } = useToast();
    return (
        <>
            <DesignSystem theme={successCustomization}>
                <Button
                    label="Confirmation"
                    buttonType="primary"
                    onClick={() => showToast('success', 'User profile updated')}
                />
            </DesignSystem>
        </>
    );
};

export const Warning: VoidFunctionComponent = () => {
    const { showToast } = useToast();
    return (
        <>
            <DesignSystem theme={warningCustomization}>
                <Button
                    label="Warning"
                    buttonType="primary"
                    onClick={() => showToast('warning', 'Your license is about to expire')}
                />
            </DesignSystem>
        </>
    );
};

export const Error: VoidFunctionComponent = () => {
    const { showToast } = useToast();
    return (
        <>
            <Button
                label="Error"
                buttonType="destructive"
                onClick={() => showToast('alert', 'Unable to delete user')}
            />
        </>
    );
};
