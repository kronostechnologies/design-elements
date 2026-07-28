import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { ROUTES } from '../routes';

const StyledUl = styled.ul`
    border-right: 1px solid ${({ theme }) => theme.alias['color-menu-border']};
    grid-area: sideMenu;
    height: 100%;
    list-style: none;
    margin: 0;
    padding: var(--spacing-1x) 0 0;
`;

const StyledNavLink = styled(NavLink)`
    color: ${({ theme }) => theme.ref['color-black']};
    display: block;
    font-size: 0.875rem;
    line-height: 3rem;
    overflow: hidden;
    padding: 0 var(--spacing-2x);
    text-decoration: none;
    text-overflow: ellipsis;
    text-transform: capitalize;
    white-space: nowrap;

    &:focus {
        box-shadow:
            ${({ theme }) => (
                `inset 0 0 0 2px ${theme.ref['color-brand-20']},
                inset 0 0 0 3px ${theme.ref['color-brand-50']}
            `)};
        outline: none;
    }

    &.active {
        background-color: ${({ theme }) => theme.alias['color-feedback-background-informative-subtle']};
        border-left: 4px solid ${({ theme }) => theme.ref['color-brand-50']};
        font-weight: var(--font-semi-bold);
        padding-left: calc(var(--spacing-2x) - 4px);
    }
`;

export const Menu: FC = () => {
    const { t } = useTranslation([]);

    const menuItems = {
        home: {
            href: ROUTES.home.path,
            end: ROUTES.home.end,
            title: t('nav:Home'),
        },
        users: {
            href: ROUTES.users.path,
            end: ROUTES.users.end,
            title: t('nav:Users'),
        },
        docusign: {
            href: ROUTES.docusign.path,
            end: ROUTES.docusign.end,
            title: t('nav:Docusign'),
        },
    };

    return (
        <StyledUl>
            {Object.entries(menuItems)
                .map(([key, route], index) => (
                    <li role="listitem" key={key}>
                        <StyledNavLink
                            data-testid={`side-menu-link-${index}`}
                            to={route.href}
                            title={key}
                            end
                            className={({ isActive }) => (isActive ? 'active' : 'inactive')}
                        >
                            {route.title}
                        </StyledNavLink>
                    </li>
                ))}
        </StyledUl>
    );
};
