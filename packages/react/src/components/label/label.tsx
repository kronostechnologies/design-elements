/* eslint-disable react/jsx-props-no-spreading */
import { Fragment, FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Toggletip, ToggletipProps } from '../toggletip/toggletip';
import { Tooltip, TooltipProps } from '../tooltip/tooltip';
import { useTranslation } from '../../i18n/use-translation';

const StyledDiv = styled.div`
    align-items: end;
    display: flex;
`;

const StyledLabel = styled.label<{isMobile: boolean}>`
    color: ${(props) => props.theme.component['label-text-color']};
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

const StyledToggletip = styled(Toggletip)`
    margin-left: calc(var(--spacing-half) * 1.5);
`;

interface LabelProps {
    className?: string;
    forId: string;
    id?: string;
    required?: boolean;
    requiredLabelType?: 'text';
    tooltip?: TooltipProps;
    toggletip?: ToggletipProps;
}

interface RequiredLabelProps {
    type?: LabelProps['requiredLabelType'];
}

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
    className, children, forId, id, tooltip, toggletip, required, requiredLabelType = 'text',
}) => {
    const WrapperComponent = tooltip || toggletip ? StyledDiv : Fragment;
    const { isMobile } = useDeviceContext();

    return (
        <WrapperComponent>
            <StyledLabel className={className} htmlFor={forId} id={id} isMobile={isMobile}>
                {children}
                {required && <RequiredLabel type={requiredLabelType} />}
            </StyledLabel>
            {tooltip && <StyledTooltip {...tooltip} />}
            {toggletip && <StyledToggletip size="small" {...toggletip} />}
        </WrapperComponent>
    );
};

export { Label };
