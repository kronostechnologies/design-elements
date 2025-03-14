import { useCallback, useEffect, useRef, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { TextInput } from '../text-input';
import {
    applyNewCharacter,
    clearSelectionInDisplayValue,
    extractRawValue,
    extractRawValueFromSelection,
    extractValidChars,
    getDefaultValueFormatted, getFormattedPastedValue,
    getNextEditablePosition, getPositionAfterPaste,
    isCharacterAllowed,
    isEditablePosition,
    removeSelectedCharacters,
} from './utils/mask-utils';
import { useDataAttributes } from '../../hooks/use-data-attributes';

const Container = styled.div`
    position: relative;
`;

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

const InputDuplicatedValue = styled.span`
    color: transparent;
`;

interface MaskInputProps {
    mask: string,
    onChange?: (value: string) => void,
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

export const MaskInput: VoidFunctionComponent<MaskInputProps> = ({
    id: providedId,
    mask,
    defaultValue,
    onChange,
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
    const [displayValue, setDisplayValue] = useState('');
    const [rawValue, setRawValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (defaultValue) {
            setDisplayValue(getDefaultValueFormatted(defaultValue, mask));
            return;
        }
        const initialDisplayValue = mask.replace(/[A1_]/g, '_');
        setDisplayValue(initialDisplayValue);
    }, [defaultValue, mask]);

    const updateDisplayValue = useCallback((newValue: string): void => {
        setDisplayValue(newValue);
        setRawValue(extractRawValue(newValue, mask));
        if (onChange) {
            onChange(rawValue);
        }
    }, [mask, onChange, rawValue]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>):void => {
        console.log('handleInputChange');
        const input = e.target;
        const newValue = input.value;
        console.log(newValue);
        const cursorPosition = input.selectionStart || 0;
        let updatedValue = displayValue;
        let isValidInput = true;

        const editPosition = getNextEditablePosition(mask, cursorPosition - 1);
        if (editPosition >= 0 && editPosition < mask.length) {
            const newChar = newValue.charAt(editPosition);
            console.log(newChar);
            console.log(mask[editPosition]);
            isValidInput = isCharacterAllowed(newChar, mask[editPosition]);
            updatedValue = isValidInput
                ? applyNewCharacter(displayValue, newChar, editPosition)
                : displayValue;
        }
        console.log(updatedValue);
        updateDisplayValue(updatedValue);

        requestAnimationFrame(() => {
            if (inputRef.current) {
                const newPosition = isValidInput
                    ? getNextEditablePosition(mask, cursorPosition)
                    : editPosition;
                inputRef.current.setSelectionRange(newPosition, newPosition);
            }
        });
    };

    const handleSelectionToRemove = useCallback((
        cursorPosition: number,
        selectionEnd: number,
    ): void => {
        const newValue = removeSelectedCharacters(displayValue, cursorPosition, selectionEnd, mask);

        updateDisplayValue(newValue);

        requestAnimationFrame(() => {
            if (inputRef.current) {
                const newPosition = getNextEditablePosition(mask, cursorPosition);
                inputRef.current.setSelectionRange(newPosition, newPosition);
            }
        });
    }, [displayValue, mask, updateDisplayValue]);

    const handleBasicRemoval = useCallback((cursorPosition: number): void => {
        const editablePosition = getNextEditablePosition(mask, cursorPosition, 'backward');

        if (editablePosition >= 0 && isEditablePosition(editablePosition, mask)) {
            const newValue = `${displayValue.substring(0, editablePosition)
            }_${displayValue.substring(editablePosition + 1)}`;

            updateDisplayValue(newValue);

            requestAnimationFrame(() => {
                if (inputRef.current) {
                    inputRef.current.setSelectionRange(editablePosition, editablePosition);
                }
            });
        }
    }, [displayValue, mask, updateDisplayValue]);

    const handleArrowNavigation = useCallback((
        keyboardEvent: React.KeyboardEvent<HTMLInputElement>,
        cursorPosition: number,
    ): void => {
        const direction = keyboardEvent.key === 'ArrowLeft' ? 'backward' : 'forward';
        const newPosition = getNextEditablePosition(
            mask,
            keyboardEvent.key === 'ArrowLeft' ? cursorPosition - 1 : cursorPosition + 1,
            direction,
        );

        requestAnimationFrame(() => {
            if (inputRef.current) {
                inputRef.current.setSelectionRange(newPosition, newPosition);
            }
        });
    }, [mask]);

    const copyToClipboard = useCallback((selectedText: string): void => {
        if (selectedText) {
            navigator.clipboard.writeText(selectedText);
        }
    }, []);

    const handleCutAction = useCallback((
        cursorPosition: number,
        selectionEnd: number,
    ): void => {
        const selectedText = extractRawValueFromSelection(displayValue, cursorPosition, selectionEnd, mask);
        copyToClipboard(selectedText);

        const newValue = clearSelectionInDisplayValue(displayValue, cursorPosition, selectionEnd, mask);
        updateDisplayValue(newValue);

        requestAnimationFrame(() => {
            if (inputRef.current) {
                inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
            }
        });
    }, [copyToClipboard, displayValue, mask, updateDisplayValue]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.shiftKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
            return;
        }
        const input = e.currentTarget;
        const cursorPosition = input.selectionStart || 0;
        const selectionEnd = input.selectionEnd || 0;
        const hasSelection = cursorPosition !== selectionEnd;

        console.log(e.key);
        console.log(cursorPosition);
        console.log(selectionEnd);
        if ((e.ctrlKey || e.metaKey) && e.key === 'x' && hasSelection) {
            e.preventDefault();
            handleCutAction(cursorPosition, selectionEnd);
            return;
        }

        if ((e.key === 'Backspace' || e.key === 'Delete') && hasSelection) {
            e.preventDefault();
            handleSelectionToRemove(cursorPosition, selectionEnd);
            return;
        }

        if ((e.key === 'Backspace' || e.key === 'Delete') && !hasSelection) {
            e.preventDefault();
            const charPositionToRemove = e.key === 'Backspace' ? cursorPosition - 1 : cursorPosition;
            handleBasicRemoval(charPositionToRemove);
        }

        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            e.preventDefault();
            handleArrowNavigation(e, cursorPosition);
        }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>): void => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        const rawPastedChars = pastedText.replace(/[^A-Za-z0-9]/g, '');
        const validChars = extractValidChars(rawPastedChars, mask);
        const cursorPosition = e.currentTarget.selectionStart || 0;
        const selectionEnd = e.currentTarget.selectionEnd || 0;

        const newDisplayValue = getFormattedPastedValue(
            cursorPosition,
            selectionEnd,
            displayValue,
            validChars,
            mask,
        );

        updateDisplayValue(newDisplayValue);

        // Calculate where to place the cursor after pasting
        const newCursorPos = getPositionAfterPaste(
            cursorPosition,
            validChars.length,
            newDisplayValue,
            displayValue,
            mask,
        );

        requestAnimationFrame(() => {
            if (inputRef.current) {
                inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
            }
        });
    };

    const dataAttributes = useDataAttributes(otherProps);

    return (
        <Container>
            <MaskContainer aria-hidden="true" isMobile={isMobile}>
                <InputDuplicatedValue>{mask}</InputDuplicatedValue>
            </MaskContainer>
            <TextInput
                data-testid="mask-text-input"
                id={providedId}
                ref={inputRef}
                name={name}
                value={displayValue}
                readOnly={readOnly}
                required={required}
                disabled={disabled}
                hint={hint}
                label={label}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onPaste={handlePaste}
                placeholder={displayValue}
                validationErrorMessage={validationErrorMessage}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
        </Container>
    );
};
