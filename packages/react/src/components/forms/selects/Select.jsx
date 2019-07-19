import React, { Component } from 'react';

import styled from 'styled-components';
import styles from '../styles/inputs.js';
import FieldContainer from '../field-container';

const Select = styled.select`
  ${styles}
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='feather feather-chevron-down'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-position: right 0.75rem center;
  background-repeat: no-repeat;
  background-size: 0.75rem;
  position: relative;
`;

export default class SelectDefault extends Component {
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
        const { children, id, label, options, required, valid, validMsg, ...props } = this.props;
        const { validity } = this.state;
        const isValid = (valid === undefined ? validity : valid);
        const selectOptions = options.map(option => <option value={option.value}>{option.label}</option>);

        return (
            <FieldContainer
                fieldId={id}
                label={label}
                valid={isValid}
                validMsg={validMsg || 'You must select an option'}
            >
                <Select
                    {...props}
                    id={id}
                    onBlur={thatEvt => this.handleCheckValidity(thatEvt)}
                    onChange={thatEvt => this.handleCheckValidity(thatEvt)}
                    required={required}
                >
                    {selectOptions}
                </Select>
            </FieldContainer>
        );
    }
}
