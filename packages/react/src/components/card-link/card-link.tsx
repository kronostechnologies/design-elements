import { VoidFunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';
import { Icon } from '../icon/icon';

const StyledIcon = styled(Icon)`
    color: currentColor;
    height: var(--size-1x);
    position: absolute;
    right: var(--spacing-3x);
    top: 50%;
    transform: translateY(-50%);
    width: var(--size-1x);
`;

const StyledLink = styled(Link)`
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys.grey};
    border-color: ${({ theme }) => theme.greys.grey};
    border-radius: var(--border-radius-2x);
    box-sizing: border-box;
    color: ${({ theme }) => theme.greys.black};
    display: block;
    font-size: 1rem;
    font-weight: var(--font-semi-bold);
    line-height: 1.5rem;
    overflow: hidden;
    padding: var(--spacing-3x) var(--spacing-5x) var(--spacing-3x) var(--spacing-3x);
    position: relative;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

    &:hover {
        background-color: ${({ theme }) => theme.greys.grey};
        border-color: ${({ theme }) => theme.greys['dark-grey']};
    }

    ${({ theme }) => focus({ theme }, false)};
`;

interface CardLinkProps {
    className?: string;
    href: string;
    label: string;
    /** When true, clicking the link will replace the current entry in the history stack instead of adding a new one. */
    replace?: boolean;
}

export const CardLink: VoidFunctionComponent<CardLinkProps> = ({
    className, href, label, replace,
}) => (
    <StyledLink className={className} replace={replace} title={label} to={href}>
        {label}
        <StyledIcon aria-hidden name="chevronRight" size="16" />
    </StyledLink>
);
