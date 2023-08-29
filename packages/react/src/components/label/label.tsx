import { Fragment, FunctionComponent, PropsWithChildren, ReactElement, useCallback } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Tooltip, TooltipProps } from '../tooltip/tooltip';
import { useTranslation } from '../../i18n/use-translation';

const StyledDiv = styled.div`
    align-items: center;
    display: flex;
`;

const StyledLabel = styled.label<{isMobile: boolean}>`
    color: ${(props) => props.theme.greys.black};
    display: block;
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
    margin: 0;
    width: fit-content;

    input + & {
        margin-left: var(--spacing-half);
    }
`;

const StyledTooltip = styled(Tooltip)`
    margin-left: calc(var(--spacing-1x) * 1.5);
`;

interface LabelProps {
    className?: string;
    forId: string;
    required?: boolean;
    requiredLabelType?: string;
    tooltip?: TooltipProps;
}

const Label: FunctionComponent<PropsWithChildren<LabelProps>> = ({
    className, children, forId, tooltip, required, requiredLabelType = 'text',
}) => {
    const { t } = useTranslation('text-input');
    const WrapperComponent = tooltip ? StyledDiv : Fragment;
    const { isMobile } = useDeviceContext();

    const getRequiredLabel = useCallback((requiredType: string): ReactElement => {
        switch (requiredType) {
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
    }, [t]);

    return (
        <WrapperComponent>
            <StyledLabel className={className} htmlFor={forId} isMobile={isMobile}>
                {children}
                {required && getRequiredLabel(requiredLabelType)}
            </StyledLabel>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {tooltip && <StyledTooltip {...tooltip} />}
        </WrapperComponent>
    );
};

export { Label };
