import { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { ResolvedTheme } from '../../themes/theme';

export type StatusType = 'enabled' | 'disabled' | 'blocked';

function getCircleBorderStyle({ theme, type }: {theme: ResolvedTheme, type: StatusType}): string {
    if (type === 'disabled') {
        return `1px solid ${theme.component['status-circle-disabled-border-color']}`;
    }
    return 'none';
}

const Wrapper = styled.div<{ type: StatusType }>`
    align-items: center;
    display: flex;
    ${({ type, theme }) => type === 'disabled' && `color: ${theme.component['status-disabled-text-color']}`};
`;

const Circle = styled.div<{ type: StatusType }>`
    background-color: ${({ theme, type }) => theme.component[`status-circle-${type}-background-color`]};
    border: ${getCircleBorderStyle};
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

Status.displayName = 'Status';
