import React from 'react';

import { Button } from '@equisoft/design-elements-react';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

export default {
    title: 'Buttons',
    component: Button,
};

export const buttons = () => (
    <div>
        <Button
            label="Primary"
            buttonType={'primary' as ButtonType}
            disabled={false}
        />
        <Button
            label="Secondary"
            buttonType={'secondary' as ButtonType}
            disabled={false}
        />
        <Button
            label="Tertiary"
            buttonType={'tertiary' as ButtonType}
            disabled={false}
        />
    </div>
);
export const disabled = () => (
    <div>
        <Button
            label="Primary"
            buttonType={'primary' as ButtonType}
            disabled={true}
        />
        <Button
            label="Secondary"
            buttonType={'secondary' as ButtonType}
            disabled={true}
        />
        <Button
            label="Tertiary"
            buttonType={'tertiary' as ButtonType}
            disabled={true}
        />
    </div>
);
export const eventCallback = () => (
    <div>
        <Button
            label="See Console For Callback"
            onClick={() => { console.log('The button has been clicked!'); }}
            buttonType={'primary' as ButtonType}
            disabled={false}
        />
    </div>
);
