import { VoidFunctionComponent } from 'react';
import styled, { css } from 'styled-components';

import { useTranslation } from '../../i18n/use-translation';
import { Icon } from '../icon/icon';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: var(--size-2x);
    width: 1.4375rem;
`;

const buttonStyles = css`
    align-items: center;
    background-color: ${({ theme }) => theme.greys.white};
    border: 1px solid ${({ theme }) => theme.greys['dark-grey']};
    border-left: none;
    color: ${({ theme }) => theme.greys['dark-grey']};
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
    }
`;

const IncrementButton = styled.button`
    ${buttonStyles};

    border-bottom: none;
    border-radius: 0 var(--border-radius) 0 0;
    height: calc(50% - 1px);

    > svg {
        color: inherit;
        height: var(--size-1x);
        width: var(--size-1x);
    }
`;

const DecrementButton = styled.button`
    ${buttonStyles};

    border-radius: 0 0 var(--border-radius) 0;
    height: calc(50% + 1px);

    > svg {
        height: var(--size-1x);
        width: var(--size-1x);
    }
`;

interface StepperButtonsProps {
    disabled?: boolean;
    onIncrement?(): void;
    onDecrement?(): void;
}

export const StepperButtons: VoidFunctionComponent<StepperButtonsProps> = ({ disabled, onIncrement, onDecrement }) => {
    const { t } = useTranslation('stepper-buttons');

    return (
        <Wrapper>
            <IncrementButton
                aria-label={t('increment-button-aria-label')}
                data-testid="stepper-button-increment"
                tabIndex={-1}
                type="button"
                onClick={onIncrement}
                disabled={disabled}
            >
                <Icon aria-hidden="true" name="chevronUp" size="16" />
            </IncrementButton>
            <DecrementButton
                aria-label={t('decrement-button-aria-label')}
                data-testid="stepper-button-decrement"
                tabIndex={-1}
                type="button"
                onClick={onDecrement}
                disabled={disabled}
            >
                <Icon aria-hidden="true" name="chevronDown" size="16" />
            </DecrementButton>
        </Wrapper>
    );
};
