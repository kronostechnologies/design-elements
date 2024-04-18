import {
    Button,
    DesignSystem,
    ThemeCustomization,
    useToast,
    buildTheme,
} from '@equisoft/design-elements-react';
import { VoidFunctionComponent } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Toast',
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
    },
};

const discoveryTheme = buildTheme(discoveryCustomization);

const successCustomization: ThemeCustomization = {
    component: {
        'button-primary-background-color': 'color-success-50',
        'button-primary-border-color': 'color-success-50',
        'button-primary-text-color': 'color-white',
        'button-primary-hover-background-color': 'color-success-70',
        'button-primary-hover-border-color': 'color-success-70',
        'button-primary-hover-text-color': 'color-white',
    },
};

const successTheme = buildTheme(successCustomization);

const warningCustomization: ThemeCustomization = {
    component: {
        'button-primary-background-color': 'color-warning-50',
        'button-primary-border-color': 'color-warning-50',
        'button-primary-text-color': 'color-neutral-90',
        'button-primary-hover-background-color': 'color-warning-60',
        'button-primary-hover-border-color': 'color-warning-60',
        'button-primary-hover-text-color': 'color-neutral-90',
    },
};

const warningTheme = buildTheme(warningCustomization);

export const ShowToast: VoidFunctionComponent = () => {
    const { showToast } = useToast();
    return (
        <>
            <Button
                label="Neutral"
                buttonType="tertiary"
                onClick={() => showToast('neutral', 'Document currently uploading...')}
            />
            <DesignSystem theme={discoveryTheme}>
                <Button
                    label="Discovery"
                    buttonType="primary"
                    onClick={() => showToast('discovery', 'A discovery message!')}
                />
            </DesignSystem>
            <DesignSystem theme={successTheme}>
                <Button
                    label="Success"
                    buttonType="primary"
                    onClick={() => showToast('success', 'User profile updated')}
                />
            </DesignSystem>
            <DesignSystem theme={warningTheme}>
                <Button
                    label="Warning"
                    buttonType="primary"
                    onClick={() => showToast('warning', 'Your license is about to expire')}
                />
            </DesignSystem>
            <Button
                label="Alert"
                buttonType="destructive-primary"
                onClick={() => showToast('alert', 'Unable to delete user')}
            />
        </>
    );
};
