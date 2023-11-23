import { forwardRef, KeyboardEvent, ReactElement, Ref, useMemo } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { v4 as uuid } from '../../utils/uuid';
import { GroupItemProps } from './list-items';

const List = styled.div`
    background-color: ${({ theme }) => theme.ref['color-white']};
    border: 1px solid ${({ theme }) => theme.ref['color-neutral-65']};
    border-radius: var(--border-radius);
    box-shadow: ${({ theme }) => theme.component['overlay-box-shadow']};
    color: ${({ theme }) => theme.ref['color-black']};
    list-style-type: none;
    position: absolute;
    width: 100%;
`;

export interface DropdownMenuProps {
    children?: ReactElement<GroupItemProps> | ReactElement<GroupItemProps>[];
    id?: string;
    className?: string;
    hidden?: boolean;
    onKeyDown?(event: KeyboardEvent): void;
}

export const DropdownMenu = forwardRef(({
    children,
    className,
    id: providedId,
    hidden,
    onKeyDown,
    ...otherProps
}: DropdownMenuProps, ref: Ref<HTMLDivElement>): ReactElement => {
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const dataAttributes = useDataAttributes(otherProps);

    return (
        <List
            ref={ref}
            className={className}
            data-testid="menu-list"
            id={id}
            hidden={hidden}
            onKeyDownCapture={(event: KeyboardEvent<HTMLDivElement>) => onKeyDown?.(event)}
            {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {children}
        </List>
    );
});
