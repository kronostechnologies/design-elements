import { forwardRef, Fragment, FunctionComponent, PropsWithChildren, ReactElement, Ref } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useFieldControlContext } from '../field-container/context';
import { Tooltip } from '../tooltip/tooltip';
import { useTranslation } from '../../i18n/use-translation';
import { LabelProps, RequiredLabelProps } from './types';

const StyledWrapper = styled.div`
    align-items: center;
    display: flex;
`;

const StyledLabel = styled.label<{$isMobile: boolean}>`
    color: ${(props) => props.theme.component['label-text-color']};
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

export const Label = forwardRef(({
    id: providedId,
    forId: providedForId,
    className,
    children,
    tooltip,
    ...otherProps
}: PropsWithChildren<LabelProps>, ref: Ref<HTMLLabelElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const dataAttributes = useDataAttributes(otherProps);
    const {
        id: inputId,
        slotIds,
        required,
    } = useFieldControlContext({});
    const id = useId(slotIds?.label ?? providedId);
    const htmlFor = inputId ?? providedForId;

    const WrapperComponent = tooltip ? StyledWrapper : Fragment;

    return (
        <WrapperComponent>
            <StyledLabel
                data-testid={`${inputId ? 'field-' : ''}label`}
                className={className}
                htmlFor={htmlFor}
                id={id}
                ref={ref}
                $isMobile={isMobile}
                {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
                {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
            >
                {children}
                {required && <RequiredLabel />}
            </StyledLabel>
            {tooltip && <StyledTooltip {...tooltip} /* eslint-disable-line react/jsx-props-no-spreading */ />}
        </WrapperComponent>
    );
});

Label.displayName = 'Label';
