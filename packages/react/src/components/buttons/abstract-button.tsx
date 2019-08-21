import { ReactNode } from 'react';
import styled from 'styled-components';

import { styles } from './styles/abstract';

export interface AbstractButtonProps {
    children?: ReactNode;
    disabled?: boolean;
    onClick(): void;
}

const AbstractButton = styled.button`
  ${styles}
`;

export { AbstractButton };
