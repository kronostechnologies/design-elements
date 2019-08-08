import React, { Component } from 'react';
import styled from 'styled-components';

import style from '../styles/inputs';

import FieldContainer from '../field-container';

const Input = styled.input`
  ${style}
`;

class TextInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: props.defaultValue || '',
            validity: true,
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

        this.setState({ value: event.target.value });
        if (typeof onChange === 'function') {
            onChange(event);
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
        const { disabled, id, label, pattern, placeholder, required, type, validMsg } = this.props;
        const { validity, value } = this.state;

        return (
            <FieldContainer
                fieldId={id}
                label={label}
                valid={validity}
                validMsg={validMsg || 'This text input is invalid'}
            >
                <Input
                    disabled={disabled}
                    id={id}
                    onBlur={event => this.handleBlur(event)}
                    onChange={event => this.handleChange(event)}
                    onFocus={event => this.handleFocus(event)}
                    pattern={pattern}
                    placeholder={placeholder}
                    required={required}
                    type={type || 'text'}
                    value={value}
                />
            </FieldContainer>
        );
    }
}

export default TextInput;
