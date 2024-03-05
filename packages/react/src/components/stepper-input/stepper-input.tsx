import {
    ChangeEvent,
    DetailedHTMLProps,
    InputHTMLAttributes,
    RefObject,
    useMemo,
    useRef,
    VoidFunctionComponent,
} from 'react';
import styled from 'styled-components';
import { useAriaLabels } from '../../hooks/use-aria';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { v4 as uuid } from '../../utils/uuid';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { responsiveInputsStyle } from '../text-input/styles/inputs';
import { TooltipProps } from '../tooltip/tooltip';
import { StepperButtons } from './stepper-buttons';

const Wrapper = styled.div`
    display: flex;
    max-width: fit-content;
`;

interface StyledInputProps {
    device: DeviceContextProps;
    theme: ResolvedTheme;
}

const StyledInput = styled.input<StyledInputProps>`
    ${responsiveInputsStyle}

    border-radius: ${({ device }) => (device.isMobile ? 'var(--border-radius)' : 'var(--border-radius) 0 0 var(--border-radius)')};
    height: ${({ device }) => (device.isMobile ? 2.5 : 2)}rem;
    width: ${({ device }) => (device.isMobile ? 10.25 : 3.5)}rem;
    z-index: 1;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none; /* stylelint-disable-line property-no-vendor-prefix */
        margin: 0;
    }

    &[type='number'] {
        -moz-appearance: textfield; /* stylelint-disable-line property-no-vendor-prefix */
    }
`;

type PartialStepperInputProps = Pick<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'disabled' | 'onFocus' | 'onBlur' | 'step'>;

type Value = undefined | number | null;

interface StepperInputProps extends PartialStepperInputProps {
    defaultValue?: number;
    /** Mutually exclusive: label, aria-label, aria-labelledby */
    label?: string;
    ariaLabel?: string;
    ariaLabelledBy?: string;
    ariaDescribedBy?: string;
    hint?: string;
    valid?: boolean;
    validationErrorMessage?: string;
    id?: string;
    max?: number;
    min?: number;
    noMargin?: boolean;
    tooltip?: TooltipProps;
    value?: Value;

    onChange?(value: Value): void
}

function triggerChangeEventOnRef(ref: RefObject<HTMLInputElement>): void {
    // Rationale for using dispatchEvent: https://github.com/kronostechnologies/design-elements/pull/180#discussion_r556050899
    ref.current?.dispatchEvent(new Event('change', { bubbles: true }));
}

export const StepperInput: VoidFunctionComponent<StepperInputProps> = ({
    defaultValue,
    disabled,
    hint,
    id,
    label,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    max,
    min,
    noMargin,
    step,
    tooltip,
    valid = true,
    validationErrorMessage,
    value,
    onBlur,
    onChange,
    onFocus,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { t } = useTranslation('stepper-input');
    const device = useDeviceContext();
    const fieldId = useMemo(() => id || uuid(), [id]);

    function handleIncrement(): void {
        const valueBefore = Number(inputRef.current?.value);
        inputRef.current?.stepUp();
        const valueAfter = Number(inputRef.current?.value);

        if (valueBefore !== valueAfter) {
            triggerChangeEventOnRef(inputRef);
        }
    }

    function handleDecrement(): void {
        const valueBefore = Number(inputRef.current?.value);
        inputRef.current?.stepDown();
        const valueAfter = Number(inputRef.current?.value);

        if (valueBefore !== valueAfter) {
            triggerChangeEventOnRef(inputRef);
        }
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
        const inputValue: string = event.target.value;
        if (inputValue === '') {
            onChange?.(null);
        } else {
            const currentValue = Number(inputValue);
            onChange?.(currentValue);
        }
    };

    const { processedLabels } = useAriaLabels({
        inputId: fieldId,
        label,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        additionalAriaDescribedBy: [
            { id: `${fieldId}_hint`, include: !!hint },
            { id: `${fieldId}_invalid`, include: !valid },
        ],
    });

    return (
        <FieldContainer
            fieldId={fieldId}
            hint={hint}
            label={processedLabels.label}
            tooltip={tooltip}
            noMargin={noMargin}
            valid={valid}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
        >
            <Wrapper>
                <StyledInput
                    aria-label={processedLabels.ariaLabel}
                    aria-labelledby={processedLabels.ariaLabelledBy}
                    aria-describedby={processedLabels.ariaDescribedBy}
                    data-testid="stepper-input"
                    defaultValue={defaultValue}
                    device={device}
                    disabled={disabled}
                    id={fieldId}
                    max={max}
                    min={min}
                    name="points"
                    onChange={handleChange}
                    onBlur={onBlur}
                    onFocus={onFocus}
                    ref={inputRef}
                    step={step}
                    type="number"
                    value={value === null ? '' : value}
                />
                {!device.isMobile && (
                    <StepperButtons
                        disabled={disabled}
                        onDecrement={handleDecrement}
                        onIncrement={handleIncrement}
                    />
                )}
            </Wrapper>
        </FieldContainer>
    );
};
