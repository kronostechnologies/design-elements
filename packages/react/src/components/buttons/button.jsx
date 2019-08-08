import React, { Component } from 'react';
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

class Button extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { onClick } = this.props;
        if (typeof onClick === 'function') {
            onClick();
        }
    }

    render() {
        const { children, disabled } = this.props;

        return (
            <StyledButton disabled={disabled} onClick={this.handleClick}>
                { children }
            </StyledButton>
        );
    }
}

export default Button;
