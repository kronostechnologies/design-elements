import { FC, FocusEvent, KeyboardEvent, ReactNode, useCallback, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { useShadowRoot } from 'react-shadow';
import styled from 'styled-components';
import { useAriaConditionalIds } from '../../hooks/use-aria-conditional-ids';
import { useClickOutside } from '../../hooks/use-click-outside';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useDropdown } from '../../hooks/use-dropdown';
import { useId } from '../../hooks/use-id';
import { useListCursor } from '../../hooks/use-list-cursor';
import { useListSearch } from '../../hooks/use-list-search';
import { useTranslation } from '../../i18n/use-translation';
import { type ResolvedTheme } from '../../themes';
import { focus } from '../../utils/css-state';
import { getRootElement, sanitizeId } from '../../utils/dom';
import { isLetterOrNumber } from '../../utils/regex';
import { useDeviceContext } from '../device-context-provider';
import { FieldContainer } from '../field-container';
import { Icon, type IconName } from '../icon';
import { Listbox, type ListboxOption } from '../listbox';
import { ListboxTag, TagValue } from '../listbox/listbox-tag';
import {
    disableNonSelectedOptions,
    findOptionsByValue,
    getDefaultOptions,
    getJoinedValues,
    getNewOptionSelection,
    getOptionLabel,
    getSelectedOptionValues,
    isOptionEnabled,
} from '../listbox/utils';
import { type ToggletipProps } from '../toggletip';
import { type TooltipProps } from '../tooltip';

interface TextboxProps {
    $disabled?: boolean;
    $isMobile: boolean;
    $isMultiselect?: boolean;
    $readOnly?: boolean;
    theme: ResolvedTheme;
    $valid: boolean;
}

function getBackgroundColor({ $disabled, $readOnly, theme }: TextboxProps): string {
    if ($disabled) {
        return theme.component['dropdown-list-input-disabled-background-color'];
    }
    if ($readOnly) {
        return theme.component['dropdown-list-input-readonly-background-color'];
    }

    return theme.component['dropdown-list-input-background-color'];
}

function getBorderColor({
    $disabled,
    $readOnly,
    theme,
    $valid,
}: TextboxProps): string {
    if ($disabled) {
        return theme.component['dropdown-list-input-disabled-border-color'];
    }
    if ($readOnly) {
        return theme.component['dropdown-list-input-readonly-border-color'];
    }
    if (!$valid) {
        return theme.component['dropdown-list-input-error-border-color'];
    }

    return theme.component['dropdown-list-input-border-color'];
}

function getTextColor({ $disabled, $readOnly, theme }: TextboxProps): string {
    if ($disabled) {
        return theme.component['dropdown-list-input-disabled-text-color'];
    }
    if ($readOnly) {
        return theme.component['dropdown-list-input-readonly-text-color'];
    }

    return theme.component['dropdown-list-input-text-color'];
}

const StyledFieldContainer = styled(FieldContainer)`
    position: relative;
`;

interface StyledListboxProps {
    $left?: string;
    $top?: string;
}

const StyledListbox = styled(Listbox)<StyledListboxProps>`
    left: ${(props) => props.$left};
    position: absolute;
    top: ${(props) => props.$top};
    z-index: 99998;
`;

const Textbox = styled.div<TextboxProps>`
    align-items: center;
    background-color: ${getBackgroundColor};
    border: 1px solid ${getBorderColor};
    border-radius: var(--border-radius);
    box-sizing: border-box;
    color: ${getTextColor};
    display: flex;
    justify-content: space-between;
    min-height: ${({ $isMobile }) => ($isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
    padding: ${({ $isMultiselect }) => ($isMultiselect ? '0 var(--spacing-1x) 0 0' : '0 var(--spacing-1x)')};
    text-wrap: none;
    user-select: none;
    width: 100%;

    ${({ $disabled, theme }) => !$disabled && focus({ theme }, { focusType: 'focus' })};
`;

const TextWrapper = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    user-select: none;
    white-space: nowrap;
`;

const TagWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;
    overflow: hidden;
    user-select: none;
`;

const Arrow = styled(Icon)<{ $disabled?: boolean, $readOnly?: boolean }>`
    align-items: center;
    color: ${({ $disabled, theme }) => ($disabled ? theme.component['dropdown-list-arrow-disabled-color'] : theme.component['dropdown-list-arrow-color'])};
    display: ${({ $readOnly }) => ($readOnly ? 'none' : 'flex')};
    flex: none;
    height: var(--size-1x);
    margin-left: auto;
    padding: var(--spacing-half);
    width: var(--size-1x);
`;

const TextIcon = styled(Icon)`
    color: ${({ theme }) => (theme.component['dropdown-list-input-icon-color'])};
    margin-right: var(--spacing-1x);
`;

type Value = string | string[];

export interface DropdownListOption extends ListboxOption {
    label: string;
}

export interface DropdownListProps<M extends boolean | undefined> {
    /**
     * Aria label for the input (used when no visual label is present)
     */
    ariaLabel?: string;
    className?: string;
    /**
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * The default selected option
     */
    defaultValue?: Value;
    /**
     * Disables input
     */
    disabled?: boolean;
    /** Disables default margin */
    noMargin?: boolean;
    id?: string;
    label?: string;
    name?: string;
    options: DropdownListOption[];
    required?: boolean;
    readOnly?: boolean;
    tooltip?: TooltipProps;
    toggletip?: ToggletipProps;
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
    value?: Value;
    hint?: string;
    multiselect?: M;
    maxSelectableOptions?: number;

    /**
     * Display an icon inside the Dropdown control
     */
    iconName?: IconName;

    /**
     * OnClose callback function, called when the dropdown is closed
     */
    onClose?(): void;

    /**
     * OnChange callback function, invoked when options are selected
     */
    onChange?(option: M extends true ? DropdownListOption[] : DropdownListOption): void;
}

export const DropdownList: FC<DropdownListProps<boolean | undefined>> = ({
    ariaLabel,
    className,
    defaultOpen = false,
    defaultValue,
    disabled,
    noMargin,
    id: providedId,
    label,
    onChange,
    onClose,
    options: providedOptions,
    name,
    readOnly,
    required,
    tooltip,
    toggletip,
    valid = true,
    validationErrorMessage,
    value,
    hint,
    multiselect,
    maxSelectableOptions,
    iconName,
    ...otherProps
}) => {
    const { t } = useTranslation('dropdown-list');
    const { device, isMobile } = useDeviceContext();
    const id = useId(providedId);
    const dataAttributes = useDataAttributes(otherProps);
    const shadowRoot = useShadowRoot();

    const [open, setOpen] = useState(defaultOpen);
    const {
        x,
        y,
        refs: { reference: textboxRef, floating: listboxRef, ...refs },
    } = useDropdown<HTMLInputElement>({ open, width: 'reference' });
    const rootElement = getRootElement(shadowRoot);

    const [selectedOptions, setSelectedOptions] = useState<DropdownListOption[] | undefined>(
        () => getDefaultOptions(value ?? defaultValue, providedOptions, multiselect, true),
    );

    const options = useMemo(() => {
        const isMaxSelectableOptionsReached = multiselect
            && maxSelectableOptions
            && selectedOptions
            && selectedOptions.length >= maxSelectableOptions;

        if (isMaxSelectableOptionsReached) {
            return disableNonSelectedOptions(providedOptions, selectedOptions);
        }

        return providedOptions;
    }, [multiselect, maxSelectableOptions, providedOptions, selectedOptions]);

    function toggleOptionSelection(option: DropdownListOption, forceSelected?: boolean): void {
        const newSelectedOptions = getNewOptionSelection(option, selectedOptions, forceSelected);

        setSelectedOptions(newSelectedOptions);
        onChange?.(newSelectedOptions);
    }

    function getLastSelectedOption(
        optionsList: DropdownListOption[] | undefined,
    ): DropdownListOption | undefined {
        const last = (optionsList?.length ?? 0) - 1;

        if (last < 0) {
            return undefined;
        }

        return optionsList?.[last];
    }

    const {
        selectedElement: focusedOption,
        setSelectedElement: setFocusedOption,
        selectPrevious: focusPreviousOption,
        selectNext: focusNextOption,
        selectFirst: focusFirstOption,
        selectLast: focusLastOption,
    } = useListCursor({
        elements: options,
        initialElement: getLastSelectedOption(selectedOptions),
        predicate: isOptionEnabled,
    });

    const [previousValue, setPreviousValue] = useState<Value | undefined>(value);

    if (value !== previousValue) {
        const newOptions = findOptionsByValue(options, value);
        setSelectedOptions(newOptions);
        setFocusedOption(newOptions[0]);
        setPreviousValue(value);
    }

    function openListbox(): void {
        if (disabled || readOnly) {
            return;
        }

        setFocusedOption(getLastSelectedOption(selectedOptions));
        setOpen(true);
    }

    const closeListbox: () => void = useCallback(() => {
        setOpen(false);
        onClose?.();
    }, [onClose]);

    const selectOption: (option: DropdownListOption) => void = useCallback((option) => {
        setSelectedOptions([option]);
        onChange?.(option);
    }, [onChange, setSelectedOptions]);

    const handleClickOutside: () => void = useCallback(() => {
        if (open) {
            if (focusedOption && focusedOption !== selectedOptions?.[0] && !multiselect) {
                selectOption(focusedOption);
            }
            closeListbox();
        }
    }, [closeListbox, focusedOption, open, selectedOptions, multiselect, selectOption]);

    useClickOutside([textboxRef, listboxRef], handleClickOutside);

    function handleTextboxBlur(event: FocusEvent): void {
        if (open && event.relatedTarget !== listboxRef.current) {
            if (focusedOption && focusedOption !== selectedOptions?.[0] && !multiselect) {
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
        if (multiselect) {
            toggleOptionSelection(option);
        } else {
            if (option !== selectedOptions?.[0]) {
                selectOption(option);
            }

            closeListbox();
        }
    }

    const handleFoundOption: (option?: DropdownListOption) => void = useCallback((option) => {
        if (multiselect) {
            setFocusedOption(getLastSelectedOption(selectedOptions));
        } else if (option) {
            setFocusedOption(option);
        }
    }, [setFocusedOption, multiselect, selectedOptions]);

    const {
        handleSearchInput,
    } = useListSearch({
        elements: options,
        focusedElement: focusedOption,
        onFoundElementChange: handleFoundOption,
        searchPropertyAccessor: getOptionLabel,
        predicate: isOptionEnabled,
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
                if (!multiselect) {
                    event.preventDefault();
                }

                if (!open) {
                    openListbox();
                } else {
                    if (focusedOption && focusedOption !== selectedOptions?.[0]) {
                        if (multiselect) {
                            toggleOptionSelection(focusedOption);
                        } else {
                            selectOption(focusedOption);
                        }
                    }

                    if (!multiselect) {
                        closeListbox();
                    }
                }
                break;
            case ' ':
                if (!multiselect) {
                    event.preventDefault();
                }

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

    function handleTagRemove(tag: TagValue): void {
        const removedOption = selectedOptions?.find((option) => option.value === tag.id);

        if (removedOption !== undefined) {
            toggleOptionSelection(removedOption);
        }
    }

    const renderSelectedOptionsTags = (): ReactNode => selectedOptions?.map((option: DropdownListOption) => (
        <ListboxTag
            key={option.value}
            disabled={disabled}
            option={option}
            readOnly={readOnly}
            handleTagRemove={handleTagRemove}
            textboxRef={textboxRef}
        />
    ));

    const ariaDescribedBy = useAriaConditionalIds([
        { id: `${id}_hint`, include: !!hint },
        { id: `${id}_invalid`, include: !valid },
    ]);

    const ariaLabelledBy = useAriaConditionalIds(
        [
            { id: `${id}_label` },
            ...selectedOptions?.map(
                (option) => ({ id: `${id}_listbox_${option.value}_label` }),
            ) ?? [],
        ],
    );

    const firstSelectedOption = selectedOptions?.[0];

    return (
        <StyledFieldContainer
            className={className}
            noMargin={noMargin}
            fieldId={id}
            label={label}
            required={required}
            tooltip={tooltip}
            toggletip={toggletip}
            valid={valid}
            validationErrorMessage={validationErrorMessage || t('validationErrorMessage')}
            hint={hint}
        >
            <Textbox
                aria-label={!label ? ariaLabel || t('inputAriaLabel') : undefined}
                aria-activedescendant={open && focusedOption ? sanitizeId(`${id}_${focusedOption.value}`) : undefined}
                aria-controls={`${id}_listbox`}
                aria-describedby={ariaDescribedBy}
                aria-expanded={open}
                aria-invalid={!valid ? 'true' : 'false'}
                aria-labelledby={ariaLabelledBy}
                aria-readonly={readOnly ? 'true' : 'false'}
                aria-required={required ? 'true' : 'false'}
                data-testid="textbox"
                id={id}
                $isMobile={isMobile}
                $isMultiselect={multiselect}
                $disabled={disabled}
                onBlur={handleTextboxBlur}
                onClick={handleTextboxClick}
                onKeyDown={handleTextboxKeyDown}
                ref={refs.setReference}
                $readOnly={readOnly}
                role="combobox"
                tabIndex={0}
                $valid={valid}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            >
                {iconName && (
                    <TextIcon
                        aria-hidden="true"
                        name={iconName}
                        size={isMobile ? '24' : '16'}
                        data-testid="textbox-icon"
                    />
                )}
                <input type="hidden" name={name} value={getJoinedValues(selectedOptions)} data-testid="input" />
                {multiselect
                    ? <TagWrapper data-testid="tag-wrapper">{renderSelectedOptionsTags()}</TagWrapper>
                    : <TextWrapper>{firstSelectedOption?.label ?? ''}</TextWrapper>}
                <Arrow
                    aria-hidden="true"
                    data-testid="arrow"
                    $disabled={disabled}
                    $readOnly={readOnly}
                    name={open ? 'chevronUp' : 'chevronDown'}
                    size={device === 'mobile' ? '24' : '16'}
                />
            </Textbox>

            {open && createPortal(
                <StyledListbox
                    ariaLabelledBy={`${id}_label`}
                    ref={refs.setFloating}
                    data-testid="listbox"
                    focusable={false}
                    focusedValue={focusedOption?.value}
                    id={`${id}_listbox`}
                    onOptionClick={handleListboxOptionClick}
                    options={options}
                    value={getSelectedOptionValues(selectedOptions)}
                    multiselect={multiselect}
                    $left={`${x}px`}
                    $top={`${y}px`}
                />,
                rootElement,
            )}
        </StyledFieldContainer>
    );
};
