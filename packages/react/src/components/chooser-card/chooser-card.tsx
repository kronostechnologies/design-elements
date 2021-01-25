import React, { ChangeEvent, ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInputFocused, setInputFocus] = useState(false);
    const [isInputChecked, setInputCheck] = useState(defaultChecked);

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !containerRef.current?.contains(event.target as Node);

        if (clickIsOutside && inputRef.current) {
            setTimeout(() => setInputCheck(inputRef.current?.checked));
        }
    }, [containerRef, inputRef]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);

        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside]);

    function handleClick(): void {
        inputRef.current?.click();
        inputRef.current?.focus();
    }

    function handleChange(event: ChangeEvent<HTMLInputElement>): void {
        setInputCheck(inputRef.current?.checked);
        onChange?.(event);
    }

    function handleBlur(): void {
        setInputFocus(false);
        setTimeout(() => setInputCheck(inputRef.current?.checked));
    }

    return (
        <S.Container
            className={className}
            data-testid={`chooser-card-${value}-container`}
            disabled={disabled}
            isFocused={isInputFocused}
            isMobile={isMobile}
            isSelected={isInputChecked}
            ref={containerRef}
            onClick={handleClick}
            onMouseDown={(e) => e.preventDefault()}
        >
            <S.Label
                disabled={disabled}
                htmlFor={id}
                isMobile={isMobile}
                isSelected={isInputChecked}
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
                    onFocus={() => setInputFocus(true)}
                    onMouseDown={(e) => e.preventDefault()}
                />
                <S.RadioInput disabled={disabled} isMobile={isMobile} />
            </S.Label>
            <S.Description disabled={disabled} id={`description-${id}`} isMobile={isMobile} isSelected={isInputChecked}>
                {children}
            </S.Description>
        </S.Container>
    );
}
