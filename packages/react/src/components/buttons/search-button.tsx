import React, { ReactNode } from 'react';
import styled from 'styled-components';

import { equisoftTheme } from '../../themes/equisoft';
import { AbstractButton } from './abstract-button';

interface ButtonProps {
    label?: string;
    children?: ReactNode;
    className: string;
    disabled?: boolean;

    onClick?(): void;
}

const StyledButton = styled(AbstractButton)`
    background: ${equisoftTheme.greys.white};
    border-color: ${equisoftTheme.greys.grey};
    color: ${equisoftTheme.greys['mid-grey']};

  &:disabled {
    &,
    &:focus,
    &:hover {
        background-color: ${equisoftTheme.greys.grey};
        border-color: ${equisoftTheme.greys.grey};
        color: ${equisoftTheme.greys['mid-grey']};
    }

    &:disabled {
        &,
        &:focus,
        &:hover {
            background-color: ${equisoftTheme.greys['light-grey']};
            border-color: ${equisoftTheme.greys.grey};
            color: ${equisoftTheme.greys['mid-grey']};
        }
    }
  }
`;

const SearchButton = ({ children, className, disabled, label, onClick }: ButtonProps) => {
    const handleClick = () => { onClick && onClick(); };

    return (
        <StyledButton className={className} disabled={disabled} onClick={handleClick}>
            {children}{label}
        </StyledButton>
    );
};

export { SearchButton };
