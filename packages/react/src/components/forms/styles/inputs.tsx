export const inputsStyle = `
  background: rgb(255, 255, 255);
  border: 1px solid rgb(217, 221, 226);
  border-radius: 0.25rem;
  box-shadow: none;
  box-sizing: border-box;
  color: rgb(0, 0, 0);
  font-family: inherit;
  font-size: calc(1rem - 2px);
  margin: 0;
  outline: none;
  padding: 0.5rem;

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

  label + & {
    display: block;
    margin-top: 0.5rem;
    width: 100%;
  }
`;
