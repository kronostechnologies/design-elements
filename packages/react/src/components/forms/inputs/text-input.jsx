import React, { Component } from 'react';
import styled from 'styled-components';

import style from '../styles/inputs';

import { FieldContainer } from '../field-container';

const Input = styled.input`
  ${style}
`;

class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            validity: true,
        };

        this.handleCheckValidity = this.handleCheckValidity.bind(this);
    }

    handleCheckValidity(thatEvt) {
        return this.setState({ validity: thatEvt.target.checkValidity() });
    }

    render() {
        const { id, label, required, type, valid, validMsg, ...props } = this.props;
        const { validity } = this.state;
        const isValid = (valid === undefined ? validity : valid);

        return (
            <FieldContainer
                fieldId={id}
                label={label}
                valid={isValid}
                validMsg={validMsg || 'This text input is invalid'}
            >
                <Input
                    {...props}
                    id={id}
                    onBlur={thatEvt => this.handleCheckValidity(thatEvt)}
                    required={required}
                    type={type || 'text'}
                />
            </FieldContainer>
        );
    }
}

export { TextInput };
