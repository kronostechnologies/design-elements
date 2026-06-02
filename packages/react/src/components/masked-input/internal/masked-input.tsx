import { useMaskito } from '@maskito/react';
import {
    ChangeEvent,
    type ChangeEventHandler,
    FC,
    FocusEvent,
    type FocusEventHandler,
    FormEvent,
    FormEventHandler,
    type MutableRefObject,
    useCallback,
    useMemo,
    useRef,
    useState,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../../hooks/use-data-attributes';
import { useDeviceContext } from '../../device-context-provider';
import type { RequiredLabelProps } from '../../label/label';
import { TextInput } from '../../text-input';
import { getTextMask, type MaskProps } from './mask';
import { extractRawInput, formatValue } from './masked-input-utils';
import { convertToMaskitoOptions } from './maskito';

export const DEFAULT_SEPARATORS = '()- /.';

const MaskContainer = styled.div<{ $isMobile: boolean }>`
    background: ${({ theme }) => theme.component['masked-input-background-color']};
    bottom: 0;
    color: ${({ theme }) => theme.component['masked-input-mask-text-color']};
    display: block;
    font-family: inherit;
    font-size: ${({ $isMobile }) => ($isMobile ? '1' : '0.875')}rem;
    left: 2px;
    letter-spacing: ${({ $isMobile }) => ($isMobile ? '0.02875' : '0.015')}rem;
    line-height: 1.5rem;
    padding: var(--spacing-half) var(--spacing-1x);
    pointer-events: none;
    position: absolute;
`;

const StylableContainer = styled.div``;

const Container = styled.div`
    position: relative;
`;

const InputDuplicatedValue = styled.span`
    color: transparent;
`;

const StyledTextInput = styled(TextInput)`
    margin: 0;
`;

export type MaskedInputProps = {
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    hint?: string;
    id?: string;
    inputType?: string;
    label?: string;
    name?: string;

    onBlur?(event: FocusEvent<HTMLInputElement>): void;
    onChange?(rawValue: string, formattedValue: string, event: ChangeEvent<HTMLInputElement>): void;
    onFocus?(event: FocusEvent<HTMLInputElement>): void;
    onInvalid?(event: FormEvent<HTMLInputElement>): void;

    readOnly?: boolean;
    required?: boolean;
    requiredLabelType?: RequiredLabelProps['type'];
    valid?: boolean;
    validationErrorMessage?: string;
    value?: string;
} & MaskProps;

/**
 * @alpha This component is experimental and may change without a major version bump.
 */
export const MaskedInput: FC<MaskedInputProps> = ({
    className,
    defaultValue,
    disabled,
    hint,
    id: providedId,
    inputType = 'text',
    label,
    name,
    onBlur,
    onChange,
    onFocus,
    onInvalid,
    readOnly,
    required,
    requiredLabelType,
    ignoredSeparators = DEFAULT_SEPARATORS,
    valid,
    validationErrorMessage,
    value,
    ...otherProps
}) => {
    const { isMobile } = useDeviceContext();
    const ignoredSeparatorsSet: Set<string> = useMemo(() => new Set(ignoredSeparators), [ignoredSeparators]);
    const [validity, setValidity] = useState(valid ?? true);
    const mask = useMemo(() => getTextMask(otherProps), [otherProps]);
    const maskitoOptions = useMemo(
        () => convertToMaskitoOptions(otherProps),
        // We need to depend on the actual values, otherwise otherProps changes each render
        [...Object.values(otherProps)], // eslint-disable-line react-hooks/exhaustive-deps
    );

    const maskitoRef = useMaskito({ options: maskitoOptions });
    const inputRef = useRef<HTMLInputElement>(null);

    const formattedDefault = useMemo(() => {
        if (!defaultValue) {
            return undefined;
        }
        return formatValue(defaultValue, maskitoOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [displayValue, setDisplayValue] = useState(formattedDefault || '');
    const [previousDisplayValue, setPreviousDisplayValue] = useState(displayValue);

    const mergedRef = useCallback((el: HTMLInputElement | null) => {
        (inputRef as MutableRefObject<HTMLInputElement | null>).current = el;
        maskitoRef(el);
    }, [maskitoRef]);

    const unfilledPart = mask.slice(displayValue.length);

    if (value !== undefined && previousDisplayValue !== value) {
        setDisplayValue(formatValue(value, maskitoOptions));
        setPreviousDisplayValue(value);
    }

    const handleBlur: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
        if (valid === undefined) {
            if (required && event.currentTarget.value === '') {
                setValidity(true);
            } else {
                setValidity(event.currentTarget.checkValidity());
            }
        }

        onBlur?.(event);
    }, [onBlur, valid, required]);

    const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
        const newValue = event.target.value;
        setDisplayValue(newValue);

        const rawValue = extractRawInput(newValue, ignoredSeparatorsSet);
        onChange?.(rawValue, newValue, event as unknown as ChangeEvent<HTMLInputElement>);
    }, [onChange, ignoredSeparatorsSet]);

    const handleFocus: FocusEventHandler<HTMLInputElement> = useCallback((event) => {
        onFocus?.(event);
    }, [onFocus]);

    const handleInvalid: FormEventHandler<HTMLInputElement> = useCallback((event) => {
        if (valid === undefined) {
            setValidity(false);
        }
        onInvalid?.(event);
    }, [onInvalid, valid]);

    if (valid !== undefined && valid !== validity) {
        setValidity(valid);
    }

    const dataAttributes = useDataAttributes(otherProps);

    return (
        <StylableContainer className={className}>
            <Container>
                <MaskContainer aria-hidden="true" $isMobile={isMobile}>
                    <InputDuplicatedValue>{displayValue}</InputDuplicatedValue>
                    <span data-testid="unfilled-mask">{unfilledPart}</span>
                </MaskContainer>

                <StyledTextInput
                    data-testid="masked-text-input"
                    ref={mergedRef}
                    id={providedId}
                    type={inputType}
                    name={name}
                    defaultValue={formattedDefault}
                    readOnly={readOnly}
                    required={required}
                    requiredLabelType={requiredLabelType}
                    disabled={disabled}
                    hint={hint}
                    label={label}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    onChange={handleChange}
                    onInvalid={handleInvalid}
                    valid={validity}
                    validationErrorMessage={validationErrorMessage}
                    value={value !== undefined ? displayValue : undefined}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
            </Container>
        </StylableContainer>
    );
};

MaskedInput.displayName = 'MaskedInput';
