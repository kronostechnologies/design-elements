export default `
  align-items: center;
  background: rgb(255, 255, 255);
  border: 1px solid rgb(217, 221, 226);
  border-radius: 0.5rem;
  box-sizing: border-box;
  color: rgb(87, 102, 110);
  cursor: pointer;
  display: flex;
  justify-content: center;
  min-height: 3rem;
  padding: 1rem;
  transition: all 0.25s ease-in-out;

  &:hover {
    background: rgb(217, 221, 226);
    border-color: rgb(217, 221, 226);
  }

  input[type="checkbox"]:checked + &,
  input[type="radio"]:checked + & {
    background: rgb(0, 128, 165);
    border-color: rgb(0, 128, 165);
    color: rgb(255, 255, 255);
  }

  input[type="checkbox"]:focus + &,
  input[type="radio"]:focus + & {
    border-color: rgb(0, 128, 165);
  }

  input[type="checkbox"]:disabled + &,
  input[type="radio"]:disabled + & {
    background: rgb(241, 242, 242);
    border-color: rgb(217, 221, 226);
    color: rgb(156, 167, 180);
    cursor: auto;
  }

  b {
    font-size: 1.5rem;
    font-weight: 400;
  }

  svg {
    color: inherit;
    height: 3rem;
    width: 3rem;
  }
`;
