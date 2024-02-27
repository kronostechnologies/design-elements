import styled from 'styled-components';
import Enso from '../../icons/enso.svg';

const Spinner = styled(Enso)`
    animation: roll 1s infinite;
    animation-timing-function: linear;
    fill: ${(props) => props.theme.component['spinner-fill']};
    height: 80px;
    width: 83px;

    @keyframes roll {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
`;

export { Spinner };
