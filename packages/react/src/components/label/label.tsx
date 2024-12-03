import { forwardRef, Fragment, FunctionComponent, PropsWithChildren, ReactElement, Ref } from 'react';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useFieldControlContext } from '../field-container/context';
import { useTranslation } from '../../i18n/use-translation';
import { StyledLabel, StyledTooltip, StyledWrapper } from './styled';
import { LabelProps, RequiredLabelProps } from './types';

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
