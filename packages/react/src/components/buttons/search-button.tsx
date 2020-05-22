import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import { i18n } from '@design-elements/i18n/i18n';
import styled from 'styled-components';
import { AbstractButton } from './abstract-button';

interface ButtonProps {
    label?: string;
    children?: ReactNode;
    className: string;
    disabled?: boolean;

    onClick?(): void;
}

const StyledButton = styled(AbstractButton)`
    ${props => `
        background: ${props.theme.greys.white};
        border-color: ${props.theme.greys.grey};
        color: ${props.theme.greys['mid-grey']};

        &:disabled {
            &,
            &:focus,
            &:hover {
                background-color: ${props.theme.greys.grey};
                border-color: ${props.theme.greys.grey};
                color: ${props.theme.greys['mid-grey']};
            }

            &:disabled {
                &,
                &:focus,
                &:hover {
                    background-color: ${props.theme.greys['light-grey']};
                    border-color: ${props.theme.greys.grey};
                    color: ${props.theme.greys['mid-grey']};
                }
            }
        }`}
`;

export const SearchButton = ({ children, className, disabled, label, onClick }: ButtonProps) => {
    const { t } = useTranslation('search-button');
    const handleClick = () => { onClick && onClick(); };

    return (
        <StyledButton className={className} disabled={disabled} onClick={handleClick}>
            {children}{label || t('label')}
        </StyledButton>
    );
};

const Translation = {
    en: {
        label: 'Search',
    },
    fr: {
        label: 'Rechercher',
    },
};

i18n.addResources('en', 'search-button', Translation.en);
i18n.addResources('fr', 'search-button', Translation.fr);
