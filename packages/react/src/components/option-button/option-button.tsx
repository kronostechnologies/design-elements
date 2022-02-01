import { useMemo, VoidFunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuid } from '../../utils/uuid';
import { useDataAttributes } from '../../hooks/use-data-attributes';

const Input = styled.input`
    ${({ theme }) => css`
            position: absolute;
            z-index: -1;

            + label {
                align-items: center;
                background-color: ${theme.greys.white};
                border: 1px solid ${theme.greys.grey};
                border-radius: var(--border-radius-2x);
                color: ${theme.greys['dark-grey']};
                display: flex;
                font-size: 1.5rem;
                justify-content: center;
                min-height: 40px;
            }

            &:checked + label {
                background-color: ${theme.main['primary-1.1']};
                border-color: ${theme.main['primary-1.1']};
                color: ${theme.greys.white};
            }
      `}
`;

interface OptionButtonProps {
    checked?: boolean;
    className?: string;
    label: string;
    name: string;
    value: number;
}

export const OptionButton: VoidFunctionComponent<OptionButtonProps> = ({
    checked,
    className,
    label,
    name,
    value,
    ...otherProps
}: OptionButtonProps) => {
    const id = useMemo(uuid, []);
    const dataAttributes = useDataAttributes(otherProps);

    return (
        <div className={className}>
            <Input
                checked={checked}
                id={id}
                name={name}
                type="radio"
                value={value}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
            <label htmlFor={id}>{label}</label>
        </div>
    );
};
