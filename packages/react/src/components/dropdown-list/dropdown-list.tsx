import {
    FocusEvent,
    KeyboardEvent,
    useCallback,
    useRef,
    useState,
    VoidFunctionComponent,
    ReactNode,
    useEffect,
} from 'react';
import { createPortal } from 'react-dom';
import { useShadowRoot } from 'react-shadow';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes';
import { focus } from '../../utils/css-state';
import { isLetterOrNumber } from '../../utils/regex';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { Icon, IconName } from '../icon/icon';
import { Listbox, ListboxOption } from '../listbox/listbox';
import { ToggletipProps } from '../toggletip/toggletip';
import { TooltipProps } from '../tooltip/tooltip';
import { useAriaConditionalIds } from '../../hooks/use-aria-conditional-ids';
import { useId } from '../../hooks/use-id';
import { useListCursor } from '../../hooks/use-list-cursor';
import { useClickOutside } from '../../hooks/use-click-outside';
import { useListSearch } from '../../hooks/use-list-search';
import { sanitizeId } from '../../utils/dom';
import { unique } from '../../utils/array';
import { Tag } from '../tag/tag';
import { findOptionsByValue } from '../listbox/listbox-option';

interface TextboxProps {
    $disabled?: boolean;
    $isMobile: boolean;
    $isMultiselect?: boolean;
    $readOnly?: boolean;
    theme: ResolvedTheme;
    $valid: boolean;
    value: string;
}

export interface DropdownListOption extends ListboxOption {
    label: string;
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

function getBorderColor({ $disabled, $readOnly, theme, $valid }: TextboxProps): string {
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
    $left?: number;
    $top?: number;
    $width?: number;
}

const StyledListbox = styled(Listbox)<StyledListboxProps>`
    left: ${(props: StyledListboxProps) => `${props.$left}px`};
    margin-top: var(--spacing-half);
    position: absolute;
    top: ${(props) => `${props.$top}px`};
    width: ${(props) => (props.$width ? `${props.$width}px` : '100%')};
    z-index: 99999;
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

    ${focus};
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
    user-select: none;
`;

const ListBoxTag = styled(Tag)`
    margin: 2px;

    & + & {
        margin-left: 2px;
    }
`;

const Arrow = styled(Icon)<{ $disabled?: boolean }>`
    align-items: center;
    color: ${({ $disabled, theme }) => ($disabled ? theme.component['dropdown-list-arrow-disabled-color'] : theme.component['dropdown-list-arrow-color'])};
    display: flex;
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

export interface TagValue {
    id?: string;
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

    /**
     * Display an icon inside the Dropdown control
     */
    iconName?: IconName;

    /**
     * OnChange callback function, invoked when options are selected
     */
    onChange?(option: M extends true ? DropdownListOption[] : DropdownListOption): void;
}

const optionPredicate: (option: DropdownListOption) => boolean = (option) => !option.disabled;
const searchPropertyAccessor: (option: DropdownListOption) => string = (option) => option.label;

function getRootElement(shadowRoot: ShadowRoot | null): Element {
    if (shadowRoot) {
        return shadowRoot.getRootNode() as unknown as Element;
    }

    return document.body;
}

export const DropdownList: VoidFunctionComponent<DropdownListProps<boolean | undefined>> = ({
    ariaLabel,
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
    readOnly,
    required,
    tooltip,
    toggletip,
    valid = true,
    validationErrorMessage,
    value,
    hint,
    multiselect,
    iconName,
    ...otherProps
}) => {
    const { t } = useTranslation('dropdown-list');
    const { device, isMobile } = useDeviceContext();
    const id = useId(providedId);
    const dataAttributes = useDataAttributes(otherProps);
    const shadowRoot = useShadowRoot();

    const textboxRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(defaultOpen);
    const [listboxPosition, setListboxPosition] = (
        useState({ top: 0, left: 0, width: 0 })
    );
    const rootElement = getRootElement(shadowRoot);

    function getDefaultOptions(): DropdownListOption[] | undefined {
        let defaultOptions: DropdownListOption[] | undefined;

        if (value !== undefined || defaultValue !== undefined) {
            defaultOptions = findOptionsByValue(options, value ?? defaultValue);
        }

        if (defaultOptions === undefined && !multiselect) {
            defaultOptions = [options.find(optionPredicate) ?? { value: '', label: '' }];
        }

        return defaultOptions;
    }

    const [selectedOptions, setSelectedOptions] = useState<DropdownListOption[] | undefined>(
        () => getDefaultOptions(),
    );

    function toggleOptionSelection(option: DropdownListOption, forceSelected?: boolean): void {
        const newSelectedOptions = !selectedOptions?.includes(option) || forceSelected
            ? unique([...selectedOptions ?? [], option])
            : selectedOptions?.filter((opt) => opt !== option);
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
        predicate: optionPredicate,
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

        if (textboxRef.current) {
            const rect = textboxRef.current.getBoundingClientRect();
            setListboxPosition({
                top: rect.bottom + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
            });
        }

        setFocusedOption(getLastSelectedOption(selectedOptions));
        setOpen(true);
    }

    useEffect(() => {
        function updatePosition(): void {
            if (open && textboxRef.current) {
                const rect = textboxRef.current.getBoundingClientRect();
                setListboxPosition({
                    top: rect.bottom + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                });
            }
        }

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [open]);

    const closeListbox: () => void = useCallback(() => {
        setOpen(false);
    }, []);

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
        if (optionPredicate(option)) {
            if (multiselect) {
                toggleOptionSelection(option);
            } else {
                if (option !== selectedOptions?.[0]) {
                    selectOption(option);
                }

                closeListbox();
            }
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
        <ListBoxTag
            aria-hidden="true"
            data-testid={`listboxtag-${option.value}`}
            key={option.value}
            onRemove={readOnly ? undefined : handleTagRemove}
            value={{ id: option.value, label: option.label }}
        />
    ));

    const getListboxSelectedOptionValues = (): string[] | undefined => selectedOptions?.map(
        (option) => option.value ?? '',
    );

    function getValues(): string {
        return getListboxSelectedOptionValues()?.join('|') ?? '';
    }

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
                ref={textboxRef}
                $readOnly={readOnly}
                role="combobox"
                tabIndex={0}
                $valid={valid}
                value={getValues()}
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
                <input type="hidden" name={name} value={getValues()} data-testid="input" />
                {multiselect
                    ? <TagWrapper data-testid="tag-wrapper">{renderSelectedOptionsTags()}</TagWrapper>
                    : <TextWrapper>{firstSelectedOption?.label ?? ''}</TextWrapper>}
                <Arrow
                    aria-hidden="true"
                    data-testid="arrow"
                    $disabled={disabled}
                    name={open ? 'chevronUp' : 'chevronDown'}
                    size={device === 'mobile' ? '24' : '16'}
                />
            </Textbox>

            {open && createPortal(
                <StyledListbox
                    ariaLabelledBy={`${id}_label`}
                    ref={listboxRef}
                    data-testid="listbox"
                    focusable={false}
                    focusedValue={focusedOption?.value}
                    id={`${id}_listbox`}
                    onOptionClick={handleListboxOptionClick}
                    options={options}
                    value={getListboxSelectedOptionValues()}
                    multiselect={multiselect}
                    $left={listboxPosition.left}
                    $top={listboxPosition.top}
                    $width={listboxPosition.width}
                />,
                rootElement,
            )}
        </StyledFieldContainer>
    );
};
