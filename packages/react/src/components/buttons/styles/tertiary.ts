export const tertiaryStyle = `
  background-color: transparent;
  border-color: transparent;
  color: #637282;

  &:focus,
  &:hover {
    color: black;
  }

  &:disabled {
    &,
    &:focus,
    &:hover {
      color: rgba(0, 0, 0, 0.4);
    }
  }
`;
