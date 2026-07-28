import { generateComponentClasses } from '../../utils/component-classes';

const COMPONENT_NAME = 'PromotionalBanner';

export interface PromotionalBannerClasses {
    button: string;
}

export type PromotionalBannerClassKeys = keyof PromotionalBannerClasses;

export const promotionalBannerClasses: PromotionalBannerClasses = generateComponentClasses(
    COMPONENT_NAME,
    [
        'button',
    ],
);
