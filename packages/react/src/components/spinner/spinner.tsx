import styled from 'styled-components';
import Enso from '../../icons/enso.svg';

const Spinner = styled(Enso)`
    color: ${(props) => props.theme.component['spinner-fill-color']};
    height: 64px;
    width: 64px;
`;

export { Spinner };
