import { type FC } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';

const StyledSpan = styled.span`
    border: 0;
    clip: rect(0, 0, 0, 0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

export interface ScreenReaderOnlyTextProps {
    label: string;
}

export const ScreenReaderOnlyText: FC<ScreenReaderOnlyTextProps> = ({ label, ...otherProps }) => {
    const dataAttributes = useDataAttributes(otherProps);

    return (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <StyledSpan {...dataAttributes}>{label}</StyledSpan>
    );
};

ScreenReaderOnlyText.displayName = 'ScreenReaderOnlyText';
