import React from 'react';
import styled from 'styled-components';

import { SECONDARY, TERTIARY } from '../../constants';

import primaryStyle from './styles/primary';
import secondaryStyle from './styles/secondary';
import tertiaryStyle from './styles/tertiary';

import AbstractButton from './abstract-button';

const StyledButton = styled(AbstractButton)`
  ${props => {
        if (props.type === SECONDARY) {
            return secondaryStyle;
        } else if (props.type === TERTIARY) {
            return tertiaryStyle;
        }
        return primaryStyle;
    }}
`;

const Button = ({ children, disabled, onClick }) => {
    const handleClick = () => {
        if (typeof onClick === 'function') {
            onClick();
        }
    };

    return (
        <StyledButton disabled={disabled} onClick={handleClick}>
            { children }
        </StyledButton>
    );
};

export default Button;
