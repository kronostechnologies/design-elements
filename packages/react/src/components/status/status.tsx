import { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { Theme } from '../../themes';

export type StatusType = 'enabled' | 'disabled' | 'blocked';

function getBackgroundColor(type: StatusType, theme: Theme): string {
    switch (type) {
        case 'enabled':
            return theme.ref['color-success-50'];
        case 'disabled':
            return theme.ref['color-white'];
        case 'blocked':
            return theme.ref['color-alert-50'];
    }
}

const Wrapper = styled.div<{ type: StatusType }>`
    align-items: center;
    display: flex;

    ${({ type, theme }) => type === 'disabled' && `color: ${theme.ref['color-neutral-65']}`}
`;

const Circle = styled.div<{ type: StatusType }>`
    background-color: ${({ type, theme }) => getBackgroundColor(type, theme)};
    border: ${({ type, theme }) => (type === 'disabled' ? `1px solid ${theme.ref['color-neutral-65']}` : 'none')};
    border-radius: 50%;
    box-sizing: border-box;
    height: 0.625rem;
    margin-right: var(--spacing-1halfx);
    width: 0.625rem;
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
