import {
    ChangeEvent,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import * as S from './styled-components';
import { eventIsInside } from '../../utils/events';

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

export function ChooserCard({
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
}: ChooserCardProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const inputRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLLabelElement>(null);
    const [isInputChecked, setInputCheck] = useState(defaultChecked);

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
                />
                <S.RadioInput disabled={disabled} isMobile={isMobile} />
            </S.InputContainer>
            <S.Description aria-hidden disabled={disabled} id={`description-${id}`} isMobile={isMobile} isChecked={isInputChecked}>
                {children}
            </S.Description>
        </S.Label>
    );
}
