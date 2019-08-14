export const secondaryStyles = `
  background-color: transparent;
  border-color: rgb(226, 115, 46);
  color: rgb(226, 115, 46);

  &:focus,
  &:hover {
    background-color: rgb(226, 115, 46);
    border-color: rgb(226, 115, 46);
    color: white;
  }

  &:disabled {
      &,
      &:focus,
      &:hover {
        background-color: transparent;
        border-color: rgb(240, 185, 150);
        color: rgb(240, 185, 150);
      }
  }
`;
