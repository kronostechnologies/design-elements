import { useMaskito } from '@maskito/react';
import { ChangeEvent, FC, type MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useDeviceContext } from '../device-context-provider';
import { TextInput } from '../text-input';
import {
    buildMaskitoOptions,
    DEFAULT_SEPARATORS,
    extractRawInput,
    formatDefaultValue,
} from './masked-input-utils';

export interface MaskedInputProps {
    defaultValue?: string;
    disabled?: boolean;
    hint?: string;
    id?: string;
    inputType?: string;
    label?: string;
    mask: string;
    name?: string;
    onChange?(rawValue: string, formattedValue: string, event: ChangeEvent<HTMLInputElement>): void;
    pattern: RegExp;
    readOnly?: boolean;
    required?: boolean;
    separators?: string;
    validationErrorMessage?: string;
}

const MaskContainer = styled.div<{ $isMobile: boolean }>`
    background: ${({ theme }) => theme.component['masked-input-background-color']};
    bottom: 1px;
    color: ${({ theme }) => theme.component['masked-input-mask-text-color']};
    font-family: inherit;
    font-size: ${({ $isMobile }) => ($isMobile ? '1' : '0.875')}rem;
    left: 2px;
    letter-spacing: ${({ $isMobile }) => ($isMobile ? '0.02875' : '0.015')}rem;
    line-height: 1.5rem;
    padding: var(--spacing-half) var(--spacing-1x);
    pointer-events: none;
    position: absolute;
`;

const Container = styled.div`
    position: relative;
`;

const InputDuplicatedValue = styled.span`
    color: transparent;
`;

/**
 * @alpha This component is experimental and may change without a major version bump.
 */
export const MaskedInput: FC<MaskedInputProps> = ({
    defaultValue,
    disabled,
    hint,
    id: providedId,
    inputType = 'text',
    label,
    mask,
    name,
    onChange,
    pattern,
    readOnly,
    required,
    separators = DEFAULT_SEPARATORS,
    validationErrorMessage,
    ...otherProps
}) => {
    const { isMobile } = useDeviceContext();
    const separatorSet = useMemo(() => new Set(separators), [separators]);

    const maskitoOptions = useMemo(
        () => buildMaskitoOptions(mask, pattern, separators),
        [mask, pattern, separators],
    );

    const maskitoRef = useMaskito({ options: maskitoOptions });
    const inputRef = useRef<HTMLInputElement>(null);

    const formattedDefault = useMemo(() => {
        if (!defaultValue) return '';
        return formatDefaultValue(defaultValue, maskitoOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [displayValue, setDisplayValue] = useState(formattedDefault);
    const [valid, setValid] = useState(true);

    const mergedRef = useCallback((el: HTMLInputElement | null) => {
        (inputRef as MutableRefObject<HTMLInputElement | null>).current = el;
        maskitoRef(el);
    }, [maskitoRef]);

    const filledPart = displayValue;
    const unfilledPart = mask.slice(displayValue.length);
    const hasInput = displayValue.length > 0;

    useEffect(() => {
        if (required) {
            inputRef.current?.setCustomValidity(hasInput ? '' : ' ');
        }
    }, [hasInput, required]);

    const handleInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        setDisplayValue(newValue);
        setValid(true);

        const rawValue = extractRawInput(newValue, separatorSet);
        onChange?.(rawValue, newValue, event as unknown as ChangeEvent<HTMLInputElement>);
    }, [onChange, separatorSet]);

    const handleInvalid = useCallback(() => {
        setValid(false);
    }, []);

    const handleFocus = useCallback(() => {
        if (!inputRef.current) return;
        const firstFillableIndex = Array.from(mask).findIndex((char) => !separatorSet.has(char));
        if (firstFillableIndex > 0 && !displayValue) {
            setTimeout(() => {
                inputRef.current?.setSelectionRange(firstFillableIndex, firstFillableIndex);
            }, 0);
        }
    }, [mask, separatorSet, displayValue]);

    const dataAttributes = useDataAttributes(otherProps);

    return (
        <Container>
            <MaskContainer aria-hidden="true" $isMobile={isMobile}>
                <InputDuplicatedValue>{filledPart}</InputDuplicatedValue>
                <span>{unfilledPart}</span>
            </MaskContainer>

            <TextInput
                data-testid="masked-text-input"
                ref={mergedRef}
                id={providedId}
                type={inputType}
                name={name}
                pattern={pattern.source}
                defaultValue={formattedDefault}
                readOnly={readOnly}
                required={required}
                disabled={disabled}
                hint={hint}
                label={label}
                onChange={handleInput}
                onFocus={handleFocus}
                onInvalid={handleInvalid}
                valid={valid}
                validationErrorMessage={validationErrorMessage}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
        </Container>
    );
};

MaskedInput.displayName = 'MaskedInput';
