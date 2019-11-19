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
                <h3 style={{ marginTop: '0' }} >With wrapper (test theme)</h3>
                <Button label="Primary" buttonType={'primary' as ButtonType} disabled={false} />
                <Button label="Secondary" buttonType={'secondary' as ButtonType} disabled={false} />
                <Button label="Tertiary" buttonType={'tertiary' as ButtonType} disabled={false} />
            </div>
        </ThemeWrapper>
        <div>
            <h3>Without wrapper (default Equisoft theme)</h3>
            <Button label="Primary" buttonType={'primary' as ButtonType} disabled={false} />
            <Button label="Secondary" buttonType={'secondary' as ButtonType} disabled={false} />
            <Button label="Tertiary" buttonType={'tertiary' as ButtonType} disabled={false} />
        </div>
    </>
);
