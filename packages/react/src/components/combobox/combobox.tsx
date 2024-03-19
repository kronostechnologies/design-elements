import {
    ChangeEvent,
    FocusEvent,
    KeyboardEvent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    VoidFunctionComponent,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { IconButton } from '../buttons/icon-button';
import { Listbox, ListboxOption } from '../listbox/listbox';
import { TooltipProps } from '../tooltip/tooltip';
import { useAriaConditionalIds } from '../../hooks/use-aria-conditional-ids';
import { useId } from '../../hooks/use-id';
import { useListCursor } from '../../hooks/use-list-cursor';
import { useClickOutside } from '../../hooks/use-click-outside';
import { sanitizeId } from '../../utils/dom';
import { stripDiacritics } from '../../utils/string';

interface TextboxProps {
    $disabled?: boolean;
    $isMobile: boolean;
    theme: ResolvedTheme;
    $valid: boolean;
    value: string;
}

export interface ComboboxOption extends Omit<ListboxOption, 'label'> {}

function getBorderColor({ $disabled, theme, $valid }: TextboxProps): string {
    if ($disabled) {
        return theme.component['combobox-disabled-border-color'];
    }
    if (!$valid) {
        return theme.component['combobox-error-border-color'];
    }

    return theme.component['combobox-border-color'];
}

const StyledFieldContainer = styled(FieldContainer)`
    position: relative;
`;

const StyledContainer = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
`;

const StyledListbox = styled(Listbox)`
    position: absolute;
    width: 100%;
`;

const Textbox = styled.input<TextboxProps>`
    background-color: ${({ $disabled, theme }) => ($disabled ? theme.component['combobox-disabled-background-color'] : theme.component['combobox-background-color'])};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${({ $disabled, theme }) => $disabled && theme.component['combobox-disabled-text-color']};
    font-size: ${({ $isMobile }) => ($isMobile ? '1rem' : '0.875rem')};
    height: ${({ $isMobile }) => ($isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
    padding: 0 var(--spacing-1x);
    width: 100%;

    ${({ theme }) => focus({ theme }, true)};
`;

const ArrowButton = styled(IconButton)<{ disabled?: boolean }>`
    align-items: center;
    background-color: ${({ theme }) => theme.component['combobox-arrow-button-background-color']};
    border: 0;
    color: ${({ disabled, theme }) => theme.component[`combobox-arrow-button${disabled ? '-disabled' : ''}-icon-color`]};    display: flex;
    height: var(--size-1x);
    padding: var(--spacing-half);
    position: absolute;
    right: var(--spacing-half);
    width: var(--size-1x);

    &:hover {
        background-color: ${({ theme }) => theme.component['combobox-arrow-button-hover-background-color']};
    }
`;

type AutoCompleteMode = 'none' | 'inline' | 'list' | 'both';

interface ComboboxProps {
    /**
     * Aria label for the input (used when no visual label is present)
     */
    ariaLabel?: string;
    /**
     * Sets the autocomplete mode.
     * - 'none': disables autocomplete, the component behaves like a normal textbox with list of suggestions
     * - 'inline': autocompletes the text input
     * - 'list': shows and filters the listbox options when text is entered
     * - 'both': enables both inline and list autocompletion
     * @default 'none'
     */
    autoComplete?: AutoCompleteMode;
    className?: string;
    /**
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * The default value (and selected option when autoComplete is 'list' or 'both')
     */
    defaultValue?: string;
    /**
     * Disables the input
     */
    disabled?: boolean;
    /**
     * Disables the default margin
     * */
    noMargin?: boolean;
    id?: string;
    label?: string;
    name?: string;
    options: ComboboxOption[];
    required?: boolean;
    tooltip?: TooltipProps;
    /**
     * Sets input validity
     */
    valid?: boolean;
    /**
     * Sets error message
     * @default You must select an option
     */
    validationErrorMessage?: string;
    /**
     * Sets the selected value (makes the component controlled)
     */
    value?: string;
    hint?: string;

    /**
     * OnChange callback function, invoked when the value is changed
     */
    onChange?(value: string): void;
}

const optionPredicate: (option: ComboboxOption) => boolean = (option) => !option.disabled;

export const Combobox: VoidFunctionComponent<ComboboxProps> = ({
    ariaLabel,
    autoComplete = 'none',
    className,
    defaultOpen = false,
    defaultValue,
    disabled,
    noMargin,
    id: providedId,
    label,
    onChange,
    options,
    name,
    required,
    tooltip,
    valid = true,
    validationErrorMessage,
    value,
    hint,
    ...otherProps
}) => {
    const { t } = useTranslation('combobox');
    const { isMobile } = useDeviceContext();
    const id = useId(providedId);
    const dataAttributes = useDataAttributes(otherProps);

    const hasAutoComplete: (mode: AutoCompleteMode) => boolean = useCallback(
        (mode) => autoComplete === mode || autoComplete === 'both',
        [autoComplete],
    );

    const textboxRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const arrowButtonRef = useRef<HTMLButtonElement>(null);

    const [open, setOpen] = useState(defaultOpen);

    const [inputValue, setInputValue] = useState(value ?? defaultValue ?? '');

    const filteredOptions = useMemo(() => {
        if (hasAutoComplete('list')) {
            return options.filter(
                (option) => option.value.toLowerCase().startsWith(inputValue.toLowerCase()),
            );
        }

        return options;
    }, [hasAutoComplete, inputValue, options]);

    function findOptionByValue(searchValue?: string): ComboboxOption | undefined {
        return options.find((option) => option.value.toLowerCase() === searchValue?.toLowerCase());
    }

    const [suggestedInputValue, setSuggestedInputValue] = useState('');

    function getSuggestedOption(searchValue: string): ComboboxOption | undefined {
        return options.find(
            (option) => stripDiacritics(option.value)
                .toLowerCase()
                .startsWith(
                    stripDiacritics(searchValue).toLowerCase(),
                ),
        );
    }

    const changeInputValue: (newValue: string) => void = useCallback((newValue) => {
        setInputValue(newValue);
        setSuggestedInputValue('');

        onChange?.(newValue);
    }, [onChange]);

    const [selectedOption, setSelectedOption] = useState<ComboboxOption | undefined>(
        () => findOptionByValue(value ?? defaultValue),
    );

    const {
        selectedElement: focusedOption,
        setSelectedElement: setFocusedOption,
        selectPrevious: focusPreviousOption,
        selectNext: focusNextOption,
        selectFirst: focusFirstOption,
        selectLast: focusLastOption,
    } = useListCursor({
        elements: filteredOptions,
        initialElement: selectedOption,
        predicate: optionPredicate,
        wrapAround: true,
    });

    const [previousValue, setPreviousValue] = useState<string | undefined>(value);

    if (value !== previousValue) {
        const newOption = findOptionByValue(value);

        if (newOption) {
            setInputValue(newOption.value);
            setSelectedOption(newOption);
            setSuggestedInputValue('');
            setFocusedOption(newOption);
        } else {
            setInputValue(value ?? '');
        }

        setPreviousValue(value);
    }

    function openListbox(): void {
        if (disabled) {
            return;
        }

        if (selectedOption && (!focusedOption || !filteredOptions.includes(focusedOption))) {
            setFocusedOption(selectedOption);
        }

        setOpen(true);
    }

    const closeListbox: () => void = useCallback(() => {
        setFocusedOption(undefined);
        setOpen(false);
    }, [setFocusedOption]);

    if (open && filteredOptions.length === 0) {
        closeListbox();
    }

    const handleClickOutside: () => void = useCallback(() => {
        if (open) {
            if (focusedOption && focusedOption !== selectedOption) {
                changeInputValue(focusedOption.value);
                setSelectedOption(focusedOption);
            }
            closeListbox();
        }
    }, [closeListbox, focusedOption, open, changeInputValue, selectedOption]);

    useClickOutside([textboxRef, listboxRef, arrowButtonRef], handleClickOutside);

    function handleTextboxBlur(event: FocusEvent): void {
        const outsideComponent = event.relatedTarget !== listboxRef.current
            && event.relatedTarget !== arrowButtonRef.current;

        if (open && outsideComponent) {
            if (focusedOption && focusedOption !== selectedOption) {
                changeInputValue(focusedOption.value);
                setSelectedOption(focusedOption);
            }
            closeListbox();
        }
    }

    function handleTextboxFocus(): void {
        if (!open && selectedOption) {
            openListbox();
        }
    }

    function handleButtonClick(): void {
        if (open) {
            closeListbox();
        } else {
            openListbox();
        }

        textboxRef.current?.focus();
    }

    function handleListboxOptionClick(option: ComboboxOption): void {
        if (optionPredicate(option)) {
            if (option !== focusedOption) {
                setFocusedOption(option);
            }

            if (option !== selectedOption) {
                changeInputValue(option.value);
                setSelectedOption(option);
            }

            closeListbox();
        }

        textboxRef.current?.focus();
    }

    // With inline autocomplete, the suggestion gets highlighted only when text is entered in
    // the textbox (not when the user navigates the listbox with the keyboard).
    const suggestionSource = useRef<'listbox' | 'textbox'>();

    // Prevent showing the inline autocomplete when the user is deleting text in the input
    const hideInlineAutoComplete = useRef(false);

    function handleTextboxKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        let newFocusedOption: ComboboxOption | undefined;

        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (!open) {
                    openListbox();
                    focusFirstOption();
                } else {
                    newFocusedOption = focusedOption ? focusNextOption() : focusFirstOption();

                    if (newFocusedOption && hasAutoComplete('inline')) {
                        setSuggestedInputValue(newFocusedOption.value);
                        suggestionSource.current = 'listbox';
                    }
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (!open) {
                    openListbox();
                    focusLastOption();
                } else {
                    newFocusedOption = focusedOption ? focusPreviousOption() : focusLastOption();

                    if (newFocusedOption && hasAutoComplete('inline')) {
                        setSuggestedInputValue(newFocusedOption.value);
                        suggestionSource.current = 'listbox';
                    }
                }
                break;
            case 'Enter':
                event.preventDefault();
                if (!open) {
                    openListbox();
                } else {
                    if (focusedOption && focusedOption !== selectedOption) {
                        changeInputValue(focusedOption.value);
                        setSelectedOption(focusedOption);
                    }
                    closeListbox();
                }
                break;
            case 'Escape':
                if (open) {
                    closeListbox();
                } else {
                    changeInputValue('');
                    setSelectedOption(undefined);
                }
                break;
            case 'Backspace':
            case 'Delete':
                hideInlineAutoComplete.current = true;
                break;
        }
    }

    function handleTextboxChange(event: ChangeEvent<HTMLInputElement>): void {
        if (!open) {
            openListbox();
        }

        const newInputValue = event.target.value;
        changeInputValue(newInputValue);

        // Always clear the focused option to prevent unwanted selection on textbox blur
        setSuggestedInputValue('');
        setFocusedOption(undefined);

        if (hasAutoComplete('inline') && !hideInlineAutoComplete.current) {
            const newSuggestedOption = getSuggestedOption(newInputValue);
            setSuggestedInputValue(newSuggestedOption?.value ?? '');

            if (newSuggestedOption) {
                suggestionSource.current = 'textbox';
                setFocusedOption(newSuggestedOption);
            }
        } else {
            hideInlineAutoComplete.current = false;
        }

        // Select option if the input text is an exact match
        setSelectedOption(findOptionByValue(newInputValue));
    }

    useEffect(() => {
        if (suggestionSource.current !== 'textbox') {
            return;
        }

        if (suggestedInputValue.length > inputValue.length) {
            textboxRef.current?.setSelectionRange(inputValue.length, suggestedInputValue.length);
        } else if (textboxRef.current?.selectionStart === inputValue.length) {
            textboxRef.current?.setSelectionRange(inputValue.length, inputValue.length);
        }
    }, [inputValue.length, suggestedInputValue.length]);

    const ariaDescribedBy = useAriaConditionalIds([
        { id: `${id}_hint`, include: !!hint },
        { id: `${id}_invalid`, include: !valid },
    ]);

    return (
        <StyledFieldContainer
            className={className}
            noMargin={noMargin}
            fieldId={id}
            label={label}
            required={required}
            tooltip={tooltip}
            valid={valid}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            hint={hint}
        >
            <StyledContainer>
                <Textbox
                    aria-label={!label ? ariaLabel || t('inputAriaLabel') : undefined}
                    aria-activedescendant={open && focusedOption ? sanitizeId(`${id}_${focusedOption.value}`) : undefined}
                    aria-autocomplete={autoComplete}
                    aria-controls={`${id}_listbox`}
                    aria-describedby={ariaDescribedBy}
                    aria-expanded={open}
                    aria-invalid={!valid ? 'true' : 'false'}
                    aria-required={required ? 'true' : 'false'}
                    data-testid="textbox"
                    id={id}
                    $isMobile={isMobile}
                    $disabled={disabled}
                    disabled={disabled}
                    name={name}
                    onBlur={handleTextboxBlur}
                    onChange={handleTextboxChange}
                    onFocus={handleTextboxFocus}
                    onKeyDown={handleTextboxKeyDown}
                    ref={textboxRef}
                    role="combobox"
                    tabIndex={0}
                    $valid={valid}
                    value={suggestedInputValue || inputValue}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                <ArrowButton
                    aria-label={t('showOptions', { label: label || ariaLabel })}
                    buttonType="tertiary"
                    data-testid="arrow"
                    disabled={disabled}
                    focusable={false}
                    iconName={open ? 'chevronUp' : 'chevronDown'}
                    onClick={handleButtonClick}
                    ref={arrowButtonRef}
                    type="button"
                />
            </StyledContainer>

            {open && (
                <StyledListbox
                    ariaLabelledBy={`${id}_label`}
                    ref={listboxRef}
                    data-testid="listbox"
                    focusable={false}
                    focusedValue={focusedOption?.value}
                    id={`${id}_listbox`}
                    onOptionClick={handleListboxOptionClick}
                    options={filteredOptions}
                    value={[selectedOption?.value ?? '']}
                />
            )}
        </StyledFieldContainer>
    );
};
