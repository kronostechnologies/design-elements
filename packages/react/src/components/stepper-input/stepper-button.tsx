import { type FC, type KeyboardEvent, type MouseEvent } from 'react';
import styled, { css, type FlattenInterpolation, type ThemeProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { type ResolvedTheme } from '../../themes';
import { focus } from '../../utils/css-state';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon';
import {
    stepperSegmentLeadingCornerStyles,
    stepperSegmentLeadingEdgeStyles,
    stepperSegmentSurfaceStyles,
    stepperSegmentTrailingCornerStyles,
    stepperSegmentTrailingDividerStyles,
} from './stepper-segment-styles';

export type StepperButtonType = 'decrement' | 'increment';

export type StepperButtonFrameEdge = 'leading' | 'trailing';

interface StyledStepperButtonProps {
    $frameEdge?: StepperButtonFrameEdge;
    $isMobile: boolean;
    $type: StepperButtonType;
}

const buttonStyles = css<StyledStepperButtonProps>`
    align-items: center;
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['stepper-button-text-color']};
    cursor: pointer;
    display: flex;
    flex-shrink: 0;
    height: ${({ $isMobile }) => ($isMobile ? '3rem' : 'var(--size-2x)')};
    justify-content: center;
    padding: ${({ $isMobile }) => ($isMobile ? 'var(--spacing-1halfx)' : 'var(--spacing-1x)')};
    width: ${({ $isMobile }) => ($isMobile ? '3rem' : 'var(--size-2x)')};

    &:hover:not(:disabled) {
        background: ${({ theme }) => theme.component['stepper-button-hover-background-color']};
    }

    &:disabled {
        background: ${({ theme }) => theme.component['stepper-button-disabled-background-color']};
        color: ${({ theme }) => theme.component['stepper-button-disabled-text-color']};
        cursor: not-allowed;
    }

    ${focus};
    &:focus-visible {
        z-index: 3;
    }

    > svg {
        color: inherit;
        height: ${({ $isMobile }) => ($isMobile ? '1.25rem' : 'var(--size-1x)')};
        width: ${({ $isMobile }) => ($isMobile ? '1.25rem' : 'var(--size-1x)')};
    }
`;

const frameEdgeStyles = css<StyledStepperButtonProps>`
    ${({ $frameEdge }) => $frameEdge && css`
        ${stepperSegmentSurfaceStyles};
        position: relative;
    `};

    ${({ $frameEdge }) => $frameEdge === 'leading' && css`
        ${stepperSegmentLeadingEdgeStyles};
        ${stepperSegmentLeadingCornerStyles};
        z-index: 3;
    `};

    ${({ $frameEdge }) => $frameEdge === 'trailing' && css`
        ${stepperSegmentTrailingDividerStyles};
        ${stepperSegmentTrailingCornerStyles};
        z-index: 1;
    `};

    &:disabled {
        ${({ $frameEdge, theme }) => $frameEdge && css`
            border-color: ${theme.component['stepper-button-disabled-border-color']};
        `};
    }
`;

function getDefaultSegmentStyles(type: StepperButtonType): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    if (type === 'decrement') {
        return css`
            ${stepperSegmentSurfaceStyles};
            ${stepperSegmentLeadingEdgeStyles};
            ${stepperSegmentTrailingDividerStyles};
            ${stepperSegmentLeadingCornerStyles};
            z-index: 1;
        `;
    }

    return css`
        ${stepperSegmentSurfaceStyles};
        ${stepperSegmentTrailingDividerStyles};
        ${stepperSegmentTrailingCornerStyles};
        z-index: 1;
    `;
}

const segmentLayoutStyles = css<StyledStepperButtonProps>`
    ${({ $type, $frameEdge }) => !$frameEdge && getDefaultSegmentStyles($type)};
    ${frameEdgeStyles};
`;

const StyledStepperButton = styled.button<StyledStepperButtonProps>`
    ${buttonStyles};
    ${segmentLayoutStyles};
`;

type StepperButtonMeta = {
    iconName: 'minus' | 'plus';
    testId: string;
    translationKey: 'decrement-button-aria-label' | 'increment-button-aria-label';
};

const STEPPER_BUTTON_META: Record<StepperButtonType, StepperButtonMeta> = {
    decrement: {
        iconName: 'minus',
        testId: 'stepper-button-decrement',
        translationKey: 'decrement-button-aria-label',
    },
    increment: {
        iconName: 'plus',
        testId: 'stepper-button-increment',
        translationKey: 'increment-button-aria-label',
    },
};

export interface StepperButtonProps {
    disabled?: boolean;
    frameEdge?: StepperButtonFrameEdge;
    type: StepperButtonType;
    onPress?(event: MouseEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>): void;
    onStop?(): void;
}

export const StepperButton: FC<StepperButtonProps> = ({
    disabled,
    frameEdge,
    type,
    onPress,
    onStop,
}) => {
    const { t } = useTranslation('stepper-buttons');
    const { isMobile } = useDeviceContext();
    const { iconName, testId, translationKey } = STEPPER_BUTTON_META[type];

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onPress?.(event);
        }
    };

    return (
        <StyledStepperButton
            $frameEdge={frameEdge}
            $isMobile={isMobile}
            $type={type}
            aria-label={t(translationKey)}
            data-testid={testId}
            disabled={disabled}
            type="button"
            onKeyDown={handleKeyDown}
            onMouseDown={onPress}
            onMouseLeave={onStop}
            onMouseUp={onStop}
        >
            <Icon name={iconName} size={isMobile ? '20' : '16'} />
        </StyledStepperButton>
    );
};

StepperButton.displayName = 'StepperButton';
