import { DetailedHTMLProps, Fragment, FunctionComponent, LabelHTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { FieldControlProps } from '../field/context';
import { Tooltip, TooltipProps } from '../tooltip/tooltip';
import { useTranslation } from '../../i18n/use-translation';

const StyledWrapper = styled.div`
    align-items: center;
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

export type BaseLabelProps = Pick<DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement>,
    | 'id' | 'className'
>;

type CommonFieldControlProps = Pick<FieldControlProps, 'required'>;

export interface LabelProps extends BaseLabelProps, CommonFieldControlProps {
    htmlFor: string;
    requiredLabelType?: 'text';
    tooltip?: TooltipProps;
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
    className, children, htmlFor, id, tooltip, required, requiredLabelType = 'text',
}) => {
    const WrapperComponent = tooltip ? StyledWrapper : Fragment;
    const { isMobile } = useDeviceContext();

    return (
        <WrapperComponent>
            <StyledLabel className={className} htmlFor={htmlFor} id={id} isMobile={isMobile}>
                {children}
                {required && <RequiredLabel type={requiredLabelType} />}
            </StyledLabel>
            {tooltip && <StyledTooltip {...tooltip} /* eslint-disable-line react/jsx-props-no-spreading */ />}
        </WrapperComponent>
    );
};

export { Label };
