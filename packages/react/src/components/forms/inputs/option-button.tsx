import React from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

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

const OptionButton = ({ checked, label, name, value }: OptionButtonProps) => {
    const id = uuid();

    return (
      <div>
          <Input checked={checked} id={id} name={name} type="radio" value={value} />
          <label htmlFor={id}>{label}</label>
      </div>
    );
};

export { OptionButton };
