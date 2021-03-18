import React, { Dispatch, ChangeEvent, ReactElement, useState, SetStateAction } from 'react';
import { TextInputProps } from '../text-input/text-input';
import styled from 'styled-components';

interface MaskedInputProps extends TextInputProps {
    defaultValue: string;
    charset?: string;
}

function handleChange(event: ChangeEvent<HTMLInputElement>, setValue: Dispatch<SetStateAction<string>>, charset: string | undefined): void {
    const inputNewValue = handleCurrentValue(event, charset);
    setValue(inputNewValue);
}

function handleCurrentValue(event: ChangeEvent<HTMLInputElement>, charset: string | undefined) {
    console.log(charset);
    console.log(event.target.getAttribute('placeholder'));
    let isCharsetPresent = charset,
        maskedNumber = 'XMDY',
        maskedLetter = '_',
        placeholder = isCharsetPresent || event.target.getAttribute('placeholder'),
        value = event.target.value, l = placeholder?.length, newValue = '',
        i, j, isInt, isLetter, strippedValue, matchesNumber, matchesLetter;

    // strip special characters
    strippedValue = isCharsetPresent ? value.replace(/\W/g, "") : value.replace(/\D/g, "");

    l = l ?? 0;
    placeholder = placeholder ?? "";
    for (i = 0, j = 0; i < l; i++) {
        isInt = !isNaN(parseInt(strippedValue[j]));
        isLetter = strippedValue[j] ? strippedValue[j].match(/[A-Z]/i) : false;
        matchesNumber = (maskedNumber.indexOf(placeholder[i]) >= 0);
        matchesLetter = (maskedLetter.indexOf(placeholder[i]) >= 0);
        if ((matchesNumber && isInt) || (isCharsetPresent && matchesLetter && isLetter)) {
            newValue += strippedValue[j++];
        } else if ((!isCharsetPresent && !isInt && matchesNumber) || (isCharsetPresent && ((matchesLetter && !isLetter) || (matchesNumber && !isInt)))) {
            //this.options.onError( e ); // write your own error handling function
            return newValue;
        } else {
            newValue += placeholder[i];
        }
        // break if no characters left and the pattern is non-special character
        if (strippedValue[j] == undefined) {
            break;
        }
    }

    return newValue;
}

const Container = styled.span`
    position: relative;
    line-height: 1;
`;

const Mask = styled.span`
    font-size: 16px;
    font-family: monospace;
    padding-right: 10px;
    background-color: transparent;
    text-transform: uppercase;
    position: absolute;
    left: 3px;
    top: 1px;
    pointer-events: none;
    z-index: -1;
    line-height: 1;
`;

const MaskValue = styled.i`
    font-style: normal;
    color: transparent;
    opacity: 0;
    visibility: hidden;
    font-size: 16px;
    font-family: monospace;
    text-transform: uppercase;
    pointer-events: none;
`;

const HiddenTextInput = styled.input`
      position: absolute;
      font-size: 16px;
      font-family: monospace;
      padding-right: 10px;
      background-color: transparent;
      text-transform: uppercase;
`;

export const MaskedInput = React.forwardRef(({
         defaultValue,
         charset,
         ...props
}: MaskedInputProps, ref: React.Ref<HTMLInputElement>): ReactElement => {
    const {
        placeholder,
    } = props;
    const [value, setValue] = useState(defaultValue);

    return (
        <Container>
           <Mask aria-hidden="true"><MaskValue>{value}</MaskValue></Mask>
           <HiddenTextInput
               ref={ref}
               placeholder={placeholder}
               onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event, setValue, charset)}
           />
        </Container>
    );
});
