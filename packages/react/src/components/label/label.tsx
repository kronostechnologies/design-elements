import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { DeviceType } from '../field-container/field-container';

const StyledLabel = styled.label<{device: DeviceType}>`
    color: ${props => props.theme.greys.black};
    display: block;
    font-size: ${props => props.device === 'mobile' ? '0.875rem' : '0.75rem'};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${props => props.device === 'mobile' ? '1.5rem' : '1.25rem'};
    margin: 0;
    width: fit-content;

    input + & {
        margin-left: var(--spacing-half);
    }
`;

interface LabelProps {
    children: ReactNode;
    device?: DeviceType;
    forId: string;
}

const Label = ({ children, device = 'desktop', forId }: LabelProps) => (
    <StyledLabel htmlFor={forId} device={device}>
        {children}
    </StyledLabel>
);

export { Label };
