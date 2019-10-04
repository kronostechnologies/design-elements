import React from 'react';

import { Button, Theme } from '@equisoft/design-elements-react';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

export default {
    title: 'Buttons',
    component: Button,
};

export const buttons = () => (
    <div>
        <Theme>
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
        </Theme>
    </div>
);
export const disabled = () => (
    <div>
        <Theme>
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
        </Theme>
    </div>
);
export const eventCallback = () => (
    <div>
        <Theme>
            <Button
                label="See Console For Callback"
                onClick={() => { console.log('The button has been clicked!'); }}
                buttonType={'primary' as ButtonType}
                disabled={false}
            />
        </Theme>
    </div>
);
