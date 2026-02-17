import { type FC, useCallback, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { DS_CLASS_PREFIX } from '../../utils/component-classes';
import { v4 as uuid } from '../../utils/uuid';
import type { DropdownMenuButtonProps, DropdownMenuCloseFunction } from '../dropdown-menu-button';
import type { FilterOption } from '../filters';
import { Icon } from '../icon';
import { type LeadingVisual, Listbox, type ListboxOption, type ListboxRef } from '../listbox/listbox';
import { getOptionByValueOrFirst } from '../listbox/utils';
import { ViewControlDropdownButton } from './internal/view-control-dropdown-button';
import type { ViewControlOption } from './view-control-option';

export type ViewControlVariant = 'subtle' | 'inverted';

type Value = string;

export type ViewControlProps = {
    className?: string;
    /**
     * Determines the width of the dropdown menu. 'auto' will size the menu based on its content,
     * while 'reference' will match the width of the button. The default is 'reference'.
     */
    dropdownWidthMode?: Extract<DropdownMenuButtonProps['dropdownMenuWidth'], 'auto' | 'reference'>;
    hint?: string;
    options: ViewControlOption[];
    value: Value;
    variant?: ViewControlVariant;

    onChange?(value: Value): void;
};

const IconLabel = styled(Icon)`
    flex-shrink: 0;
    margin-left: calc(-1 * var(--spacing-quarter));
    margin-right: var(--spacing-3quarter);
`;

const ValueLabel = styled.span`
    flex-grow: 1;
    overflow: hidden;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledListbox = styled(Listbox)`
    background-color: transparent;
    border: none;
    box-shadow: none;
    max-height: 100%;
    outline: none;
`;

const Hint = styled.div`
    color: ${({ theme }) => theme.component['view-control-hint-color']};
    font-size: ${({ theme }) => theme.alias['text-label-small-font-size']};
    line-height: ${({ theme }) => theme.alias['text-label-small-line-height']};
    padding: var(--spacing-1halfx) var(--spacing-2x) var(--spacing-half);
    user-select: none;

    + ${StyledListbox} {
        padding-top: 0;
    }
`;

/**
 * @alpha This component is experimental and may change without a major version bump.
 */
export const ViewControl: FC<ViewControlProps> = ({
    className,
    dropdownWidthMode = 'reference',
    hint,
    onChange,
    options,
    value,
    variant,
}) => {
    const dropdownMenuId = useMemo(() => `${DS_CLASS_PREFIX}${uuid()}`, []);
    const listboxRef = useRef<ListboxRef>(null);
    const [previousValue, setPreviousValue] = useState<Value>(value);

    const handleMenuVisibilityChanged = useCallback((isOpen: boolean): void => {
        if (isOpen) {
            listboxRef.current?.focus({ preventScroll: true });
        }
    }, []);

    const handleItemSelected = useCallback((close: DropdownMenuCloseFunction, option: FilterOption): void => {
        setPreviousValue(option.value);
        onChange?.(option.value);
        close();
    }, [onChange]);

    const selectedValue = getOptionByValueOrFirst(options, value);

    const controlLabel = (
        <>
            {selectedValue.iconName && <IconLabel name={selectedValue.iconName} />}
            <ValueLabel>{selectedValue.label}</ValueLabel>
        </>
    );

    const listboxOptions: ListboxOption[] = options.map(({ iconName, ...option }) => ({
        ...option,
        ...(
            iconName
                ? {
                    leadingVisualProps: iconName,
                    leadingVisualType: 'icon',
                }
                : { leadingVisualType: undefined }
        ) satisfies LeadingVisual,
    } satisfies ListboxOption));

    return (
        <ViewControlDropdownButton
            className={className}
            dropdownMenuWidth={dropdownWidthMode}
            label={controlLabel}
            onMenuVisibilityChanged={handleMenuVisibilityChanged}
            render={(close: DropdownMenuCloseFunction) => (
                <>
                    {hint && <Hint>{hint}</Hint>}
                    <StyledListbox
                        ref={listboxRef}
                        focusable={false}
                        keyboardNav
                        onOptionClick={handleItemSelected.bind(null, close)}
                        options={listboxOptions}
                        value={previousValue}
                    />
                </>
            )}
            dropdownMenuId={dropdownMenuId}
            $variant={variant}
        />
    );
};

ViewControl.displayName = 'ViewControl';
