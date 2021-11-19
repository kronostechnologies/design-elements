import React, { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { ValidationCondition } from './validation-condition';

const StyledLi = styled.li<{ isEmpty: boolean, isSuccess: boolean }>`
    align-items: center;
    display: flex;
    height: 16px;
    padding-left: var(--spacing-1x);
    ::marker {
        line-height: 16px;
        font-size: 11px;
    }

    ${({ isSuccess, isEmpty, theme }) => {
        if (isEmpty) {
            return `
                color: ${theme.greys['dark-grey']}
                display: list-item;
                list-style-position: inside;
                list-style-type: disc;
            `;
        }

        if (isSuccess) {
            return `
                color: green;
                list-style: none;
            `;
        }
        return `
            color: red;
            list-style: none;
        `;
    }};
`;

const StyledIcon = styled(Icon)`
    margin-left: -6px;
    margin-right: 6px;
`;

const StyledSpan = styled.span`
    height: var(--spacing-2x);
    left: var(--spacing-1x);
    position: relative;
`;

interface PasswordConditionProps {
    condition: ValidationCondition;
    password: string;
    isEmpty: boolean;
}

export const PasswordCondition: VoidFunctionComponent<PasswordConditionProps> = ({
    condition,
    password,
    isEmpty,
}) => {
    const isValid = condition.isValid(password);

    return (
        <StyledLi isEmpty={isEmpty} isSuccess={isValid}>
            {!isEmpty ? (
                <StyledIcon size="16" name={isValid ? 'check' : 'alertTriangle'} aria-hidden="true" />
            ) : null}
            <StyledSpan>{condition.label}</StyledSpan>
        </StyledLi>
    );
};
