import React, { ChangeEvent, ReactNode } from 'react';
import styled from 'styled-components';

import { hiddenStyle } from '../../a11y/styles/visuallyhidden';
import { chooseStyle } from './styles/choose';

const Input = styled.input<ForwardRefInput>`
  ${hiddenStyle}
`;

const Label = styled.label`
  ${chooseStyle}
`;

interface ForwardRefInput {
    ref: React.Ref<HTMLInputElement>;
}

interface ChooseInputProps {
    defaultChecked?: boolean;
    children: ReactNode;
    groupName: string;
    id: string;
    type: 'radio' | 'checkbox';
    value: string;
    onChange(value: string): void;
}

const ChooseInput = React.forwardRef(
    ({ defaultChecked, children, groupName, id, onChange, type, value }: ChooseInputProps,
        ref: React.Ref<HTMLInputElement>) => {

        const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
            onChange(event.target.value);
        };

        return (
            <>
                <Input
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

export { ChooseInput };
