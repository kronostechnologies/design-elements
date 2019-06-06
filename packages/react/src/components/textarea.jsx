import React from 'react';
import styled from 'styled-components';

const Textarea = styled.textarea`
  background: rgb(255, 255, 255);
  border: 1px solid rgb(217, 221, 226);
  border-radius: 0.25rem;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  font-family: inherit;
  font-size: calc(1rem - 2px);
  min-height: 6.5rem;
  min-width: 100%;
  outline: none;
  overflow: auto;
  padding: 0.5rem;
  resize: vertical;

  &::placeholder {
    color: rgb(99, 114, 130);
  }

  &:disabled {
    background-color: rgb(242, 243, 249);
    border-color: rgb(217, 221, 226);

    &,
    &::placeholder {
      color: rgb(156, 167, 180);
    }
  }

  &:focus {
    border-color: rgb(54, 71, 127);
  }

  &:invalid {
    border-color: rgb(164, 12, 46);
    box-shadow: none;
  }
`;

export default ({ id, placeholder, ...props }) => (
    <Textarea
        id={id}
        placeholder={placeholder}
        {...props}
    />
);
