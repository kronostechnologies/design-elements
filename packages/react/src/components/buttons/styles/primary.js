export default `
  background-color: #e2732e;
  border-color: #e2732e;
  color: white;

  &:focus,
  &:hover {
    background-color: #b75e2b;
    border-color: #b75e2b;
  }

  &:disabled {
    &,
    &:focus,
    &:hover {
      background-color: #f0b996;
      border-color: #f0b996;
    }
  }
`;
