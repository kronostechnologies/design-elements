import { TFunction } from 'i18next';
import { VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { PasswordStrengthMeter } from './password-strength-meter';
import { PasswordStrengthEnum } from './password-strength.enum';

const PasswordStrengthLabel = styled.div`
    color: ${({ theme }) => theme.component['password-strength-label-text-color']};
    font-size: 0.75rem;
    line-height: 1.25rem;
`;

interface PasswordStrengthContainerProps {
    strength: PasswordStrengthEnum;
    id: string;
}

function getPasswordStrengthLabel(strength: PasswordStrengthEnum, t: TFunction): string {
    switch (strength) {
        case PasswordStrengthEnum.NONE:
            return '';
        case PasswordStrengthEnum.WEAK:
            return t('password-strength') + t('weak');
        case PasswordStrengthEnum.FAIR:
            return t('password-strength') + t('fair');
        case PasswordStrengthEnum.GOOD:
            return t('password-strength') + t('good');
        case PasswordStrengthEnum.STRONG:
            return t('password-strength') + t('strong');
    }
}

export const PasswordStrengthContainer: VoidFunctionComponent<PasswordStrengthContainerProps> = ({
    strength,
    id,
}) => {
    const { t } = useTranslation('password-creation-input');
    return (
        <>
            <PasswordStrengthMeter strength={strength} />
            <PasswordStrengthLabel
                id={id}
                aria-live="polite"
                aria-hidden="true"
                data-testid="password-strength"
            >
                {getPasswordStrengthLabel(strength, t)}
            </PasswordStrengthLabel>
        </>
    );
};

PasswordStrengthContainer.displayName = 'PasswordStrengthContainer';
