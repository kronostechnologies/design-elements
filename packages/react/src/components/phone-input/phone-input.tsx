import {
    ChangeEvent,
    FC,
    KeyboardEvent,
    MouseEvent,
    useCallback,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useDeviceContext } from '../device-context-provider';
import { TextInput } from '../text-input';
import {
    findNextInsertPositionFromPatternInputDiff,
    getPreviousPlaceholderIndex,
    hasAnyDecimalChar,
} from './phone-input-char-finder';
import { formatFromPattern, removeDigitOnMaskCharRemoval, removeNonDigits } from './phone-input-value-formater';
import { getMaskFromSplitIndex, getValueFromSplitIndex, trimCharAfterMaxLength } from './phone-input-value-parser';

export interface PhoneInputProps {
    pattern: string;
    defaultValue?: string;
    readOnly?: boolean;
    required?: boolean;
    disabled?: boolean;
    label?: string;
    hint?: string;
    name?: string;
    id?: string;
    validationErrorMessage?: string;
}

const MaskContainer = styled.div<{ isMobile: boolean }>`
    background: ${({ theme }) => theme.component['phone-input-background-color']};
    bottom: 1px;
    color: ${({ theme }) => theme.component['phone-input-mask-text-color']};
    font-family: inherit;
    font-size: ${({ isMobile }) => (isMobile ? '1' : '0.875')}rem;
    left: 2px;
    letter-spacing: ${({ isMobile }) => (isMobile ? '0.02875' : '0.015')}rem;
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

const PLACEHOLDER_CHAR = '_';
const MATCH_ALL_PLACEHOLDER_CHAR_OCCURRENCE_REGEX = new RegExp(`${PLACEHOLDER_CHAR}`, 'g');

function getPhoneNumberMaxLengthFromPattern(pattern: string): number {
    const occurrences = pattern.match(MATCH_ALL_PLACEHOLDER_CHAR_OCCURRENCE_REGEX) || [];
    return occurrences.length;
}

function formatDefaultValue(defaultValue: string, pattern: string, phoneNumberMaxLength: number): string {
    const inputValueWithoutNonDigits = removeNonDigits(defaultValue);
    const trimmedInputValue = trimCharAfterMaxLength(inputValueWithoutNonDigits, phoneNumberMaxLength);
    return formatFromPattern(pattern, PLACEHOLDER_CHAR, trimmedInputValue);
}

export const PhoneInput: FC<PhoneInputProps> = ({
    id: providedId,
    pattern,
    defaultValue,
    readOnly,
    required,
    disabled,
    label,
    hint,
    name,
    validationErrorMessage,
    ...otherProps
}) => {
    const { isMobile } = useDeviceContext();
    const phoneNumberMaxLength = useMemo(() => getPhoneNumberMaxLengthFromPattern(pattern), [pattern]);
    const formattedDefaultValue = useMemo(
        () => formatDefaultValue(defaultValue ?? '', pattern, phoneNumberMaxLength),
        [defaultValue, pattern, phoneNumberMaxLength],
    );
    const indexOfFirstMaskCharInDefaultValue = useMemo(
        () => formattedDefaultValue.indexOf(PLACEHOLDER_CHAR),
        [formattedDefaultValue],
    );
    const splitDefaultValue = useMemo(
        () => getValueFromSplitIndex(formattedDefaultValue, indexOfFirstMaskCharInDefaultValue),
        [formattedDefaultValue, indexOfFirstMaskCharInDefaultValue],
    );
    const [phoneInputValue, setPhoneInputValue] = useState(splitDefaultValue);
    const splitMaskValue = useMemo(
        () => getMaskFromSplitIndex(formattedDefaultValue, indexOfFirstMaskCharInDefaultValue, pattern),
        [formattedDefaultValue, indexOfFirstMaskCharInDefaultValue, pattern],
    );
    const [phoneInputMaskValue, setPhoneInputMaskValue] = useState(splitMaskValue);
    const [selectionPosition, setSelectionPosition] = useState(0);
    const [isTextHighlighted, setIsTextHighlighted] = useState(false);
    const [lastEnteredKey, setLastEnteredKey] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    // Only used as useLayoutEffect deps, in order to trigger the hook on each onChange event
    const [changeId, setChangeId] = useState(0);

    const hasBackspaceJustBeenEntered = useCallback(() => lastEnteredKey === 'Backspace', [lastEnteredKey]);
    const hasDeleteJustBeenEntered = useCallback(() => lastEnteredKey === 'Delete', [lastEnteredKey]);
    const isLastKeyEnteredInvalid = useCallback(
        () => Number.isNaN(Number(lastEnteredKey)) && !hasBackspaceJustBeenEntered() && !hasDeleteJustBeenEntered(),
        [lastEnteredKey, hasBackspaceJustBeenEntered, hasDeleteJustBeenEntered],
    );

    useLayoutEffect(() => {
        inputRef.current?.setSelectionRange(selectionPosition, selectionPosition);
    }, [changeId, selectionPosition]);

    const formatChange = useCallback((currentValue: string, currentSelectionIndex: number) => {
        const inputValueWithoutNonDigits = removeNonDigits(currentValue);
        const trimmedInputValue = trimCharAfterMaxLength(inputValueWithoutNonDigits, phoneNumberMaxLength);
        const isChangeACharRemoval = hasBackspaceJustBeenEntered() || hasDeleteJustBeenEntered();
        const hasNoChangeAfterFormat = trimmedInputValue === removeNonDigits(phoneInputValue);

        const newInputValue = (!isTextHighlighted && isChangeACharRemoval && hasNoChangeAfterFormat)
            ? removeDigitOnMaskCharRemoval(
                trimmedInputValue,
                currentValue,
                currentSelectionIndex,
                hasBackspaceJustBeenEntered(),
            )
            : trimmedInputValue;

        return formatFromPattern(pattern, PLACEHOLDER_CHAR, newInputValue);
    }, [
        hasBackspaceJustBeenEntered,
        hasDeleteJustBeenEntered,
        isTextHighlighted,
        pattern,
        phoneInputValue,
        phoneNumberMaxLength,
    ]);

    function isSelectionOnValueBorders(selection: number, value: string): boolean {
        return selection === 0 || selection > value.length;
    }

    function isDigitSelectedInValue(selection: number, newValue: string): boolean {
        return hasAnyDecimalChar(newValue[selection - 1]);
    }

    const getNewSelectionPosition = useCallback((currentSelection: number, currentValue: string, newValue: string) => {
        let newSelectionPosition: number;

        if (isLastKeyEnteredInvalid()) {
            newSelectionPosition = currentSelection - 1;
        } else if (hasDeleteJustBeenEntered() || isTextHighlighted) {
            newSelectionPosition = currentSelection;
        } else if (hasBackspaceJustBeenEntered()) {
            const previousPlaceholderIndex = getPreviousPlaceholderIndex(
                pattern,
                currentSelection + 1,
                PLACEHOLDER_CHAR,
            );

            newSelectionPosition = (previousPlaceholderIndex === -1) ? 0 : previousPlaceholderIndex;
        } else if (isSelectionOnValueBorders(currentSelection, newValue)
            || isDigitSelectedInValue(currentSelection, newValue)
        ) {
            newSelectionPosition = currentSelection;
        } else {
            const newPosition = findNextInsertPositionFromPatternInputDiff(currentValue, pattern, PLACEHOLDER_CHAR);
            newSelectionPosition = (newPosition === -1) ? currentSelection : newPosition;
        }

        return newSelectionPosition;
    }, [isLastKeyEnteredInvalid, hasBackspaceJustBeenEntered, hasDeleteJustBeenEntered, isTextHighlighted, pattern]);

    const handleChange = useCallback(({ currentTarget }: ChangeEvent<HTMLInputElement>) => {
        const inputValue = currentTarget.value;
        const currentSelection = currentTarget.selectionStart ?? 0;
        const newFormattedValue = formatChange(inputValue, currentSelection);
        const indexOfFirstMaskCharInNewValue = newFormattedValue.indexOf(PLACEHOLDER_CHAR);

        const splitPhoneInputValue = getValueFromSplitIndex(newFormattedValue, indexOfFirstMaskCharInNewValue);
        setPhoneInputValue(splitPhoneInputValue);
        const splitPhoneInputMask = getMaskFromSplitIndex(newFormattedValue, indexOfFirstMaskCharInNewValue, pattern);
        setPhoneInputMaskValue(splitPhoneInputMask);

        const newSelectionPosition = getNewSelectionPosition(currentSelection, inputValue, newFormattedValue);
        setSelectionPosition(newSelectionPosition);

        if (isTextHighlighted) {
            setIsTextHighlighted(!isTextHighlighted);
        }

        setChangeId(changeId + 1);
    }, [changeId, formatChange, getNewSelectionPosition, isTextHighlighted, pattern]);

    const handleMouseUp = useCallback(({ currentTarget }: MouseEvent<HTMLInputElement>) => {
        const selectionStart = currentTarget.selectionStart;
        const selectionEnd = currentTarget.selectionEnd;
        const isHighlighted = selectionStart !== null && selectionEnd !== null && selectionStart !== selectionEnd;
        setIsTextHighlighted(isHighlighted);
    }, []);

    const handleKeyDown = useCallback(({ key }: KeyboardEvent<HTMLInputElement>) => {
        setLastEnteredKey(key);
    }, []);

    const dataAttributes = useDataAttributes(otherProps);

    return (
        <Container>
            <MaskContainer aria-hidden="true" isMobile={isMobile}>
                <InputDuplicatedValue>{phoneInputValue}</InputDuplicatedValue>
                <span>{phoneInputMaskValue}</span>
            </MaskContainer>
            <TextInput
                data-testid="phone-text-input"
                ref={inputRef}
                id={providedId}
                type="tel"
                name={name}
                value={phoneInputValue}
                readOnly={readOnly}
                required={required}
                disabled={disabled}
                hint={hint}
                label={label}
                onChange={handleChange}
                onMouseUp={handleMouseUp}
                onKeyDown={handleKeyDown}
                validationErrorMessage={validationErrorMessage}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
        </Container>
    );
};

PhoneInput.displayName = 'PhoneInput';
