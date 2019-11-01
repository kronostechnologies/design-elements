import React from 'react';

import styled from 'styled-components';
import uuid from 'uuid/v4';

const Input = styled.input`
  ${props => {
      return `
      position: absolute;
      z-index: -1;

      + label {
        align-items: center;
        background-color: ${props.theme.greys.white};
        border: 1px solid ${props.theme.greys.grey};
        border-radius: 8px;
        color: ${props.theme.greys['dark-grey']};
        display: flex;
        font-size: 24px;
        justify-content: center;
        min-height: 40px;
      }

      &:checked + label {
        background-color: ${props.theme.main['primary-1.1']};
        border-color: ${props.theme.main['primary-1.1']};
        color: ${props.theme.greys.white};
      }
    `;
  }}
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
