import React, { VoidFunctionComponent } from 'react';
import styled from 'styled-components';

const StyledSpan = styled.span`
    border: 0;
    clip: rect(0,0,0,0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
`;

interface Props {
    label: string;
}

export const ScreenReaderOnlyText: VoidFunctionComponent<Props> = ({ label }) => (
    <StyledSpan>{label}</StyledSpan>
);
