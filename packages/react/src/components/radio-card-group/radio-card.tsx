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
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
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

export const RadioCard : VoidFunctionComponent<RadioCardProps> = ({
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
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const inputRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLLabelElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInputChecked, setInputCheck] = useState(defaultChecked);
    const dataAttributes = useDataAttributes(otherProps);

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, containerRef.current);

        if (clickIsOutside && inputRef.current) {
            setTimeout(() => setInputCheck(inputRef.current?.checked));
        }
    }, [containerRef, inputRef]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);

        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside]);

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        setInputCheck(inputRef.current?.checked);
        onChange?.(event);
    }

    function handleBlur(): void {
        setTimeout(() => setInputCheck(inputRef.current?.checked));
    }

    return (
        <S.Card
            className={className}
            data-testid={`radio-card-${value}-container`}
            disabled={disabled}
            isMobile={isMobile}
            isChecked={isInputChecked}
            ref={containerRef}
            onMouseDown={(e) => {
                labelRef.current?.click();
                e.preventDefault();
            }}
        >
            <S.HiddenInput
                checked={checked}
                data-testid={`radio-card-${value}-input`}
                defaultChecked={defaultChecked}
                disabled={disabled}
                id={id}
                isMobile={isMobile}
                name={name}
                ref={inputRef}
                required={required}
                type="radio"
                value={value}
                onBlur={handleBlur}
                onChange={handleChange}
                onMouseDown={(e) => e.preventDefault()}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            />
            <S.Label ref={labelRef} htmlFor={id}>
                <S.Title isChecked={checked} disabled={disabled} isMobile={isMobile}>
                    <S.RadioInput isChecked={checked} disabled={disabled} isMobile={isMobile} />
                    {label}
                </S.Title>
                <S.Description disabled={disabled} id={`description-${id}`} isMobile={isMobile} isChecked={isInputChecked}>
                    {children}
                </S.Description>
            </S.Label>
        </S.Card>
    );
};

export const isRadioCard = (child: unknown): child is ReactElement<RadioCardProps> => (
    isValidElement<RadioCardProps>(child) && child.type === RadioCard
);
