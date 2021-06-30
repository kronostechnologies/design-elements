import React, { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';

export type StatusType = 'enabled' | 'disabled' | 'blocked';

function getBackgroundColor(type: StatusType, theme: Theme): string {
    switch (type) {
        case 'enabled':
            return theme.notifications['success-1.1'];
        case 'disabled':
            return theme.greys.white;
        case 'blocked':
            return theme.notifications['error-2.1'];
    }
}

const Wrapper = styled.div<{ type: StatusType }>`
    align-items: center;
    display: flex;

    ${({ type, theme }) => type === 'disabled' && `color: ${theme.greys['dark-grey']}`}
`;

const Circle = styled.div<{ type: StatusType }>`
    background-color: ${({ type, theme }) => getBackgroundColor(type, theme)};
    border: ${({ type, theme }) => (type === 'disabled' ? `1px solid ${theme.greys['dark-grey']}` : 'none')};
    border-radius: 50%;
    box-sizing: border-box;
    height: 10px;
    margin-right: calc(var(--spacing-base) * 1.5);
    width: 10px;
`;

interface Props {
    className?: string;
    label: string;
    type: StatusType;
}

export const Status: VoidFunctionComponent<Props> = ({ className, label, type }) => (
    <Wrapper className={className} type={type}>
        <Circle type={type} />
        <span>{label}</span>
    </Wrapper>
);
