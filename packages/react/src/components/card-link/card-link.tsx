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
    background-color: ${({ theme }) => theme.component['card-link-background-color']};
    border-radius: var(--border-radius-2x);
    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.component['card-link-box-shadow-inset-color']}, 0 1px 4px 0 rgb(0 0 0 / 20%);
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['card-link-text-color']};
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
        background-color: ${({ theme }) => theme.component['card-link-hover-background-color']};
        box-shadow: inset 0 0 0 1px ${({ theme }) => theme.component['card-link-hover-box-shadow-inset-color']}, 0 1px 4px 0 rgb(0 0 0 / 20%);
    }

    ${focus}
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
