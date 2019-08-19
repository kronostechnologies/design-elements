import React from 'react';

import styled from 'styled-components';
import visuallyhidden from '../../a11y/styles/visuallyhidden';
import chooseStyles from './styles/choose';

const Input = styled.input`
  ${visuallyhidden}
`;

const Label = styled.label`
  ${chooseStyles}
`;

const ChooseInput = React.forwardRef(({ defaultChecked, children, groupName, id, onChange, type, value }, ref) => {
    const handleChange = event => {
        if (typeof onChange === 'function') {
            onChange(event.target.value);
        }
    };

    return (
        <>
            <Input
                defaultChecked={defaultChecked}
                id={id}
                onChange={event => handleChange(event)}
                name={groupName}
                ref={ref}
                type={type}
                value={value}
            />
            <Label htmlFor={id}>{children}</Label>
        </>
    );
});

export default ChooseInput;
