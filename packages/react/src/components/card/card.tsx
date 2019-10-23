import styled from 'styled-components';
import { equisoftTheme } from '../../themes/equisoft';

const Card = styled.div`
  background: ${equisoftTheme.greys.white};
  border: 1px solid ${equisoftTheme.greys.grey};
  border-radius: 0.5rem;
  box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  margin-bottom: 2rem;
  padding: 2rem;
`;

export { Card };
