import { DesignSystem } from '@equisoft/design-elements-react';
import { ComponentType } from 'react';
import { decorateWith, Decorator } from './decorator';

export const DeviceContextDecorator: Decorator = decorateWith(DesignSystem);

export const DesktopDecorator: Decorator = (Story: ComponentType) => (
    <DesignSystem staticDevice="desktop"><Story /></DesignSystem>
);
export const MobileDecorator: Decorator = (Story: ComponentType) => (
    <DesignSystem staticDevice="mobile"><Story /></DesignSystem>
);
