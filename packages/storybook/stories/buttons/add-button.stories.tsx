import React from 'react';

import { AddButton } from '@equisoft/design-elements-react';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

export default {
    title: 'Buttons/Add',
    component: AddButton,
};

export const addButtons = () => (
    <div>
        <AddButton
            label="Primary"
            buttonType={'primary' as ButtonType}
            disabled={false}
        />
        <AddButton
            label="Secondary"
            buttonType={'secondary' as ButtonType}
            disabled={false}
        />
        <AddButton
            label="Tertiary"
            buttonType={'tertiary' as ButtonType}
            disabled={false}
        />
    </div>
);
export const disabled = () => (
    <div>
        <AddButton
            label="Primary"
            buttonType={'primary' as ButtonType}
            disabled={true}
        />
        <AddButton
            label="Secondary"
            buttonType={'secondary' as ButtonType}
            disabled={true}
        />
        <AddButton
            label="Tertiary"
            buttonType={'tertiary' as ButtonType}
            disabled={true}
        />
    </div>
);
export const eventCallback = () => (
    <div>
        <AddButton
            label="See Console For Callback"
            buttonType={'primary' as ButtonType}
            onClick={() => { console.log('The button has been clicked!'); }}
            disabled={false}
        />
        <AddButton
            label="See Console For Callback"
            buttonType={'secondary' as ButtonType}
            onClick={() => { console.log('The button has been clicked!'); }}
            disabled={false}
        />
        <AddButton
            label="See Console For Callback"
            buttonType={'tertiary' as ButtonType}
            onClick={() => { console.log('The button has been clicked!'); }}
            disabled={false}
        />
    </div>
);
