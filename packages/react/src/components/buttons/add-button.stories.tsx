import React from 'react';
import { AddButton } from './add-button';

export default {
    title: 'Buttons/Add',
    component: AddButton,
};

export const addButtons = () => (
    <>
        <AddButton
            label="Primary"
            buttonType="primary"
            disabled={false}
        />
        <AddButton
            label="Secondary"
            buttonType="secondary"
            disabled={false}
        />
        <AddButton
            label="Tertiary"
            buttonType="tertiary"
            disabled={false}
        />
    </>
);
export const disabled = () => (
    <>
        <AddButton
            label="Primary"
            buttonType="primary"
            disabled={true}
        />
        <AddButton
            label="Secondary"
            buttonType="secondary"
            disabled={true}
        />
        <AddButton
            label="Tertiary"
            buttonType="tertiary"
            disabled={true}
        />
    </>
);
export const eventCallback = () => (
    <AddButton
        label="See Console For Callback"
        buttonType="primary"
        onClick={() => { console.log('The button has been clicked!'); }}
        disabled={false}
    />
);
