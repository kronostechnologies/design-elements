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

const ChooseRadio = ({ defaultChecked, children, groupName, id, onChange, value }) => {
    const ref = React.createRef();

    const handleChange = () => {
        if (typeof onChange === 'function') {
            onChange(ref.current.checked);
        }
    };

    return (
        <>
            <Radio
                defaultChecked={defaultChecked}
                id={id}
                name={groupName}
                onChange={handleChange}
                ref={ref}
                type="radio"
                value={value}
            />
            <Label htmlFor={id}>{children}</Label>
        </>
    );
};

export default ChooseRadio;
