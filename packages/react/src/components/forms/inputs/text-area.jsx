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
            value: props.defaultValue || '',
        };

        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCheckValidity = this.handleCheckValidity.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
    }

    handleBlur(event) {
        const { onBlur } = this.props;

        this.setState({ value: event.target.value });
        this.handleCheckValidity(event);
        if (typeof onBlur === 'function') {
            onBlur(event);
        }
    }

    handleChange(event) {
        const { onChange } = this.props;
        const newValue = event.target.value;

        this.setState({ value: newValue });
        if (typeof onChange === 'function') {
            onChange(newValue);
        }
    }

    handleCheckValidity(event) {
        this.setState({ validity: event.target.checkValidity() });
    }

    handleFocus(event) {
        const { onFocus } = this.props;

        if (typeof onFocus === 'function') {
            onFocus(event);
        }
    }

    render() {
        const { disabled, id, label, required, validMsg } = this.props;
        const { validity, value } = this.state;

        return (
            <FieldContainer
                fieldId={id}
                label={label}
                valid={validity}
                validMsg={validMsg || 'This text area input is invalid'}
            >
                <StyledTextArea
                    disabled={disabled}
                    id={id}
                    onBlur={event => this.handleBlur(event)}
                    onChange={event => this.handleChange(event)}
                    onFocus={event => this.handleFocus(event)}
                    required={required}
                    value={value}
                />
            </FieldContainer>
        );
    }
}

export default TextArea;
