import React, { Component } from 'react';

import styled from 'styled-components';
import style from '../styles/inputs';
import FieldContainer from '../field-container';

const Input = styled.input`
  ${style}
`;

export default class InputText extends Component {
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
        const { id, label, optional, required, type, valid, validMsg, ...props } = this.props;
        const { validity } = this.state;
        const isValid = (valid === undefined ? validity : valid);
        const isRequired = optional ? null : true;

        return (
            <FieldContainer
                fieldId={id}
                label={label}
                optional={optional}
                valid={isValid}
                validMsg={validMsg || 'This text input is invalid'}
            >
                <Input
                    {...props}
                    id={id}
                    onBlur={thatEvt => this.handleCheckValidity(thatEvt)}
                    onInput={thatEvt => this.handleCheckValidity(thatEvt)}
                    required={isRequired}
                    type={type || 'text'}
                />
            </FieldContainer>
        );
    }
}
