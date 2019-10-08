import React, { ChangeEvent, ReactElement } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  height: 16px;
  margin: 0;
  width: 16px;
`;

interface CheckboxProps {
    defaultChecked?: boolean;

    onChange?(event: ChangeEvent<HTMLInputElement>, checked: boolean): void;
}

export function Checkbox({ defaultChecked, onChange }: CheckboxProps): ReactElement {
    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        if (onChange) {
            onChange(event, event.currentTarget.checked);
        }
    }

    return (
        <Input defaultChecked={defaultChecked} onChange={handleChange} type="checkbox" />
    );
}
