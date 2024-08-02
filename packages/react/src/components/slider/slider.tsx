import { FunctionComponent, ReactElement } from 'react';
import { Slider as BaseSlider, SliderValueLabelSlotProps, sliderClasses } from '@mui/base/Slider';
import styled from 'styled-components';
import { TooltipProps } from '../tooltip/tooltip';
import { useId } from '../../hooks/use-id';
import { FieldContainer } from '../field-container/field-container';

export const ValueTooltip = styled.div`
    background-color: ${({ theme }) => theme.component['tooltip-popper-container-default-background-color']};
    border: 1px solid ${({ theme }) => theme.component['tooltip-popper-container-border-color']};
    border-radius: var(--border-radius);
    box-shadow: 0 10px 20px 0 rgb(0 0 0 / 19%);
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['tooltip-popper-container-text-color']};
    font-size: 0.75rem;
    padding: var(--spacing-half) var(--spacing-1x);
    position: absolute;
    top: 2.5rem;
    transform: scale(0);
    transform-origin: 50% -0.49rem;
    transition: transform 0.12s;

    &::before {
        border-color: transparent transparent ${({ theme }) => theme.component['tooltip-popper-container-default-background-color']} transparent;
        border-style: solid;
        border-width: 0 0.5rem 0.5rem;
        content: '';
        height: 0;
        left: 50%;
        position: absolute;
        top: -0.49rem;
        transform: translateX(-50%);
        width: 0;
    }
`;

const Labels = styled.div`
    color: ${({ theme }) => theme.component['slider-rail-label-text-color']};
    display: flex;
    font-size: 0.75rem;
    justify-content: space-between;
    margin-top: 2px;
`;

const SliderContainer = styled.div`
    padding: 0 12px;
`;

const StyledSlider = styled(BaseSlider)`
    align-items: center;
    cursor: pointer;
    display: flex;
    height: 8px;
    padding: 8px 0;
    position: relative;
    -webkit-tap-highlight-color: transparent;
    touch-action: none;
    width: 100%;

    & .${sliderClasses.rail} {
        background-color: ${({ theme }) => theme.component['slider-rail-background-color']};
        border-radius: 99px;
        display: block;
        height: 8px;
        margin-left: -12px;
        padding: 0 12px;
        position: absolute;
        width: 100%;
    }

    & .${sliderClasses.track} {
        background-color: ${({ theme }) => theme.component['slider-track-background-color']};
        border-radius: 99px;
        display: block;
        height: 8px;
        margin-left: -12px;
        padding: 0 12px;
        position: absolute;
    }

    & .${sliderClasses.thumb} {
        border-radius: 50%;
        display: flex;
        height: 32px;
        justify-content: center;
        margin-left: -16px;
        position: absolute;
        width: 32px;

        &::before {
            background-color: ${({ theme }) => theme.component['slider-thumb-background-color']};
            border: 2px solid ${({ theme }) => theme.component['slider-thumb-border-color']};
            border-radius: 50%;
            box-sizing: border-box;
            content: '';
            display: block;
            height: 24px;
            left: 50%;
            outline: 0;
            position: absolute;
            top: 50%;
            transform: translate(-50%, -50%);
            transform-origin: center;
            transition-duration: 120ms;
            transition-property: box-shadow, width, height;
            width: 24px;
        }
        
        &.${sliderClasses.active},
        &:hover {
            &::before {
                height: 32px;
                width: 32px;
            }
        }

        &.${sliderClasses.focusVisible} {
            &::before {
                box-shadow: inset 0 0 0 2px ${({ theme }) => theme.component['focus-inside-border-color']};
            }
        }
        
        &.${sliderClasses.active} {
            &::before {
                box-shadow: inset 0 0 0 2px ${({ theme }) => theme.component['slider-thumb-border-color']};
            }
        }

        &.${sliderClasses.focusVisible},
        &:hover {
            ${ValueTooltip} {
                transform: scale(1);
            }
        }
    }

    & .${sliderClasses.mark} {
        background-color: ${({ theme }) => theme.component['slider-rail-mark-background-color']};
        border-radius: 99%;
        height: 2px;
        position: absolute;
        transform: translateX(-50%);
        width: 2px;
    }

    & .${sliderClasses.markActive} {
        background-color: ${({ theme }) => theme.component['slider-track-mark-background-color']};
    }

    &.${sliderClasses.disabled} {
        cursor: default;
        pointer-events: none;
        
        .${sliderClasses.rail} {
            background-color: ${({ theme }) => theme.component['slider-rail-disabled-background-color']};
        }

        .${sliderClasses.track} {
            background-color: ${({ theme }) => theme.component['slider-track-disabled-background-color']};
        }

        .${sliderClasses.thumb} {
            &::before {
                border-color: ${({ theme }) => theme.component['slider-thumb-disabled-border-color']};
            }
        }

        .${sliderClasses.mark} {
            background-color: ${({ theme }) => theme.component['slider-rail-mark-disabled-background-color']};
        }

        & .${sliderClasses.markActive} {
            background-color: ${({ theme }) => theme.component['slider-track-mark-disabled-background-color']};
        }
    }
`;

const SliderValueTooltip: FunctionComponent<SliderValueLabelSlotProps> = ({ children }) => (
    <ValueTooltip>
        {children}
    </ValueTooltip>
);

// Widen the literal value to be number (ex: type '20' -> type 'number')
type InferValueType<T> = T extends number ? number : number[];

interface SliderProps<TValue extends number | number[]> {
    className?: string;
    id?: string;
    max: number;
    min: number;
    value?: TValue;
    disabled?: boolean;
    defaultValue?: TValue;
    hint?: string;
    label?: string;
    noMargin?: boolean;
    tooltip?: TooltipProps;
    invalid?: boolean;
    validationErrorMessage?: string;
    step?: number;
    onChange?: (event: Event, value: InferValueType<TValue>) => void;
}

// eslint-disable-next-line comma-spacing
export const Slider = <TValue extends number | number[]>({
    className,
    id: providedId,
    max,
    min,
    value,
    defaultValue,
    disabled,
    hint,
    label,
    noMargin,
    tooltip,
    invalid,
    validationErrorMessage,
    step,
    onChange,
}: SliderProps<TValue>): ReactElement => {
    const id = useId(providedId);

    return (
        <FieldContainer
            className={className}
            fieldId={id}
            hint={hint}
            label={label}
            tooltip={tooltip}
            noMargin={noMargin}
            valid={!invalid}
            noInvalidFieldIcon={!validationErrorMessage}
            validationErrorMessage={validationErrorMessage ?? ''}
        >
            <SliderContainer>
                <StyledSlider
                    data-testid="slider"
                    min={min}
                    max={max}
                    value={value}
                    defaultValue={defaultValue}
                    disabled={disabled}
                    step={step}
                    marks={step ? true : undefined}
                    slots={{ valueLabel: SliderValueTooltip }}
                    slotProps={{
                        input: { id },
                    }}
                    onChange={onChange}

                />
                {/* <BaseSlider slotProps={{ valueLabel: }}> */}
            </SliderContainer>
            <Labels>
                <span>{min}</span>
                <span>{max}</span>
            </Labels>
        </FieldContainer>
    );
};
