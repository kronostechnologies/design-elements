import styled from 'styled-components';

import { SECONDARY, TERTIARY } from '../../constants';
import { AbstractButton } from './abstract-button';

import primaryStyle from './styles/primary';
import secondaryStyle from './styles/secondary';
import tertiaryStyle from './styles/tertiary';

const Button = styled(AbstractButton)`
  ${props => {
        if (props.type === SECONDARY) {
            return secondaryStyle;
        } else if (props.type === TERTIARY) {
            return tertiaryStyle;
        }
        return primaryStyle;
    }}
`;

export { Button };
