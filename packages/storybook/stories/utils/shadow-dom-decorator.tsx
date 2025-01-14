import { ComponentType } from 'react';
import { DesignSystem } from '@equisoft/design-elements-react';
import { Decorator } from './decorator';

export const ShadowDomDecorator: Decorator = (Story: ComponentType) => (
    <DesignSystem isolateStyles>
        <Story />
    </DesignSystem>
);
