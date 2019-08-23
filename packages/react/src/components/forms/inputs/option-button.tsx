import React from 'react';
import styled from 'styled-components';

const uuidv1 = require('uuid/v1');

const uniqueId = uuidv1();

const Input = styled.input`
  position: absolute;
  z-index: -1;

  + label {
    align-items: center;
    background-color: #fff;
    border: 1px solid #d9dde2;
    border-radius: 8px;
    color: #637282;
    display: flex;
    font-size: 24px;
    justify-content: center;
    min-height: 40px;
  }

  &:checked + label {
    background-color: #006296;
    border-color: #006296;
    color: #fff;
  }
`;

interface OptionButtonProps {
    checked?: boolean;
    label: string;
    name: string;
    value: number;
}

const OptionButton = ({ checked, label, name, value }: OptionButtonProps) => (
    <div>
        <Input checked={checked} id={uniqueId} name={name} type="radio" value={value} />
        <label htmlFor={uniqueId}>{label}</label>
    </div>
);

export { OptionButton };
