import { ReactElement } from 'react';
import { useId } from '../../hooks/use-id';
import { useTranslation } from '../../i18n/use-translation';
import { FieldContainer } from '../field-container';
import { ToggletipProps } from '../toggletip';
import { TooltipProps } from '../tooltip';
import { Labels, SliderContainer, StyledSlider } from './styles';
import { ValueTooltip } from './value-tooltip';

// Widen the literal value to be number (ex: type '20' -> type 'number')
type InferValueType<T> = T extends number ? number : number[];

export interface SliderProps<TValue extends number | number[]> {
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
    toggletip?: ToggletipProps;
    invalid?: boolean;
    validationErrorMessage?: string;
    step?: number;
    onChange?: (event: Event, value: InferValueType<TValue>) => void;
}

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
    toggletip,
    invalid,
    validationErrorMessage,
    step,
    onChange,
}: SliderProps<TValue>): ReactElement => {
    const { t } = useTranslation('slider');
    const id = useId(providedId);
    const isRange = Array.isArray(value ?? defaultValue);

    return (
        <FieldContainer
            className={className}
            fieldId={id}
            hint={hint}
            label={label}
            tooltip={tooltip}
            toggletip={toggletip}
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
                    slots={{ valueLabel: ValueTooltip }}
                    onChange={onChange}
                    aria-label={isRange ? t('rangeAriaLabel', { label }) : label}
                />
            </SliderContainer>
            <Labels>
                <span>{min}</span>
                <span>{max}</span>
            </Labels>
        </FieldContainer>
    );
};

Slider.displayName = 'Slider';
