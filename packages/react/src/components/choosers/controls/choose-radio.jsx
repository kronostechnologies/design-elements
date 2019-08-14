import React from 'react';

import styled from 'styled-components';
import visuallyhidden from '../../a11y/styles/visuallyhidden';
import chooseStyles from './styles/choose';

const Radio = styled.input`
  ${visuallyhidden}
`;

const Label = styled.label`
  ${chooseStyles}
`;

const ChooseRadio = ({ defaultChecked, checked, children, groupName, id, onChange, value }) => {
    const handleChange = event => {
        if (typeof onChange === 'function') {
            onChange(event.target.value);
        }
    };

    return (
        <>
            <Radio
                checked={checked}
                defaultChecked={defaultChecked}
                id={id}
                name={groupName}
                onChange={event => handleChange(event)}
                type="radio"
                value={value}
            />
            <Label htmlFor={id}>{children}</Label>
        </>
    );
};

export default ChooseRadio;
