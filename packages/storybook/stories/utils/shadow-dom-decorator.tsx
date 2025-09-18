import { DesignSystem } from '@equisoft/design-elements-react';
import { ComponentType } from 'react';
import { Decorator } from './decorator';

export const ShadowDomDecorator: Decorator = (Story: ComponentType) => (
    <DesignSystem isolateStyles><Story /></DesignSystem>
);
