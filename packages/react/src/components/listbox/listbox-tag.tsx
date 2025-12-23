import { FC, type JSX, RefObject, useRef } from 'react';
import styled from 'styled-components';
import { Tag } from '../tag';
import { Tooltip } from '../tooltip';
import { Overflow, useOverflow } from '../../hooks/use-overflow';

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
    margin: var(--spacing-quarter);
    overflow: hidden;

    &[aria-disabled='true'] {
        pointer-events: none;
        user-select: none;
    }

    & + & {
        margin-left: var(--spacing-quarter);
    }
`;

type ListOption = { value: string; label?: string }

export interface TagValue {
    id?: string;
    label: string;
}

export interface ListBoxTagProps<T extends ListOption> {
    disabled?: boolean;
    option: T;
    readOnly?: boolean;
    textboxRef: RefObject<HTMLDivElement>;

    handleTagRemove?(tag: TagValue): void;
}

export const ListboxTag: FC<ListBoxTagProps<ListOption>> = ({
    disabled,
    handleTagRemove,
    option,
    readOnly,
    textboxRef,
}) => {
    const tagLabelRef = useRef<HTMLSpanElement>(null);
    const overflow: Overflow = useOverflow(tagLabelRef, textboxRef);
    const isOverflowing = overflow.horizontal || overflow.vertical;

    const tag: JSX.Element = (
        <StyledTag
            aria-disabled={disabled}
            aria-hidden="true"
            data-testid={`listboxtag-${option.value}`}
            labelRef={tagLabelRef}
            onRemove={readOnly || disabled ? undefined : handleTagRemove}
            value={{ id: option.value, label: option?.label ?? '' }}
        />
    );

    if (isOverflowing) {
        return (
            <TagTooltipWrapper>
                <TagTooltip
                    key={option.value}
                    label={option?.label ?? ''}
                    disabled={!isOverflowing}
                    mode="normal"
                >
                    {tag}
                </TagTooltip>
            </TagTooltipWrapper>
        );
    }

    return tag;
};
