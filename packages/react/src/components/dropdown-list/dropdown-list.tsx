import {
    FC,
    FocusEvent,
    KeyboardEvent,
    ReactNode,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    VoidFunctionComponent,
} from 'react';
import { createPortal } from 'react-dom';
import { useShadowRoot } from 'react-shadow';
import styled from 'styled-components';
import { useAriaConditionalIds } from '../../hooks/use-aria-conditional-ids';
import { useClickOutside } from '../../hooks/use-click-outside';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useId } from '../../hooks/use-id';
import { useListCursor } from '../../hooks/use-list-cursor';
import { useListSearch } from '../../hooks/use-list-search';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { findNearestRelativeParent, getRootElement, sanitizeId } from '../../utils/dom';
import { isLetterOrNumber } from '../../utils/regex';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldContainer } from '../field-container/field-container';
import { Icon, IconName } from '../icon/icon';
import { Listbox } from '../listbox/listbox';
import { findOptionsByValue } from '../listbox/listbox-option';
import { Tag } from '../tag/tag';
import { ToggletipProps } from '../toggletip/toggletip';
import { Tooltip, TooltipProps } from '../tooltip/tooltip';
import {
    addUniqueOption,
    disableNonSelectedOptions,
    getDefaultOptions,
    getOptionLabel,
    isOptionEnabled,
    isOptionSelected,
    removeOption,
} from './utils/dropdown-list-utils';
import { DropdownListOption } from './dropdown-list-option';
import { Overflow, useOverflow } from '../../hooks/use-overflow';

interface TextboxProps {
    $disabled?: boolean;
    $isMobile: boolean;
    $isMultiselect?: boolean;
    $readOnly?: boolean;
    theme: ResolvedTheme;
    $valid: boolean;
    value: string;
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

    ${({ theme }) => focus({ theme }, { focusType: 'focus' })};
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

const TagTooltipWrapper = styled.div`
    overflow: hidden;
    [role='tooltip'] {
        z-index: 99999;
    }
`;

const TagTooltip = styled(Tooltip)`
    overflow: hidden;
    width: auto;
`;

const StyledTag = styled(Tag)`
    margin: 2px;
    overflow: hidden;

    & + & {
        margin-left: 2px;
    }
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

export interface TagValue {
    id?: string;
    label: string;
}

interface ListboxPosition {
    left: number;
    top: number;
    width: number;
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

function getListboxPosition(textbox: HTMLDivElement, shadowHost: Element | undefined): ListboxPosition {
    const rect = textbox.getBoundingClientRect();
    const offsetParent: Element | null = shadowHost ? findNearestRelativeParent(shadowHost as HTMLElement) : null;
    const offsetParentRect = offsetParent?.getBoundingClientRect();
    let topOffset = window.scrollY;
    let leftOffset = window.scrollX;

    if (offsetParent && offsetParentRect) {
        topOffset = -offsetParentRect.top;
        leftOffset = -offsetParentRect.left;
    }

    return {
        top: rect.bottom + topOffset,
        left: rect.left + leftOffset,
        width: rect.width,
    };
}

interface ListBoxTagProps {
    handleTagRemove: (tag: TagValue) => void;
    option: DropdownListOption;
    readOnly?: boolean;
    textboxRef: RefObject<HTMLDivElement>;
}

const ListboxTag: FC<ListBoxTagProps> = ({
    handleTagRemove, option, readOnly, textboxRef,
}) => {
    const tagLabelRef = useRef<HTMLSpanElement>(null);
    const overflow: Overflow = useOverflow(tagLabelRef, textboxRef);
    const isOverflowing = overflow.horizontal || overflow.vertical;

    return (
        <TagTooltipWrapper>
            <TagTooltip
                key={option.value}
                label={option.label}
                disabled={!isOverflowing}
                mode="normal"
            >
                <StyledTag
                    aria-hidden="true"
                    data-testid={`listboxtag-${option.value}`}
                    labelRef={tagLabelRef}
                    onRemove={readOnly ? undefined : handleTagRemove}
                    value={{ id: option.value, label: option.label }}
                />
            </TagTooltip>
        </TagTooltipWrapper>
    );
};
ListboxTag.displayName = 'ListboxTag';

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

    const textboxRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);

    const [open, setOpen] = useState(defaultOpen);
    const [listboxPosition, setListboxPosition] = useState<ListboxPosition>({ top: 0, left: 0, width: 0 });
    const rootElement = getRootElement(shadowRoot);

    const [selectedOptions, setSelectedOptions] = useState<DropdownListOption[] | undefined>(
        () => getDefaultOptions(value ?? defaultValue, providedOptions, multiselect),
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
        const newSelectedOptions = !isOptionSelected(option, selectedOptions) || forceSelected
            ? addUniqueOption(option, selectedOptions)
            : removeOption(option, selectedOptions);

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

        if (textboxRef.current) {
            const newListboxPosition = getListboxPosition(textboxRef.current, shadowRoot?.host);
            setListboxPosition(newListboxPosition);
        }

        setFocusedOption(getLastSelectedOption(selectedOptions));
        setOpen(true);
    }

    useEffect(() => {
        function updatePosition(): void {
            if (open && textboxRef.current) {
                const newListboxPosition = getListboxPosition(textboxRef.current, shadowRoot?.host);
                setListboxPosition(newListboxPosition);
            }
        }

        let resizeObserver: ResizeObserver | undefined;
        if (textboxRef.current) {
            resizeObserver = new ResizeObserver(() => {
                updatePosition();
            });
            resizeObserver.observe(textboxRef.current);
        }

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
            resizeObserver?.disconnect();
        };
    }, [open, shadowRoot?.host]);

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
        if (isOptionEnabled(option)) {
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
            option={option}
            readOnly={readOnly}
            handleTagRemove={handleTagRemove}
            textboxRef={textboxRef}
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
                    $readOnly={readOnly}
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

DropdownList.displayName = 'DropdownList';
