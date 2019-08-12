import { ReactNode } from 'react';
import styled from 'styled-components';

import abstractStyle from './styles/abstract';

export type Children = ReactNode[] | string | Element;

export interface AbstractButtonProps {
    children?: Children;
    disabled?: boolean;
    onClick(): void;
}

const AbstractButton = styled.button`
  ${abstractStyle}
`;

export { AbstractButton };
