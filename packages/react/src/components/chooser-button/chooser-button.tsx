import React, { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from '../../utils/uuid';
import { hiddenStyle } from '../visually-hidden/styles/visuallyhidden';
import { Label } from './styles/choose';

const Input = styled.input`
    ${hiddenStyle}
`;

interface ChooserButtonProps {
    defaultChecked?: boolean;
    checked?: boolean;
    children: ReactNode;
    groupName: string;
    type: 'radio' | 'checkbox';
    value?: string;

    onChange(event: ChangeEvent<HTMLInputElement>): void;
}

const ChooserButton = React.forwardRef(
    (
        {
            defaultChecked, checked, children, groupName, onChange, type, value,
        }: ChooserButtonProps,
        ref: React.Ref<HTMLInputElement>,
    ) => {
        const id = uuid();

        function handleChange(event: ChangeEvent<HTMLInputElement>): void {
            onChange(event);
        }

        return (
            <>
                <Input
                    checked={checked}
                    defaultChecked={defaultChecked}
                    id={id}
                    onChange={handleChange}
                    name={groupName}
                    ref={ref}
                    type={type}
                    value={value}
                />
                <Label htmlFor={id}>{children}</Label>
            </>
        );
    },
);

export { ChooserButton };
