import {
    ChangeEvent,
    isValidElement,
    ReactElement,
    ReactNode,
    useMemo,
    VoidFunctionComponent,
} from 'react';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { v4 as uuid } from '../../utils/uuid';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { RadioInput } from '../radio-button/radio-input';
import * as S from './styled-components';

export interface RadioCardProps {
    checked?: boolean;
    children?: ReactNode;
    defaultChecked?: boolean;
    disabled?: boolean;
    id?: string;
    name: string;
    label: string;
    required?: boolean;
    value: string;

    onChange?(event: ChangeEvent<HTMLInputElement>): void;
}

const StyledRadioInput = styled(RadioInput)`
    margin-top: var(--spacing-half);
`;

export const RadioCard: VoidFunctionComponent<RadioCardProps> = ({
    checked,
    children,
    defaultChecked,
    disabled,
    name,
    id: providedId,
    label,
    required,
    value,
    onChange,
    ...otherProps
}) => {
    const { isMobile } = useDeviceContext();
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const dataAttributes = useDataAttributes(otherProps);

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        onChange?.(event);
    }

    return (
        <S.Label isDisabled={disabled} isMobile={isMobile} htmlFor={id}>
            <StyledRadioInput
                checked={checked}
                data-testid={`radio-card-${value}-input`}
                defaultChecked={defaultChecked}
                disabled={disabled}
                id={id}
                isMobile={isMobile}
                name={name}
                required={required}
                value={value}
                onChange={handleChange}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
            <S.CardContent>
                <S.Title isMobile={isMobile}>
                    {label}
                </S.Title>
                <S.Description id={`description-${id}`} isMobile={isMobile}>
                    {children}
                </S.Description>
            </S.CardContent>
        </S.Label>
    );
};

export const isRadioCard = (child: unknown): child is ReactElement<RadioCardProps> => (
    isValidElement<RadioCardProps>(child) && child.type === RadioCard
);
