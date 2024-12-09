import { forwardRef, PropsWithChildren, ReactElement, Ref } from 'react';
import { useDataAttributes } from '../../../hooks/use-data-attributes';
import { useId } from '../../../hooks/use-id';
import { useDeviceContext } from '../../../components/device-context-provider/device-context-provider';
import { useFieldControl } from '../context';
import { StyledHint } from './styled';
import { HintProps } from './types';

export const Hint = forwardRef(({
    children,
    id: providedId,
    ...otherProps
}: PropsWithChildren<HintProps>, ref: Ref<HTMLSpanElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const dataAttributes = useDataAttributes(otherProps);
    const { slotIds } = useFieldControl();
    const id = useId(providedId ?? slotIds?.hint);

    return (
        <StyledHint
            data-testid="field-hint"
            id={id}
            ref={ref}
            $isMobile={isMobile}
            {...otherProps /* eslint-disable-line react/jsx-props-no-spreading */}
            {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {children}
        </StyledHint>
    );
});

Hint.displayName = 'Hint';
