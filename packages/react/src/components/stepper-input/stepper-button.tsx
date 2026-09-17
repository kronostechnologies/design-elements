import { type FC, type KeyboardEvent, type MouseEvent } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
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

interface StyledButtonProps {
    $frameEdge?: StepperButtonFrameEdge;
    $isMobile: boolean;
}

const buttonStyles = css<StyledButtonProps>`
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

const frameEdgeStyles = css<StyledButtonProps>`
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

const DecrementButton = styled.button<StyledButtonProps>`
    ${buttonStyles};
    ${({ $frameEdge }) => !$frameEdge && css`
        ${stepperSegmentSurfaceStyles};
        ${stepperSegmentLeadingEdgeStyles};
        ${stepperSegmentTrailingDividerStyles};
        ${stepperSegmentLeadingCornerStyles};
    `};
    ${frameEdgeStyles};

    ${({ $frameEdge }) => !$frameEdge && css`
        z-index: 1;
    `};
`;

const IncrementButton = styled.button<StyledButtonProps>`
    ${buttonStyles};
    ${({ $frameEdge }) => !$frameEdge && css`
        ${stepperSegmentSurfaceStyles};
        ${stepperSegmentTrailingDividerStyles};
        ${stepperSegmentTrailingCornerStyles};
        z-index: 1;
    `};
    ${frameEdgeStyles};
`;

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

    const ButtonComponent = type === 'decrement' ? DecrementButton : IncrementButton;
    const ariaLabel = type === 'decrement'
        ? t('decrement-button-aria-label')
        : t('increment-button-aria-label');
    const testId = type === 'decrement' ? 'stepper-button-decrement' : 'stepper-button-increment';
    const iconName = type === 'decrement' ? 'minus' : 'plus';

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>): void => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onPress?.(event);
        }
    };

    return (
        <ButtonComponent
            $frameEdge={frameEdge}
            $isMobile={isMobile}
            aria-label={ariaLabel}
            data-testid={testId}
            disabled={disabled}
            type="button"
            onKeyDown={handleKeyDown}
            onMouseDown={onPress}
            onMouseLeave={onStop}
            onMouseUp={onStop}
        >
            <Icon name={iconName} size={isMobile ? '20' : '16'} />
        </ButtonComponent>
    );
};

StepperButton.displayName = 'StepperButton';
