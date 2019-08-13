import React, { RefObject } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  height: 16px;
  margin: 0;
  width: 16px;
`;

interface CheckboxProps {
    defaultChecked?: boolean;
    onChange: ((...args: any[]) => void);
}

type Ref = ((instance: HTMLInputElement) => void) | RefObject<HTMLInputElement>;

const Checkbox = ({ defaultChecked, onChange }: CheckboxProps) => {
    const ref: Ref = React.createRef();

    const handleChange = () => {
        if (typeof onChange === 'function') {
            if (ref.current === null) return;
            onChange(ref.current.checked);
        }
    };

    return (
        <Input defaultChecked={defaultChecked} ref={ref} onChange={handleChange} type="checkbox" />
    );
};

export { Checkbox };
