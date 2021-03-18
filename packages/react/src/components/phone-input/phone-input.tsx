import React, {useState, ChangeEvent, ReactElement} from 'react';
import styled from 'styled-components';
import { formatFromPattern } from "./phone-input-value-formater";

interface PhoneInputProps {
    defaultValue?: string;
    value: string;
    pattern: string;
}

function removeNonDigits(value: string): string {
    return value.replace(/\D/g, '');
}

const Container = styled.div`
    position: relative;
`;

const FormattedPhone = styled.div`
    background-color: #fff;
    left: 1px;
    pointer-events: none;
    position: absolute;
    top: 1px;
    width: 98%;
`;

export function PhoneInput({value, pattern}: PhoneInputProps): ReactElement {
    const [numberValue, setNumberValue] = useState(removeNonDigits(value));
    const [formattedValue, setFormattedValue] = useState(formatFromPattern(pattern, numberValue));

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const newValue = e.currentTarget.value;
        const newFormattedValue = formatFromPattern(pattern, newValue);

        setFormattedValue(newFormattedValue);
        setNumberValue(removeNonDigits(newValue));
    }

    return (
        <Container>
            <FormattedPhone>{formattedValue}</FormattedPhone>
            <input type="tel" value={numberValue} onChange={handleChange}/>
        </Container>
    )
}
