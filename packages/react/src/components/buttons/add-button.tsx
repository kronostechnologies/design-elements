import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { Button } from './button';

type ButtonType = 'primary' | 'secondary' | 'tertiary';

type Type = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>['type'];

const PlusIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

interface ButtonProps {
    /**
     * Visual style
     * @default primary
     **/
    buttonType: ButtonType;
    /**
     * Sets button type
     * @default submit
     */
    type?: Type;
    label?: string;
    children?: ReactNode;
    disabled?: boolean;

    onClick?(): void;
}

export function AddButton({ type = 'submit', ...props }: ButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <Button type={type} {...props}>
            <PlusIcon name="plusSign" size={isMobile ? '24' : '16'} />
        </Button>
    );
}
