import React, { Component } from 'react';
import styled from 'styled-components';

import Label from './label';
import fieldContainer from './field-container';
import InvalidField from '../feedbacks/invalid-field';

const Textarea = styled.textarea`
  background: rgb(255, 255, 255);
  border: 1px solid rgb(217, 221, 226);
  border-radius: 0.25rem;
  box-shadow: none;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  font-family: inherit;
  font-size: calc(1rem - 2px);
  margin: 0;
  min-height: 6.5rem;
  min-width: 100%;
  outline: none;
  overflow: auto;
  padding: 0.5rem;
  resize: vertical;

  &::placeholder {
    color: rgb(99, 114, 130);
  }

  &:disabled {
    background-color: rgb(242, 243, 249);
    border-color: rgb(217, 221, 226);

    &,
    &::placeholder {
      color: rgb(156, 167, 180);
    }
  }

  &:focus {
    border-color: rgb(54, 71, 127);
  }

  label + & {
    margin-top: 0.5rem;
  }
`;

const FieldContainer = styled(fieldContainer)`
  textarea {
    border-color: ${props => props.valid ? 'rgb(217, 221, 226)' : 'rgb(164, 12, 46)'};
  }
`;

export default class textarea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: true,
        };

        this.handleCheckValidity = this.handleCheckValidity.bind(this);
    }

    handleCheckValidity(thatEvt) {
        return this.setState({ valid: thatEvt.target.checkValidity() });
    }

    render() {
        const { invalidMsg, invalid, id, label, optional, placeholder, required, ...props } = this.props;
        const { valid } = invalid ? true : this.state;
        const isOptional = optional ? false : 'required';

        return (
            <FieldContainer valid={valid}>
                {label &&
                 (<Label htmlFor={id}>{label}</Label>)
                }

                <Textarea
                    id={id}
                    placeholder={placeholder}
                    onBlur={thatEvt => this.handleCheckValidity(thatEvt)}
                    required={isOptional}
                    {...props}
                />

                {!valid &&
                 (<InvalidField controlId={id} feedbackMsg={invalidMsg || 'Invalid text area input'} />)
                }
            </FieldContainer>
        );
    }
}
