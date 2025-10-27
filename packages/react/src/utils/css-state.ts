import { css, FlattenSimpleInterpolation } from 'styled-components';
import { ResolvedTheme } from '../themes';
import { DS_CLASS_PREFIX } from './component-classes';

type FocusType = 'focus' | 'focus-visible' | 'focus-within';

export interface FocusOptions {
    selector?: string;
    focusType?: FocusType;
    focusTypeClass?: boolean;
    inverted?: boolean;
    insideOnly?: boolean;
}

function generateFocusClass(focusType: FocusType): string {
    return `${DS_CLASS_PREFIX}util-${focusType}`;
}

const focusVisibleClass = generateFocusClass('focus-visible');

export function addFocusVisibleActive(element: HTMLElement | null): void {
    if (element) {
        element?.classList?.add(focusVisibleClass);
    }
}

export function removeFocusVisibleActive(element: HTMLElement | null): void {
    if (element) {
        element?.classList.remove(focusVisibleClass);
    }
}

export const focus = (
    { theme }: { theme: ResolvedTheme },
    options: FocusOptions = {},
): FlattenSimpleInterpolation => {
    const {
        focusTypeClass = false,
        selector,
        focusType = 'focus-visible',
        inverted = false,
        insideOnly = false,
    } = options;

    const inversionSuffix = inverted ? '-inverted' : '';
    const insideFocusBorderColor = insideOnly ? theme.component[`focus${inversionSuffix}-outside-border-color`] : theme.component[`focus${inversionSuffix}-inside-border-color`];
    const outsideFocusBorderColor = insideOnly ? 'transparent' : theme.component[`focus${inversionSuffix}-outside-border-color`];
    const insideFocusBorderWeight = '2px';
    const insideFocusBorderOffset = '-2px';
    const outsideFocusBorderWeight = insideOnly ? '0' : '2px';
    const baseSelector = selector ?? '';

    return css`
        ${focusTypeClass ? `&.${generateFocusClass(focusType)} ${baseSelector},` : ''}
        &:${focusType} ${baseSelector} {
            box-shadow: 0 0 0 ${outsideFocusBorderWeight} ${outsideFocusBorderColor};
            outline: ${insideFocusBorderWeight} solid ${insideFocusBorderColor};
            outline-offset: ${insideFocusBorderOffset};
        }`;
};
