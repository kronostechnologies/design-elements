import { ReactNode } from 'react';
import styled from 'styled-components';

import { styles } from './styles/abstract';

export type Child = ReactNode | ReactNode[];

export interface AbstractButtonProps {
    children?: Child;
    disabled?: boolean;
    onClick(): void;
}

const AbstractButton = styled.button`
  ${styles}
`;

export { AbstractButton };
