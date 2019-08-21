import { ReactNode } from 'react';
import styled from 'styled-components';

import { abstractStyle } from './styles/abstract';

export interface AbstractButtonProps {
    children?: ReactNode;
    disabled?: boolean;
    onClick(): void;
}

const AbstractButton = styled.button`
  ${abstractStyle}
`;

export { AbstractButton };
