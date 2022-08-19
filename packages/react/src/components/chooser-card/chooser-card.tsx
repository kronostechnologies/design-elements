import {
    ChangeEvent,
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

interface ChooserCardProps {
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

export const ChooserCard : VoidFunctionComponent<ChooserCardProps> = ({
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
    const containerRef = useRef<HTMLLabelElement>(null);
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
        <S.Label
            className={className}
            data-testid={`chooser-card-${value}-container`}
            disabled={disabled}
            isMobile={isMobile}
            isChecked={isInputChecked}
            ref={containerRef}
            onMouseDown={(e) => e.preventDefault()}
        >
            <S.InputContainer
                disabled={disabled}
                isMobile={isMobile}
                isChecked={isInputChecked}
                key={`${name}-${value}`}
            >
                {label}
                <S.HiddenInput
                    aria-describedby={`description-${id}`}
                    checked={checked}
                    data-testid={`chooser-card-${value}-input`}
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
                <S.RadioInput disabled={disabled} isMobile={isMobile} />
            </S.InputContainer>
            <S.Description aria-hidden disabled={disabled} id={`description-${id}`} isMobile={isMobile} isChecked={isInputChecked}>
                {children}
            </S.Description>
        </S.Label>
    );
};
