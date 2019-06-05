export default `
  background-color: transparent;
  border-color: #e2732e;
  color: #e2732e;

  &:focus,
  &:hover {
    background-color: #e2732e;
    border-color: #e2732e;
    color: white;
  }

  &:disabled {
      &,
      &:focus,
      &:hover {
        background-color: transparent;
        border-color: #f0b996;
        color: #f0b996;
      }
  }
`;
