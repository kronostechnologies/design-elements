import React, { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { hiddenStyle } from '../../a11y/styles/visuallyhidden';
import { chooseStyle } from './styles/choose';

const Input = styled.input`
  ${hiddenStyle}
`;

const Label = styled.label`
  ${chooseStyle}
`;

interface ChooseInputProps {
    defaultChecked?: boolean;
    checked?: boolean;
    children: ReactNode;
    groupName: string;
    type: 'radio' | 'checkbox';
    value?: string;

    onChange(event: ChangeEvent<HTMLInputElement>): void;
}

const ChooseInput = React.forwardRef(
    ({ defaultChecked, checked, children, groupName, onChange, type, value }: ChooseInputProps,
     ref: React.Ref<HTMLInputElement>) => {
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
    });

export { ChooseInput };
