import styled from 'styled-components';

import { SECONDARY, TERTIARY } from '../../constants';

import primaryStyle from './styles/primary';
import secondaryStyle from './styles/secondary';
import tertiaryStyle from './styles/tertiary';

import AbstractButton from './abstract-button';

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

export default Button;
