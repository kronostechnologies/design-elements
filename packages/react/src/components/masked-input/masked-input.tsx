import {
    ChangeEvent,
    FC,
    KeyboardEvent,
    MouseEvent,
    useCallback,
    useEffect,
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
    buildSlotMap,
    findNextInsertPositionFromMaskInputDiff,
    getPreviousSlotIndex,
    getSlotCount,
    hasUserInput,
    isValidInputChar,
} from './masked-input-char-finder';
import { buildSlotAtoms, extractUserInput, filterByPattern, formatFromMask, removeSlotCharsOnMaskCharRemoval } from './masked-input-value-formater';
import { getFirstUnfilledSlotIndex, getValueFromSplitIndex, trimCharAfterMaxLength } from './masked-input-value-parser';

export interface MaskedInputProps {
    defaultValue?: string;
    disabled?: boolean;
    hint?: string;
    id?: string;
    inputType?: string;
    label?: string;
    mask: string;
    name?: string;
    pattern: string;
    readOnly?: boolean;
    required?: boolean;
    separators?: string;
    validationErrorMessage?: string;

    onChange?(rawValue: string, formattedValue: string, event: ChangeEvent<HTMLInputElement>): void;
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

function ensureValidRegex(pattern: string): void {
    try {
        // eslint-disable-next-line no-new
        new RegExp(pattern);
    } catch {
        console.error(`Invalid regex pattern provided to MaskedInput: ${pattern}`);
    }
}

function getFilledPart(hasInput: boolean, firstUnfilledSlot: number, inputValue: string): string {
    if (!hasInput) {
        return '';
    }
    return firstUnfilledSlot === -1 ? inputValue : inputValue.slice(0, firstUnfilledSlot);
}

function getUnfilledPart(hasInput: boolean, inputValue: string, firstUnfilledSlot: number): string {
    if (!hasInput) {
        return inputValue;
    }
    return firstUnfilledSlot === -1 ? '' : inputValue.slice(firstUnfilledSlot);
}

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
    separators = '()- /',
    validationErrorMessage,
    ...otherProps
}) => {
    ensureValidRegex(pattern);
    const { isMobile } = useDeviceContext();
    const separatorSet = useMemo(() => new Set(separators), [separators]);
    const slots = useMemo(() => buildSlotMap(mask, separators), [mask, separators]);
    const slotAtoms = useMemo(() => buildSlotAtoms(pattern, separators), [pattern, separators]);
    const maxLength = useMemo(() => getSlotCount(slots), [slots]);

    const formatValue = useCallback(
        (input: string) => {
            const trimmedInput = trimCharAfterMaxLength(
                filterByPattern(extractUserInput(input, separatorSet), slotAtoms),
                maxLength,
            );
            return formatFromMask(mask, slots, trimmedInput);
        },
        [mask, slots, separatorSet, slotAtoms, maxLength],
    );

    const [inputValue, setInputValue] = useState(() => formatValue(defaultValue ?? ''));
    const [valid, setValid] = useState(true);
    const firstUnfilledSlot = getFirstUnfilledSlotIndex(inputValue, slots, mask);
    const [selectionPosition, setSelectionPosition] = useState(0);
    const [isTextHighlighted, setIsTextHighlighted] = useState(false);
    const [lastEnteredKey, setLastEnteredKey] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);
    const [changeId, setChangeId] = useState(0);

    const hasBackspaceJustBeenEntered = useCallback(() => lastEnteredKey === 'Backspace', [lastEnteredKey]);
    const hasDeleteJustBeenEntered = useCallback(() => lastEnteredKey === 'Delete', [lastEnteredKey]);
    const isLastKeyEnteredInvalid = useCallback(
        () => !isValidInputChar(lastEnteredKey, separatorSet) && !hasBackspaceJustBeenEntered()
            && !hasDeleteJustBeenEntered(),
        [lastEnteredKey, separatorSet, hasBackspaceJustBeenEntered, hasDeleteJustBeenEntered],
    );

    useLayoutEffect(() => {
        inputRef.current?.setSelectionRange(selectionPosition, selectionPosition);
    }, [changeId, selectionPosition]);

    useEffect(() => {
        if (required) {
            inputRef.current?.setCustomValidity(hasUserInput(inputValue, slots, mask) ? '' : ' ');
        }
    }, [inputValue, mask, required, slots]);

    const formatChange = useCallback(
        (currentValue: string, currentSelectionIndex: number) => {
            const valueWithoutSeparators = filterByPattern(
                extractUserInput(currentValue, separatorSet),
                slotAtoms,
            );
            const trimmedValue = trimCharAfterMaxLength(valueWithoutSeparators, maxLength);
            const isChangeACharRemoval = hasBackspaceJustBeenEntered() || hasDeleteJustBeenEntered();
            const hasNoChangeAfterFormat = trimmedValue === extractUserInput(inputValue, separatorSet);

            const newInput = (!isTextHighlighted && isChangeACharRemoval && hasNoChangeAfterFormat)
                ? removeSlotCharsOnMaskCharRemoval(
                    trimmedValue,
                    inputValue,
                    slots,
                    mask,
                    currentSelectionIndex,
                    hasBackspaceJustBeenEntered(),
                )
                : trimmedValue;

            return { rawValue: newInput, formattedValue: formatFromMask(mask, slots, newInput) };
        },
        [
            hasBackspaceJustBeenEntered,
            hasDeleteJustBeenEntered,
            isTextHighlighted,
            mask,
            slotAtoms,
            slots,
            separatorSet,
            inputValue,
            maxLength,
        ],
    );

    function isSelectionOnValueBorders(selection: number, value: string): boolean {
        return selection === 0 || selection > value.length;
    }

    const isValidCharAtPosition = useCallback((selection: number, value: string): boolean => (
        isValidInputChar(value[selection - 1], separatorSet)
    ), [separatorSet]);

    const getNewSelectionPosition = useCallback((
        currentSelection: number,
        currentValue: string,
        newValue: string,
    ) => {
        if (isLastKeyEnteredInvalid()) {
            return currentSelection - 1;
        }
        if (hasDeleteJustBeenEntered() || isTextHighlighted) {
            return currentSelection;
        }
        if (hasBackspaceJustBeenEntered()) {
            const previousSlot = getPreviousSlotIndex(slots, currentSelection + 1);
            if (previousSlot === -1) {
                return 0;
            }
            const deletedCharWasSeparator = !slots[currentSelection];
            return deletedCharWasSeparator ? previousSlot + 1 : previousSlot;
        }
        if (isSelectionOnValueBorders(currentSelection, newValue)
            || isValidCharAtPosition(currentSelection, newValue)) {
            return currentSelection;
        }
        const newPosition = findNextInsertPositionFromMaskInputDiff(currentValue, slots, separatorSet);
        return newPosition === -1 ? currentSelection : newPosition;
    }, [
        isLastKeyEnteredInvalid,
        hasDeleteJustBeenEntered,
        isTextHighlighted,
        hasBackspaceJustBeenEntered,
        isValidCharAtPosition,
        slots,
        separatorSet,
    ]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        const currentTarget = event.currentTarget;
        const currentValue = currentTarget.value;
        const currentSelection = currentTarget.selectionStart ?? 0;
        const { rawValue, formattedValue: newFormattedValue } = formatChange(currentValue, currentSelection);

        setInputValue(newFormattedValue);
        setValid(true);
        setSelectionPosition(getNewSelectionPosition(currentSelection, currentValue, newFormattedValue));

        if (isTextHighlighted) {
            setIsTextHighlighted(false);
        }

        onChange?.(rawValue, newFormattedValue, event);

        setChangeId(changeId + 1);
    }, [changeId, formatChange, getNewSelectionPosition, isTextHighlighted, onChange]);

    const handleMouseUp = useCallback(({ currentTarget }: MouseEvent<HTMLInputElement>) => {
        const selectionStart = currentTarget.selectionStart;
        const selectionEnd = currentTarget.selectionEnd;
        setIsTextHighlighted(selectionStart !== null && selectionEnd !== null && selectionStart !== selectionEnd);
    }, []);

    const handleKeyDown = useCallback(({ key }: KeyboardEvent<HTMLInputElement>) => {
        setLastEnteredKey(key);
    }, []);

    const handleInvalid = useCallback(() => {
        setValid(false);
    }, []);

    const dataAttributes = useDataAttributes(otherProps);
    const hasInput = hasUserInput(inputValue, slots, mask);
    const filledPart = getFilledPart(hasInput, firstUnfilledSlot, inputValue);
    const unfilledPart = getUnfilledPart(hasInput, inputValue, firstUnfilledSlot);
    const textInputValue = getValueFromSplitIndex(inputValue, firstUnfilledSlot, slots, mask);

    return (
        <Container>
            <MaskContainer aria-hidden="true" $isMobile={isMobile}>
                <InputDuplicatedValue>{filledPart}</InputDuplicatedValue>
                <span>{unfilledPart}</span>
            </MaskContainer>

            <TextInput
                data-testid="masked-text-input"
                ref={inputRef}
                id={providedId}
                type={inputType}
                name={name}
                pattern={pattern}
                value={textInputValue}
                readOnly={readOnly}
                required={required}
                disabled={disabled}
                hint={hint}
                label={label}
                onChange={handleChange}
                onMouseUp={handleMouseUp}
                onKeyDown={handleKeyDown}
                onInvalid={handleInvalid}
                valid={valid}
                validationErrorMessage={validationErrorMessage}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
        </Container>
    );
};

MaskedInput.displayName = 'MaskedInput';
