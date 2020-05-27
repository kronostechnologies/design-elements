import React from 'react';

import { testTheme } from '@design-elements/themes/test-theme';
import { Button } from '../buttons/button';
import { ThemeWrapper } from './theme-wrapper';

export default {
    title: 'Theme Wrapper',
    component: ThemeWrapper,
};

export const normal = () => (
    <>
        <ThemeWrapper theme={testTheme}>
            <div>
                <h3 style={{ marginTop: '0' }} >With wrapper (test theme)</h3>
                <Button label="Primary" buttonType="primary" disabled={false} />
                <Button label="Secondary" buttonType="secondary" disabled={false} />
                <Button label="Tertiary" buttonType="tertiary" disabled={false} />
            </div>
        </ThemeWrapper>
        <div>
            <h3>Without wrapper (default Equisoft theme)</h3>
            <Button label="Primary" buttonType="primary" disabled={false} />
            <Button label="Secondary" buttonType="secondary" disabled={false} />
            <Button label="Tertiary" buttonType="tertiary" disabled={false} />
        </div>
    </>
);
