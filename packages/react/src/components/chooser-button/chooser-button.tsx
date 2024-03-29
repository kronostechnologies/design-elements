import { ChangeEvent, ChangeEventHandler, forwardRef, ReactNode, Ref, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import { v4 as uuid } from '../../utils/uuid';
import { useDataAttributes } from '../../hooks/use-data-attributes';
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

export const ChooserButton = forwardRef(
    (
        {
            defaultChecked,
            checked,
            children,
            groupName,
            onChange,
            type,
            value,
            ...otherProps
        }: ChooserButtonProps,
        ref: Ref<HTMLInputElement>,
    ) => {
        const id = useMemo(() => uuid(), []);
        const dataAttributes = useDataAttributes(otherProps);

        const handleChange: ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
            onChange(event);
        }, [onChange]);

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
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                />
                <Label htmlFor={id}>{children}</Label>
            </>
        );
    },
);

ChooserButton.displayName = 'ChooserButton';
