import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  height: 16px;
  margin: 0;
  width: 16px;
`;

const Checkbox = ({ defaultChecked, onChange }) => {
    const ref = React.createRef();

    const handleChange = () => {
        if (typeof onChange === 'function') {
            onChange(ref.current.checked);
        }
    };

    return (
        <Input defaultChecked={defaultChecked} ref={ref} onChange={handleChange} type="checkbox" />
    );
};

export default Checkbox;
