import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import styled from 'styled-components';

import { abstractStyle } from './styles/abstract';

type PartialButtonProps = Pick<DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>, 'type'>;

export interface AbstractButtonProps extends PartialButtonProps {
    children?: ReactNode;
    disabled?: boolean;

    onClick?(): void;
}

const AbstractButton = styled.button`
  ${abstractStyle}
`;

export { AbstractButton };
