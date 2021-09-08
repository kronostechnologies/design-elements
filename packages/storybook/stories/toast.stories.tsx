import { Button, useToast } from '@equisoft/design-elements-react';
import React, { ReactElement } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Feedback/Toast',
    component: useToast,
    parameters: rawCodeParameters,
};

export function ShowToast(): ReactElement {
    const { showToast } = useToast();
    return (
        <>
            <Button
                label="Information"
                buttonType="primary"
                onClick={() => showToast('information', 'Lorem ipsum dolor sit amet lorem ipsum dolor sit amet')}
            />
            <Button label="Success" buttonType="secondary" onClick={() => showToast('success', 'A success message!')} />
            <Button label="Warning" buttonType="tertiary" onClick={() => showToast('warning', 'A warning message!')} />
            <Button label="Error" buttonType="destructive" onClick={() => showToast('error', 'An error message!')} />
        </>
    );
}
