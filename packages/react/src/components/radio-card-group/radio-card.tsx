import {
    ChangeEvent,
    isValidElement,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    VoidFunctionComponent,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { RadioInput } from '../radio-button/radio-input';
import * as S from './styled-components';

export interface RadioCardProps {
    checked?: boolean;
    children?: ReactNode;
    className?: string;
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
    className,
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
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const dataAttributes = useDataAttributes(otherProps);
    const [isChecked, setIsChecked] = useState(defaultChecked ?? checked);

    if (checked !== undefined && checked !== isChecked) {
        setIsChecked(checked);
    }

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, labelRef.current);

        if (clickIsOutside && inputRef.current) {
            setTimeout(() => setIsChecked(inputRef.current?.checked));
        }
    }, [labelRef, inputRef]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);

        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside]);

    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
        setIsChecked(event.target.checked);
        onChange?.(event);
    }, [onChange]);

    const handleBlur = useCallback((): void => {
        setTimeout(() => setIsChecked(inputRef.current?.checked));
    }, []);

    return (
        <S.Label
            $isChecked={isChecked}
            $isDisabled={disabled}
            $isMobile={isMobile}
            htmlFor={id}
            className={className}
            ref={labelRef}
            onBlur={handleBlur}
            data-testid={`radio-card-${value}-label`}
            onMouseDown={(e) => {
                inputRef.current?.click();
                e.preventDefault();
            }}
        >
            <StyledRadioInput
                checked={checked}
                data-testid={`radio-card-${value}-input`}
                defaultChecked={defaultChecked}
                disabled={disabled}
                id={id}
                name={name}
                ref={inputRef}
                required={required}
                value={value}
                onChange={handleChange}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
            <S.CardContent>
                <S.Title $isMobile={isMobile}>
                    {label}
                </S.Title>
                <S.Description id={`description-${id}`} $isMobile={isMobile}>
                    {children}
                </S.Description>
            </S.CardContent>
        </S.Label>
    );
};

RadioCard.displayName = 'RadioCard';

export const isRadioCard = (child: unknown): child is ReactElement<RadioCardProps> => (
    isValidElement<RadioCardProps>(child) && child.type === RadioCard
);
