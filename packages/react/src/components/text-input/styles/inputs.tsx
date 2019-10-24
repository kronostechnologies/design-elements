export const inputsStyle = (theme: Theme) => `
  background: ${theme.greys.white};
  border: 1px solid ${theme.greys.grey};
  border-radius: 0.25rem;
  box-shadow: none;
  box-sizing: border-box;
  color: ${theme.greys.black};
  font-family: inherit;
  font-size: calc(1rem - 2px);
  margin: 0;
  outline: none;
  padding: 0.5rem;

  &::placeholder {
    color: ${theme.greys['dark-grey']};
  }

  &:disabled {
    background-color: ${theme.greys['light-grey']};
    border-color: ${theme.greys.grey};

    &,
    &::placeholder {
      color: ${theme.greys['mid-grey']};
    }
  }

  &:focus {
    border-color: ${theme.main['primary-1.1']};
  }

  label + & {
    display: block;
    margin-top: 0.5rem;
    width: 100%;
  }
`;
