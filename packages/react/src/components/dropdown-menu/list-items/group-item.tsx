import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { NavItemProps } from './nav-item';

export interface GroupItemProps {
    id: string;
    children: ReactElement<NavItemProps> | ReactElement<NavItemProps>[];
    ordered?: boolean;
    label?: string;
}

const StyledGroup = styled.ul`
    margin: 0;
    overflow-y: auto;
    padding: 0;
`;

export const GroupItem = ({
    id,
    children,
    ordered,
    label,
}: GroupItemProps): ReactElement => (
    <>
        {label && <h3 id={id}>{label}</h3>}
        <StyledGroup
            aria-labelledby={id}
            as={ordered ? 'ol' : 'ul'}
            role="group"
        >
            {children}
        </StyledGroup>
    </>
);
