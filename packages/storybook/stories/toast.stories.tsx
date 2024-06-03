import { Button, useToast } from '@equisoft/design-elements-react';
import { VoidFunctionComponent } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Toast',
    component: useToast,
    parameters: rawCodeParameters,
    tags: ['autodocs'],
};

export const ShowToast: VoidFunctionComponent = () => {
    const { showToast } = useToast();
    return (
        <>
            <Button
                label="Neutral"
                buttonType="tertiary"
                onClick={() => showToast('neutral', 'Document currently uploading...')}
            />
            <Button
                label="Discovery"
                buttonType="primary"
                onClick={() => showToast('discovery', 'A discovery message!')}
            />
            <Button
                label="Success"
                buttonType="primary"
                onClick={() => showToast('success', 'User profile updated')}
            />
            <Button
                label="Warning"
                buttonType="primary"
                onClick={() => showToast('warning', 'Your license is about to expire')}
            />
            <Button
                label="Alert"
                buttonType="destructive-primary"
                onClick={() => showToast('alert', 'Unable to delete user')}
            />
        </>
    );
};
