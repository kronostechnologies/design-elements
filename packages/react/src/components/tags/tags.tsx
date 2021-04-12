import React, { ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { IconName } from '../icon/icon';
import { TagSmall } from '../tag-small/tag-small';
import { TagMedium } from '../tag-medium/tag-medium';

const StyledUl = styled.ul`
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
`;

type Size = 'small' | 'medium';

export interface Tag {
    iconName?: IconName;
    label: string;
    id?: string;
}

interface ListOption extends Tag {
    focusIndex: number;
    buttonRef: React.RefObject<HTMLButtonElement>
}

interface TagsProps {
    className?: string;
    options: Tag[];
    size?: Size;

    onDelete?:(option: Tag) => void;
}

function getListFromOptions(options: Tag[]): ListOption[] {
    return options.map(
        (option, index) => ({
            ...option,
            focusIndex: index,
            buttonRef: React.createRef<HTMLButtonElement>(),
        }),
    );
}

export function Tags({
    className, options, size = 'medium', onDelete,
}: TagsProps): ReactElement {
    const list: ListOption[] = useMemo(() => getListFromOptions(options), [options]);

    function handleDelete(listOption: ListOption): void {
        if (onDelete) {
            const previousOption = list[listOption.focusIndex - 1];

            onDelete(listOption);
            previousOption?.buttonRef.current?.focus();
        }
    }

    function getListItems(): JSX.Element[] {
        if (size === 'small') {
            return list.map(({ label }) => <TagSmall label={label} key={label} />);
        }

        return list.map((listOption) => (
            <TagMedium
                option={listOption}
                onDelete={onDelete ? handleDelete : undefined}
                key={listOption.id || listOption.label}
            />
        ));
    }

    return (
        <StyledUl className={className}>
            {getListItems()}
        </StyledUl>
    );
}
