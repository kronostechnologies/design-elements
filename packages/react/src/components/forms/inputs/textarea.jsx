import React, { Component } from 'react';

import styled from 'styled-components';
import style from '../styles/inputs';
import FieldContainer from '../field-container';

const Textarea = styled.textarea`
  ${style}
  min-height: 6.5rem;
  min-width: 100%;
  outline: none;
  overflow: auto;
  resize: vertical;
`;

export default class textarea extends Component {
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
        const { id, label, optional, required, valid, validMsg, ...props } = this.props;
        const { validity } = this.state;
        const isValid = (valid === undefined ? validity : valid);
        const isRequired = optional ? false : 'required';

        return (
            <FieldContainer
                fieldId={id}
                label={label}
                optional={optional}
                valid={isValid}
                validMsg={validMsg || 'This text area input is invalid'}
            >
                <Textarea
                    {...props}
                    id={id}
                    onBlur={thatEvt => this.handleCheckValidity(thatEvt)}
                    required={isRequired}
                />
            </FieldContainer>
        );
    }
}
