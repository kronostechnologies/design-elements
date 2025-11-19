import { FC, RefObject, useRef } from 'react';
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
    margin: 2px;
    overflow: hidden;

    & + & {
        margin-left: 2px;
    }
`;

type ListOption = { value: string; label?: string }

export interface TagValue {
    id?: string;
    label: string;
}

export interface ListBoxTagProps<T extends ListOption> {
    handleTagRemove: (tag: TagValue) => void;
    option: T;
    readOnly?: boolean;
    textboxRef: RefObject<HTMLDivElement>;
}

export const ListboxTag: FC<ListBoxTagProps<ListOption>> = ({
    handleTagRemove,
    option,
    readOnly,
    textboxRef,
}) => {
    const tagLabelRef = useRef<HTMLSpanElement>(null);
    const overflow: Overflow = useOverflow(tagLabelRef, textboxRef);
    const isOverflowing = overflow.horizontal || overflow.vertical;

    return (
        <TagTooltipWrapper>
            <TagTooltip
                key={option.value}
                label={option?.label ?? ''}
                disabled={!isOverflowing}
                mode="normal"
            >
                <StyledTag
                    aria-hidden="true"
                    data-testid={`listboxtag-${option.value}`}
                    labelRef={tagLabelRef}
                    onRemove={readOnly ? undefined : handleTagRemove}
                    value={{ id: option.value, label: option?.label ?? '' }}
                />
            </TagTooltip>
        </TagTooltipWrapper>
    );
};
