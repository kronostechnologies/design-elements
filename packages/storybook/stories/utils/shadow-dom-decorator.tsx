import { ThemeWrapper } from '@equisoft/design-elements-react';
import React, { ComponentType } from 'react';
import { Decorator } from './decorator';

export const ShadowDomDecorator: Decorator = (Story: ComponentType) => (
    <ThemeWrapper isolateStyles><Story /></ThemeWrapper>
);
