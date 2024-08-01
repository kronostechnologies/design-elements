import { Fragment, FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../../device-context-provider/device-context-provider';
import { Tooltip } from '../../tooltip/tooltip';
import { useTranslation } from '../../../i18n/use-translation';
import { LabelProps, RequiredLabelProps } from './types';

const StyledWrapper = styled.div`
    align-items: center;
    display: flex;
`;

const StyledLabel = styled.label<{ $isMobile: boolean, $disabled: boolean }>`
    color: ${({ $disabled, theme }) => ($disabled ? theme.component['label-disabled-text-color'] : theme.component['label-text-color'])};
    display: block;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '1.25rem')};
    margin: 0;
    width: fit-content;

    input + & {
        margin-left: var(--spacing-half);
    }
`;

const StyledTooltip = styled(Tooltip)`
    margin-left: calc(var(--spacing-1x) * 1.5);
`;

const RequiredLabel: FunctionComponent<RequiredLabelProps> = ({ type }) => {
    const { t } = useTranslation('text-input');

    switch (type) {
        case 'text':
        default:
            return (
                <>
                    &nbsp;(
                    {t('required')}
                    )
                </>
            );
    }
};

const Label: FunctionComponent<PropsWithChildren<LabelProps>> = ({
    className,
    children,
    htmlFor,
    id,
    tooltip,
    required,
    disabled = false,
    requiredLabelType = 'text',
}) => {
    const WrapperComponent = tooltip ? StyledWrapper : Fragment;
    const { isMobile } = useDeviceContext();

    return (
        <WrapperComponent>
            <StyledLabel
                data-testid="field-label"
                className={className}
                htmlFor={htmlFor}
                id={id}
                $isMobile={isMobile}
                $disabled={disabled}
            >
                {children}
                {!disabled && required && <RequiredLabel type={requiredLabelType} />}
            </StyledLabel>
            {tooltip && <StyledTooltip {...tooltip} /* eslint-disable-line react/jsx-props-no-spreading */ />}
        </WrapperComponent>
    );
};

export { Label };
