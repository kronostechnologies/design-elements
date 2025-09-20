import styled from 'styled-components';
import Enso from '../../icons/enso.svg';

export const ProgressIndicator = styled(Enso)`
    color: ${(props) => props.theme.component['spinner-fill-color']};
    height: 64px;
    width: 64px;
`;
