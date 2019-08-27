export const primaryStyle = `
  background-color: rgb(226, 115, 46);
  border-color: rgb(226, 115, 46);
  color: white;

  &:hover {
    background-color: rgb(183, 94, 43);
    border-color: rgb(183, 94, 43);
  }

  &:disabled {
    &,
    &:focus,
    &:hover {
      background-color: rgb(240, 185, 150);
      border-color: rgb(240, 185, 150);
    }
  }
`;
