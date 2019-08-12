import React, { Component } from 'react';

import styled from 'styled-components';
import visuallyhidden from '../../a11y/styles/visuallyhidden';
import chooseStyles from './styles/choose';

const Radio = styled.input`
  ${visuallyhidden}
`;

const Label = styled.label`
  ${chooseStyles}
`;

export default class ChooseRadio extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(thatEvt) {
        const { onChange } = this.props;

        if (typeof onChange === 'function') {
            onChange(thatEvt.target.value);
        }
    }

    render() {
        const { children, groupName, id, onChange, skippable, value, ...props } = this.props;

        return (
            <>
                <Radio
                    {...props}
                    id={id}
                    name={groupName}
                    onChange={thatEvt => this.handleChange(thatEvt)}
                    type="radio"
                    value={value}
                />
                <Label htmlFor={id}>{children}</Label>
            </>
        );
    }
}
