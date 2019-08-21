export const abstractStyle = `
  align-items: center;
  appearance: none;
  background: inherit;
  border: 1px solid;
  border-radius: 1.25rem;
  box-sizing: border-box;
  color: inherit;
  display: inline-flex;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.025rem;
  line-height: normal;
  min-height: 2rem;
  min-width: 2rem;
  outline: none;
  padding: 0.5rem 1rem;
  text-transform: uppercase;
  transition: all 0.2s ease-in-out;
  user-select: none;

  &:not(:disabled) {
    cursor: pointer;
  }

  > svg {
    color: inherit;
  }
`;
