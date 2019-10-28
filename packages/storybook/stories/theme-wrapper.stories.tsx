import React from 'react';

import { Button, testTheme, ThemeWrapper } from '@equisoft/design-elements-react';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

export default {
    title: 'Theme Wrapper',
    component: ThemeWrapper,
};

export const normal = () => (
    <>
        <ThemeWrapper theme={testTheme}>
            <div>
                <Button label="Primary" buttonType={'primary' as ButtonType} disabled={false} />
                <Button label="Secondary" buttonType={'secondary' as ButtonType} disabled={false} />
                <Button label="Tertiary" buttonType={'tertiary' as ButtonType} disabled={false} />
            </div>
        </ThemeWrapper>
        <div>
            <Button label="Primary" buttonType={'primary' as ButtonType} disabled={false} />
            <Button label="Secondary" buttonType={'secondary' as ButtonType} disabled={false} />
            <Button label="Tertiary" buttonType={'tertiary' as ButtonType} disabled={false} />
        </div>
    </>
);

export const withWrapper = () => (
    <ThemeWrapper theme={testTheme}>
        <div>
            <Button label="Primary" buttonType={'primary' as ButtonType} disabled={false} />
            <Button label="Secondary" buttonType={'secondary' as ButtonType} disabled={false} />
            <Button label="Tertiary" buttonType={'tertiary' as ButtonType} disabled={false} />
        </div>
    </ThemeWrapper>
);

export const withoutWrapper = () => (
    <div>
        <Button label="Primary" buttonType={'primary' as ButtonType} disabled={false} />
        <Button label="Secondary" buttonType={'secondary' as ButtonType} disabled={false} />
        <Button label="Tertiary" buttonType={'tertiary' as ButtonType} disabled={false} />
    </div>
);
