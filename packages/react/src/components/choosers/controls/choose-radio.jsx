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
    render() {
        const { children, groupName, id, value, ...props } = this.props;

        return (
            <>
                <Radio {...props} id={id} name={groupName} type="radio" value={value} />
                <Label htmlFor={id}>{children}</Label>
            </>
        );
    }
}
