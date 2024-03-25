import {
    FocusEvent,
    KeyboardEvent,
    useCallback,
    useRef,
    useState,
    VoidFunctionComponent,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { isLetterOrNumber } from '../../utils/regex';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { Icon } from '../icon/icon';
import { Listbox, ListboxOption } from '../listbox/listbox';
import { TooltipProps } from '../tooltip/tooltip';
import { AriaLabelsProps, useAriaLabels } from '../../hooks/use-aria';
import { useId } from '../../hooks/use-id';
import { useListCursor } from '../../hooks/use-list-cursor';
import { useClickOutside } from '../../hooks/use-click-outside';
import { useListSearch } from '../../hooks/use-list-search';
import { sanitizeId } from '../../utils/dom';

interface TextboxProps {
    $disabled?: boolean;
    $isMobile: boolean;
    theme: ResolvedTheme;
    $valid: boolean;
    value: string;
}

export interface DropdownListOption extends ListboxOption {
    label: string;
}

function getBorderColor({ $disabled, theme, $valid }: TextboxProps): string {
    if ($disabled) {
        return theme.greys['mid-grey'];
    }
    if (!$valid) {
        return theme.notifications['alert-2.1'];
    }

    return theme.greys['dark-grey'];
}

const StyledFieldContainer = styled(FieldContainer)`
    position: relative;
`;

const StyledListbox = styled(Listbox)`
    position: absolute;
    width: 100%;
`;

const Textbox = styled.div<TextboxProps>`
    align-items: center;
    background-color: ${({ $disabled, theme }) => ($disabled ? theme.greys['light-grey'] : theme.greys.white)};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    ${({ $disabled, theme }) => $disabled && `color: ${theme.greys['mid-grey']}`};
    display: flex;
    height: ${({ $isMobile }) => ($isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
    justify-content: space-between;
    padding: 0 var(--spacing-1x);
    text-wrap: none;
    user-select: none;
    width: 100%;

    ${({ theme }) => focus({ theme }, true)};
`;

const TextWrapper = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
`;

const Arrow = styled(Icon)<{ $disabled?: boolean }>`
    align-items: center;
    color: ${({ $disabled, theme }) => ($disabled ? theme.greys['mid-grey'] : theme.greys['dark-grey'])};
    display: flex;
    flex: none;
    height: var(--size-1x);
    margin-left: auto;
    padding: var(--spacing-half);
    width: var(--size-1x);
`;

export interface DropdownListProps extends AriaLabelsProps {
    className?: string;
    /**
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * The default selected option
     */
    defaultValue?: string;
    /**
     * Disables input
     */
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    id?: string;
    name?: string;
    options: DropdownListOption[];
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
     * Set the selected value
     */
    value?: string;
    hint?: string;

    /**
     * OnChange callback function, invoked when an option is selected
     */
    onChange?(option: DropdownListOption): void;
}

const optionPredicate: (option: DropdownListOption) => boolean = (option) => !option.disabled;
const searchPropertyAccessor: (option: DropdownListOption) => string = (option) => option.label;

export const DropdownList: VoidFunctionComponent<DropdownListProps> = ({
    id: providedId,
    label,
    ariaLabel,
    ariaLabelledBy,
    ariaDescribedBy,
    className,
    defaultOpen = false,
    defaultValue,
    disabled,
    noMargin,
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
    const { t } = useTranslation('dropdown-list');
    const { device, isMobile } = useDeviceContext();
    const fieldId = useId(providedId);
    const dataAttributes = useDataAttributes(otherProps);

    const textboxRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(defaultOpen);

    function findOptionByValue(searchValue?: string): DropdownListOption | undefined {
        return options.find((option) => option.value === searchValue);
    }

    function getDefaultOption(): DropdownListOption | undefined {
        let defaultOption: DropdownListOption | undefined;

        if (value !== undefined || defaultValue !== undefined) {
            defaultOption = findOptionByValue(value ?? defaultValue);
        }

        if (defaultOption === undefined) {
            defaultOption = options.find(optionPredicate);
        }

        return defaultOption;
    }

    const [selectedOption, setSelectedOption] = useState<DropdownListOption | undefined>(
        () => getDefaultOption(),
    );

    const {
        selectedElement: focusedOption,
        setSelectedElement: setFocusedOption,
        selectPrevious: focusPreviousOption,
        selectNext: focusNextOption,
        selectFirst: focusFirstOption,
        selectLast: focusLastOption,
    } = useListCursor({
        elements: options,
        initialElement: selectedOption,
        predicate: optionPredicate,
    });

    const [previousValue, setPreviousValue] = useState<string | undefined>(value);

    if (value !== previousValue) {
        const newOption = findOptionByValue(value);
        setSelectedOption(newOption);
        setFocusedOption(newOption);
        setPreviousValue(value);
    }

    function openListbox(): void {
        if (disabled) {
            return;
        }

        if (!focusedOption && selectedOption) {
            setFocusedOption(selectedOption);
        }

        setOpen(true);
    }

    const closeListbox: () => void = useCallback(() => {
        setOpen(false);
    }, []);

    const selectOption: (option: DropdownListOption) => void = useCallback((option) => {
        setSelectedOption(option);
        onChange?.(option);
    }, [onChange, setSelectedOption]);

    const handleClickOutside: () => void = useCallback(() => {
        if (open) {
            if (focusedOption && focusedOption !== selectedOption) {
                selectOption(focusedOption);
            }
            closeListbox();
        }
    }, [closeListbox, focusedOption, open, selectOption, selectedOption]);

    useClickOutside([textboxRef, listboxRef], handleClickOutside);

    function handleTextboxBlur(event: FocusEvent): void {
        if (open && event.relatedTarget !== listboxRef.current) {
            if (focusedOption && focusedOption !== selectedOption) {
                selectOption(focusedOption);
            }
            closeListbox();
        }
    }

    function handleTextboxClick(): void {
        if (open) {
            closeListbox();
        } else {
            openListbox();
        }
    }

    function handleListboxOptionClick(option: DropdownListOption): void {
        if (optionPredicate(option)) {
            if (option !== focusedOption) {
                setFocusedOption(option);
            }

            if (option !== selectedOption) {
                selectOption(option);
            }

            closeListbox();
        }
    }

    const handleFoundOption: (option?: DropdownListOption) => void = useCallback((option) => {
        if (option) {
            setFocusedOption(option);
        }
    }, [setFocusedOption]);

    const {
        handleSearchInput,
    } = useListSearch({
        elements: options,
        focusedElement: focusedOption,
        onFoundElementChange: handleFoundOption,
        searchPropertyAccessor,
        predicate: optionPredicate,
    });

    function handleTextboxKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                if (!open) {
                    openListbox();
                } else {
                    focusNextOption();
                }
                break;
            case 'ArrowUp':
                event.preventDefault();
                if (!open) {
                    openListbox();
                } else {
                    focusPreviousOption();
                }
                break;
            case 'Home':
                event.preventDefault();
                if (!open) {
                    openListbox();
                }
                focusFirstOption();
                break;
            case 'End':
                event.preventDefault();
                if (!open) {
                    openListbox();
                }
                focusLastOption();
                break;
            case 'Enter':
                event.preventDefault();
                if (!open) {
                    openListbox();
                } else {
                    if (focusedOption && focusedOption !== selectedOption) {
                        selectOption(focusedOption);
                    }
                    closeListbox();
                }
                break;
            case ' ':
                event.preventDefault();
                if (!open) {
                    openListbox();
                }
                break;
            case 'Escape':
                if (open) {
                    setFocusedOption(undefined);
                    closeListbox();
                }
                break;
            default:
                if (isLetterOrNumber(event.key)) {
                    event.preventDefault();
                    if (!open) {
                        openListbox();
                    }
                    handleSearchInput(event.key);
                }
        }
    }

    const { processedLabels } = useAriaLabels({
        inputId: fieldId,
        label,
        ariaLabel,
        ariaLabelledBy,
        ariaDescribedBy,
        hasHint: !!hint,
        isValid: valid,
    });

    return (
        <StyledFieldContainer
            className={className}
            noMargin={noMargin}
            fieldId={fieldId}
            label={processedLabels.label}
            required={required}
            tooltip={tooltip}
            valid={valid}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            hint={hint}
        >
            <Textbox
                id={fieldId}
                aria-label={processedLabels.ariaLabel || t('inputAriaLabel')}
                aria-labelledby={processedLabels.ariaLabelledBy}
                aria-describedby={processedLabels.ariaDescribedBy}
                aria-activedescendant={open && focusedOption ? sanitizeId(`${fieldId}_${focusedOption.value}`) : undefined}
                aria-controls={`${fieldId}_listbox`}
                aria-expanded={open}
                aria-invalid={!valid ? 'true' : 'false'}
                aria-required={required ? 'true' : 'false'}
                data-testid="textbox"
                $isMobile={isMobile}
                $disabled={disabled}
                onBlur={handleTextboxBlur}
                onClick={handleTextboxClick}
                onKeyDown={handleTextboxKeyDown}
                ref={textboxRef}
                role="combobox"
                tabIndex={0}
                $valid={valid}
                value={selectedOption?.value ?? ''}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            >
                <input
                    aria-label={processedLabels.ariaLabel || t('inputAriaLabel')}
                    aria-labelledby={processedLabels.ariaLabelledBy}
                    aria-describedby={processedLabels.ariaDescribedBy}
                    type="hidden"
                    name={name}
                    value={selectedOption?.value}
                    data-testid="input"
                />
                <TextWrapper>{selectedOption?.label ?? ''}</TextWrapper>
                <Arrow
                    aria-hidden="true"
                    data-testid="arrow"
                    $disabled={disabled}
                    name={open ? 'chevronUp' : 'chevronDown'}
                    size={device === 'mobile' ? '24' : '16'}
                />
            </Textbox>

            {open && (
                <StyledListbox
                    ariaLabelledBy={`${fieldId}_label`}
                    ref={listboxRef}
                    data-testid="listbox"
                    focusable={false}
                    focusedValue={focusedOption?.value}
                    id={`${fieldId}_listbox`}
                    onOptionClick={handleListboxOptionClick}
                    options={options}
                    value={[selectedOption?.value ?? '']}
                />
            )}
        </StyledFieldContainer>
    );
};
