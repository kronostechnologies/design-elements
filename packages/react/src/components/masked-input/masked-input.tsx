import { useMaskito } from '@maskito/react';
import { ChangeEvent, FC, type MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useDeviceContext } from '../device-context-provider';
import { TextInput } from '../text-input';
import { convertToMaskitoOptions, getTextMask, type MaskProps } from './mask';
import { extractRawInput, formatDefaultValue } from './masked-input-utils';

export const DEFAULT_SEPARATORS = '()- /.';

export type MaskedInputProps = {
    className?: string;
    defaultValue?: string;
    disabled?: boolean;
    hint?: string;
    id?: string;
    inputType?: string;
    label?: string;
    name?: string;

    onChange?(rawValue: string, formattedValue: string, event: ChangeEvent<HTMLInputElement>): void;

    readOnly?: boolean;
    required?: boolean;
    /**
     * Separators contained in the mask that should be ignored when extracting the raw value.
     * @default '()- /.'.
     */
    separators?: string;
    validationErrorMessage?: string;
} & MaskProps;

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
    onChange,
    readOnly,
    required,
    separators = DEFAULT_SEPARATORS,
    validationErrorMessage,
    ...otherProps
}) => {
    const { isMobile } = useDeviceContext();
    const separatorsSet = useMemo(() => new Set(separators), [separators]);

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
            return '';
        }
        return formatDefaultValue(defaultValue, maskitoOptions);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [displayValue, setDisplayValue] = useState(formattedDefault);
    const [valid, setValid] = useState(true);

    const mergedRef = useCallback((el: HTMLInputElement | null) => {
        (inputRef as MutableRefObject<HTMLInputElement | null>).current = el;
        maskitoRef(el);
    }, [maskitoRef]);

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

        const rawValue = extractRawInput(newValue, separatorsSet);
        onChange?.(rawValue, newValue, event as unknown as ChangeEvent<HTMLInputElement>);
    }, [onChange, separatorsSet]);

    const handleInvalid = useCallback(() => {
        setValid(false);
    }, []);

    const dataAttributes = useDataAttributes(otherProps);

    return (
        <StylableContainer className={className}>
            <Container>
                <MaskContainer aria-hidden="true" $isMobile={isMobile}>
                    <InputDuplicatedValue>{displayValue}</InputDuplicatedValue>
                    <span>{unfilledPart}</span>
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
                    disabled={disabled}
                    hint={hint}
                    label={label}
                    onChange={handleInput}
                    onInvalid={handleInvalid}
                    valid={valid}
                    validationErrorMessage={validationErrorMessage}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
            </Container>
        </StylableContainer>
    );
};

MaskedInput.displayName = 'MaskedInput';
