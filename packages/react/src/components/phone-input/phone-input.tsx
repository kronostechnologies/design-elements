import React, { useState, ChangeEvent, ReactElement, useMemo } from 'react';
import styled from 'styled-components';
import { formatFromPattern, removeNonDigits } from './phone-input-value-formater';
import { TextInput } from '../text-input/text-input';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

interface PhoneInputProps {
    value: string;
    pattern: string;
}

const MaskContainer = styled.div<{isMobile: boolean}>`
    background: transparent;
    color: ${({ theme }) => theme.greys['dark-grey']};
    font-family: inherit;
    font-size: ${({ isMobile }) => (isMobile ? '1' : '0.875')}rem;
    left: 2px;
    letter-spacing: ${({ isMobile }) => (isMobile ? '0.02875' : '0.015')}rem;
    line-height: 1.5rem;
    margin: 0;
    outline: none;
    padding: var(--spacing-half) var(--spacing-1x);
    pointer-events: none;
    position: absolute;
    top: 1px;
`;

const Container = styled.div`
    position: relative;

    &:focus-within ${MaskContainer} {
        color: ${({ theme }) => theme.greys.black};
    }
`;

const InputDuplicatedValue = styled.span`
    color: transparent;
`;

// Don't forget to change the MATCH_ALL_PLACEHOLDER_CHAR_OCCURRENCE_REGEX also when changing placeholder char value.
const PLACEHOLDER_CHAR = '_';
const MATCH_ALL_PLACEHOLDER_CHAR_OCCURRENCE_REGEX = /_/g;

function getNumberMaxLengthFromPattern(pattern: string): number {
    const occurrences = pattern.match(MATCH_ALL_PLACEHOLDER_CHAR_OCCURRENCE_REGEX) || [];
    return occurrences.length;
}

function getLastNumericCharOccurrenceIndex(startIndex: number, value: string): number {
    let currentIndex = startIndex;
    while (value.charAt(currentIndex).match(/\D/g)) {
        currentIndex -= 1;
    }

    return currentIndex;
}

export function PhoneInput({ value, pattern }: PhoneInputProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const [numberValue, setNumberValue] = useState(removeNonDigits(value));
    const [maskValue, setMaskValue] = useState(formatFromPattern(pattern, PLACEHOLDER_CHAR, numberValue));
    const numberMaxLength = useMemo(() => getNumberMaxLengthFromPattern(pattern), [pattern]);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const valueWithoutNonDigits = removeNonDigits(e.currentTarget.value);
        const newValue = valueWithoutNonDigits.substr(0, numberMaxLength);
        const newFormattedValue = formatFromPattern(pattern, PLACEHOLDER_CHAR, newValue);
        const indexOfFirstMaskChar = newFormattedValue.indexOf(PLACEHOLDER_CHAR);

        if (indexOfFirstMaskChar === -1) {
            setMaskValue('');
            setNumberValue(newFormattedValue);
        } else {
            const lastNumericCharOccurrenceIndex = getLastNumericCharOccurrenceIndex(
                indexOfFirstMaskChar - 1,
                newFormattedValue,
            );

            const splitIndex = lastNumericCharOccurrenceIndex + 1;
            setMaskValue(newFormattedValue.slice(splitIndex));
            setNumberValue(newFormattedValue.slice(0, splitIndex));
        }
    }

    return (
        <Container>
            <MaskContainer isMobile={isMobile}>
                <InputDuplicatedValue>{numberValue}</InputDuplicatedValue>
                <span>{maskValue}</span>
            </MaskContainer>
            <TextInput type="tel" value={numberValue} onChange={handleChange} />
        </Container>
    );
}
