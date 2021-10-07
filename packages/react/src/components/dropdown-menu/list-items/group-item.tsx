import React, { ReactElement, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { NavItemProps } from './nav-item';
import { Heading, HeadingProps } from '../../heading/heading';

export interface GroupItemProps {
    id?: string;
    children: ReactElement<NavItemProps> | ReactElement<NavItemProps>[];
    ordered?: boolean;
    label?: string;
}

export const StyledHeading = styled(Heading)<HeadingProps>`
    margin: 0;
    padding: 0 var(--spacing-2x);
    padding-bottom: var(--spacing-1x);
`;

const StyledGroup = styled.ul`
    margin: 0;
    overflow-y: auto;
    padding: 0;

    :not(:last-child)::after {
        border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
        content: "";
        display: block;
        margin: 0 var(--spacing-2x);
    }
`;

export const GroupItem: VoidFunctionComponent<GroupItemProps> = ({
    id,
    children,
    ordered,
    label,
}) => (
    <>
        {label && <StyledHeading id={id} type='small' tag='h3' bold>{label}</StyledHeading>}
        <StyledGroup
            aria-labelledby={id}
            as={ordered ? 'ol' : 'ul'}
        >
            {children}
        </StyledGroup>
    </>
);
