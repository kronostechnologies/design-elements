import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';

import { Icon } from '../icon/icon';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 32px;
    width: 23px;
`;

const ButtonStyles = css`
    align-items: center;
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-left: none;
    color: ${({ theme }) => theme.greys['dark-grey']};
    cursor: pointer;
    display: flex;
    justify-content: center;
    padding: 0 var(--spacing-half);

    &:focus {
        outline: none;
    }

    &:hover {
        background-color: ${({ theme }) => theme.greys.grey};
    }

    &:disabled {
        background-color: ${({ theme }) => theme.greys['light-grey']};
        border-color: ${({ theme }) => theme.greys.grey};
        color: ${({ theme }) => theme.greys['mid-grey']};
        cursor: default;
    }
`;

const IncrementButton = styled.button`
    ${ButtonStyles}

    border-bottom: none;
    border-radius: 0 var(--border-radius) 0 0;
    height: calc(50% - 1px);
`;

const DecrementButton = styled.button`
    ${ButtonStyles}

    border-radius: 0 0 var(--border-radius) 0;
    height: calc(50% + 1px);
`;

interface StepperButtonsProps {
    disabled?: boolean;
    onIncrement?(): void;
    onDecrement?(): void;
}

export function StepperButtons({ disabled, onIncrement, onDecrement }: StepperButtonsProps): ReactElement {
    return (
        <Wrapper>
            <IncrementButton
                data-testid="stepper-button-increment"
                type="button"
                onClick={onIncrement}
                disabled={disabled}
            >
                <Icon name="chevronUp" size="16" />
            </IncrementButton>
            <DecrementButton
                data-testid="stepper-button-decrement"
                type="button"
                onClick={onDecrement}
                disabled={disabled}
            >
                <Icon name="chevronDown" size="16" />
            </DecrementButton>
        </Wrapper>
    );
}
