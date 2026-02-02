import { MouseEvent, ReactElement, VoidFunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
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

const StepLink = styled.a`
    display: inline-block;
    margin-top: calc(var(--size-2x) * -1);
    padding-top: var(--size-2x);
    text-decoration: none;
`;

const StyledStep = styled.li<{ $linear: boolean }>`
    align-items: center;
    color: ${({ theme }) => theme.component['progress-tracker-step-todo-text-color']};
    display: flex;
    flex-direction: column;
    font-weight: var(--font-normal);
    justify-content: flex-end;
    position: relative;
    text-align: center;

    &::before {
        align-items: center;
        background-color: ${({ theme }) => theme.component['progress-tracker-step-todo-background-color']};
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
        background-color: ${({ theme }) => theme.component['progress-tracker-bridge-empty-background-color']};
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
`;

const CompletedStep = styled(StyledStep)`
    &::before {
        background-color: ${({ theme }) => theme.component['progress-tracker-step-completed-background-color']};
        border-color: ${({ theme }) => theme.component['progress-tracker-step-completed-border-color']};
        color: ${({ theme }) => theme.component['progress-tracker-step-completed-text-color']};
        font-weight: var(--font-semi-bold);
    }

    &::after {
        ${({ $linear, theme }) => $linear && css`
            background-color: ${theme.component['progress-tracker-bridge-filled-background-color']};
        `}
    }

    ${Label} {
        color: ${({ theme }) => theme.component['progress-tracker-step-completed-label-text-color']};
    }
`;

const ActiveStep = styled(StyledStep)`
    &::before {
        border-color: ${({ theme }) => theme.component['progress-tracker-step-current-border-color']};
        border-width: 0.25rem;
        color: ${({ theme }) => theme.component['progress-tracker-step-current-text-color']};
        font-weight: var(--font-semi-bold);
        height: var(--size-2x);
        margin: -0.25rem auto 0;
        width: var(--size-2x);
    }

    &::after {
        ${({ $linear, theme }) => $linear && css`
            background-color: ${theme.component['progress-tracker-bridge-filled-background-color']};
        `}
    }

    ${Label} {
        color: ${({ theme }) => theme.component['progress-tracker-step-current-label-text-color']};
        font-weight: var(--font-semi-bold);
    }
`;

const UncompletedStep = styled(StyledStep)`
    &::before {
        border-color: ${({ theme }) => theme.component['progress-tracker-step-uncompleted-border-color']};
        color: ${({ theme }) => theme.component['progress-tracker-step-uncompleted-text-color']};
    }

    ${Label} {
        color: ${({ theme }) => theme.component['progress-tracker-step-uncompleted-label-text-color']};
    }
`;

const NotificationBadgeIcon = styled(Icon)`
    color: ${({ theme }) => theme.component['progress-tracker-notification-badge-color']};
    fill: ${({ theme }) => theme.component['progress-tracker-notification-badge-fill-color']};
    left: calc(50% + 0.25rem);
    position: absolute;
    top: -0.5rem;
`;

export interface ProgressTrackerStep {
    href?: string;
    label: string;
    completion?: 'completed' | 'uncompleted';
    onClick?: (stepNumber: number) => void;
}

interface ProgressTrackerProps {
    ariaLabel?: string;
    className?: string;
    linear?: boolean;
    steps: ProgressTrackerStep[];
    value: number;
}

interface StepProps {
    step: ProgressTrackerStep,
    stepNumber: number,
    value: number,
    linear: boolean
}

const Step: VoidFunctionComponent<StepProps> = ({
    step, stepNumber, value, linear,
}): ReactElement => {
    const { t } = useTranslation('progress-tracker');

    let StepComponent: typeof StyledStep;
    let dataTestId: string | undefined;
    let screenReaderText: string | undefined;
    const isLink = step.href || step.onClick;
    const showUncompletedIcon = !linear && step.completion === 'uncompleted';

    if (stepNumber === value) {
        dataTestId = 'progress-tracker-step-current';
        StepComponent = ActiveStep;
    } else if ((linear && stepNumber < value) || (!linear && step.completion === 'completed')) {
        dataTestId = 'progress-tracker-step-completed';
        screenReaderText = t('completedAriaLabel');
        StepComponent = CompletedStep;
    } else {
        dataTestId = 'progress-tracker-step-uncompleted';
        screenReaderText = t('uncompletedAriaLabel');
        StepComponent = UncompletedStep;
    }

    const content = (
        <>
            {showUncompletedIcon && <NotificationBadgeIcon name='alertCircle' size='16' aria-hidden="true" />}
            {step.label && <Label data-testid="progress-tracker-label">{step.label}</Label>}
            {screenReaderText && <ScreenReaderOnlyText label={screenReaderText} />}
        </>
    );

    const linkClickHandler = (event: MouseEvent<HTMLAnchorElement>): void => {
        if (!step.href) {
            event.preventDefault();
        }
        step.onClick?.(stepNumber);
    };

    return (
        <StepComponent
            key={stepNumber}
            data-testid={dataTestId}
            aria-current={stepNumber === value ? 'step' : undefined}
            $linear={linear}
        >
            {isLink ? (
                <StepLink href={step.href ?? '#'} onClick={step.onClick && linkClickHandler}>
                    {content}
                </StepLink>
            ) : (
                content
            )}
        </StepComponent>
    );
};
Step.displayName = 'Step';

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

    if (!ariaLabel) {
        console.warn('ariaLabel is required for Accessibility');
    }

    return (
        <Container className={className} aria-label={ariaLabel} as={hasAnyLink ? 'nav' : undefined}>
            <Steps data-testid="progress-tracker">
                {steps.map((step, index) => (
                    <Step
                        step={step}
                        stepNumber={index + 1}
                        value={clampValue}
                        linear={linear}
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                    />
                ))}
            </Steps>
        </Container>
    );
};

ProgressTracker.displayName = 'ProgressTracker';
