import { type FC } from 'react';
import styled, { StyledProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Icon } from '../icon';

interface StyledLiProps {
    isEmpty: boolean;
    isSuccess: boolean;
}

function getColor({ isEmpty, isSuccess, theme }: StyledProps<StyledLiProps>): string {
    if (isEmpty) {
        return theme.component['password-rule-empty-text-color'];
    }
    if (isSuccess) {
        return theme.component['password-rule-success-text-color'];
    }

    return theme.component['password-rule-error-text-color'];
}

interface ContainerProps {
    isEmpty: boolean;
    isSuccess: boolean;
}

const Container = styled.li<ContainerProps>`
    align-items: flex-start;
    color: ${getColor};
    display: ${({ isEmpty }) => (isEmpty ? 'list-item' : 'flex')};
    line-height: 1.25rem;
    list-style: ${({ isEmpty }) => (isEmpty ? 'disc inside' : 'none')};
    padding-left: var(--spacing-1x);

    ::marker {
        font-size: 0.688rem;
        line-height: 1rem;
        margin-right: 0;
    }
`;

const StyledIcon = styled(Icon)`
    margin-left: calc(var(--spacing-1x) * -1);
    margin-right: var(--spacing-1x);
`;

const StyledSpan = styled.span`
    line-height: 1.25rem;
    position: relative;
`;

interface PasswordConditionProps {
    label: string;
    isEmpty: boolean;
    isValid: boolean;
}

export const PasswordRule: FC<PasswordConditionProps> = ({
    label,
    isValid,
    isEmpty,
}) => {
    const { t } = useTranslation('common');

    let icon = null;
    if (!isEmpty) {
        if (isValid) {
            icon = (
                <StyledIcon
                    aria-hidden="true"
                    focusable={false}
                    name="check"
                    size="16"
                />
            );
        } else {
            icon = (
                <StyledIcon
                    aria-label={`${t('error')},`}
                    focusable
                    name="alertOctagon"
                    role="img"
                    size="16"
                />
            );
        }
    }

    return (
        <Container isEmpty={isEmpty} isSuccess={isValid}>
            {icon}
            <StyledSpan>{label}</StyledSpan>
        </Container>
    );
};

PasswordRule.displayName = 'PasswordRule';
