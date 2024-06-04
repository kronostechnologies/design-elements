import { Button, ToastType, useToast } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
    title: 'Components/Toast',
    parameters: {
        controls: {
            disable: true,
        },
    },
};

export default meta;

function createStory(toastType: ToastType, toastMessage: string): StoryObj {
    const label = `Show ${toastType === 'success' ? 'confirmation' : toastType} toast`;

    return {
        render: () => {
            const { showToast } = useToast();
            return (
                <Button
                    label={label}
                    buttonType="primary"
                    onClick={() => showToast(toastType, toastMessage)}
                />
            );
        },
        parameters: {
            docs: {
                source: {
                    // In order to show only the relevant code in the story, the `dynamic` source type is
                    // used. However, the code shown in the `onClick` prop gets truncated so the complete
                    // source has to be provided here as an override.
                    code: `
const { showToast } = useToast();
return (
    <Button
        label="${label}"
        buttonType="primary"
        onClick={() => showToast('${toastType}', '${toastMessage}')}
    />
);
                    `,
                },
            },
        },
    };
}

export const Neutral = createStory('neutral', 'Document currently uploading...');

export const Success = createStory('success', 'User profile updated');

export const Warning = createStory('warning', 'Your license is about to expire');

export const Alert = createStory('alert', 'Unable to delete user');

export const Discovery = createStory('discovery', 'A discovery message!');
