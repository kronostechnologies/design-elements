import React, { Component } from 'react';
import styled from 'styled-components';

import style from '../styles/inputs';

import FieldContainer from '../field-container';

const StyledTextArea = styled.textarea`
  ${style}
  min-height: 6.5rem;
  min-width: 100%;
  outline: none;
  overflow: auto;
  resize: vertical;
`;

class TextArea extends Component {
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
        const { id, label, required, valid, validMsg, ...props } = this.props;
        const { validity } = this.state;
        const isValid = (valid === undefined ? validity : valid);

        return (
            <FieldContainer
                fieldId={id}
                label={label}
                valid={isValid}
                validMsg={validMsg || 'This text area input is invalid'}
            >
                <StyledTextArea
                    {...props}
                    id={id}
                    onBlur={thatEvt => this.handleCheckValidity(thatEvt)}
                    required={required}
                />
            </FieldContainer>
        );
    }
}

export default TextArea;
