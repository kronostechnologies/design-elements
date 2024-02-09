import { ReactElement, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { Icon } from '../icon/icon';
import { ScreenReaderOnlyText } from '../screen-reader-only-text/ScreenReaderOnlyText';
import { clamp } from '../../utils/math';

const Container = styled.section`
    padding: var(--spacing-2x) 0;
    position: relative;
    width: 100%;
`;

const Steps = styled.ol`
    align-items: start;
    counter-reset: step;
    display: grid;
    grid-auto-columns: unset;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fit, minmax(1rem, 1fr));
    margin: 0;
    padding: 0;
`;

const Label = styled.span`
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    letter-spacing: 0.0125rem;
    line-height: 1.25rem;
    margin-top: var(--spacing-half);
`;

const Step = styled.li<{ $linear: boolean }>`
    color: ${({ theme }) => theme.main['primary-3']};
    display: flex;
    flex-direction: column;
    font-weight: var(--font-normal);
    justify-content: flex-end;
    position: relative;
    text-align: center;

    &::before {
        align-items: center;
        background-color: ${({ theme }) => theme.greys.white};
        border: 0.125rem solid;
        border-radius: 50%;
        box-sizing: border-box;
        color: #1b1c1e;
        content: counter(step);
        counter-increment: step;
        display: flex;
        font-size: 0.75rem;
        height: var(--size-1halfx);
        justify-content: center;
        margin: 0 auto 0.25rem;
        text-align: center;
        width: var(--size-1halfx);
    }

    &::after {
        background-color: ${({ theme }) => theme.greys.grey};
        content: '';
        height: 0.25rem;
        left: calc(-50% - 0.5rem);
        position: absolute;
        top: 0.625rem;
        width: 100%;
        z-index: -1;
    }

    &:first-child::after {
        content: none;
    }

    a {
        margin-top: calc(var(--size-2x) * -1);
        padding-top: var(--size-2x);
        text-decoration: none;
    }
`;

const CompletedStep = styled(Step)`
    &::before {
        background-color: ${({ theme }) => theme.main['primary-3']};
        border-color: ${({ theme }) => theme.main['primary-3']};
        color: ${({ theme }) => theme.greys.white};
        font-weight: var(--font-bold);
    }

    &::after {
        background-color: ${({ $linear, theme }) => $linear && theme.main['primary-3']};
    }

    ${Label} {
        color: ${({ theme }) => theme.main['primary-1.1']};
    }
`;

const CurrentStep = styled(Step)`
    &::before {
        border-color: ${({ theme }) => theme.main['primary-3']};
        border-width: 0.25rem;
        color: ${({ theme }) => theme.main['primary-1.3']};
        font-weight: var(--font-bold);
        height: var(--size-2x);
        margin: -0.25rem auto 0;
        width: var(--size-2x);
    }

    &::after {
        background-color: ${({ $linear, theme }) => $linear && theme.main['primary-3']};
    }

    ${Label} {
        color: ${({ theme }) => theme.main['primary-1.3']};
        font-weight: var(--font-bold);
    }
`;

const IncompleteIcon = styled(Icon)`
    left: calc(50% + 0.25rem);
    position: absolute;
    top: -0.5rem;
`;

const IncompleteStep = styled(Step)`
    &::before {
        border-color: ${({ theme }) => theme.greys['mid-grey']};
        color: ${({ theme }) => theme.greys['neutral-90']};
    }

    ${Label} {
        color: ${({ theme }) => theme.greys['dark-grey']};
    }
`;

export interface ProgressTrackerStep {
    href?: string;
    label?: string;
    nonLinearState?: 'incomplete' | 'completed' | 'default';
    onClick?: (stepNumber: number) => void;
}

interface ProgressTrackerProps {
    ariaLabel?: string;
    className?: string;
    linear?: boolean;
    steps: ProgressTrackerStep[];
    value: number;
}

function renderStep(step: ProgressTrackerStep, stepNumber: number, value: number, linear: boolean): ReactElement {
    let StepComponent: typeof Step;
    let dataTestId: string | undefined;
    let screenReaderText: string | undefined;
    const isLink = step.href || step.onClick;
    const showIncompleteIcon = !linear && step.nonLinearState === 'incomplete';

    if (stepNumber === value) {
        dataTestId = 'progress-tracker-step-current';
        StepComponent = CurrentStep;
    } else if ((linear && stepNumber < value) || (!linear && step.nonLinearState === 'completed')) {
        dataTestId = 'progress-tracker-step-completed';
        screenReaderText = 'completed';
        StepComponent = CompletedStep;
    } else {
        dataTestId = 'progress-tracker-step-incomplete';
        screenReaderText = 'not completed';
        StepComponent = IncompleteStep;
    }

    const content = (
        <>
            {showIncompleteIcon && <IncompleteIcon name='alertFilledRound' size='16' />}
            {step.label && <Label data-testid="progress-tracker-label">{step.label}</Label>}
            {screenReaderText && <ScreenReaderOnlyText label={screenReaderText} />}
        </>
    );

    const linkClickHandler = (event: React.MouseEvent<HTMLAnchorElement>): void => {
        if (!step.href) {
            event.preventDefault();
        }
        step.onClick!(stepNumber);
    };

    return (
        <StepComponent
            key={stepNumber}
            data-testid={dataTestId}
            aria-current={stepNumber === value ? 'step' : undefined}
            $linear={linear}
        >
            {isLink ? (
                <a href={step.href ?? '#'} onClick={step.onClick && linkClickHandler}>
                    {content}
                </a>
            ) : (
                content
            )}
        </StepComponent>
    );
}

export const ProgressTracker: VoidFunctionComponent<ProgressTrackerProps> = ({
    ariaLabel,
    linear = true,
    className,
    steps,
    value,
}) => {
    const max = steps.length;
    const clampValue = clamp(value, 1, max);
    const hasAnyLink = steps.some((step) => step.href || step.onClick);

    return (
        <Container className={className} aria-label={ariaLabel} as={hasAnyLink ? 'nav' : undefined}>
            <Steps data-testid="progress-tracker">
                {steps.map((step, stepNumber) => renderStep(step, stepNumber + 1, clampValue, linear))}
            </Steps>
        </Container>
    );
};
