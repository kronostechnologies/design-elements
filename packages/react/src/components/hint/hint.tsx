import { forwardRef, PropsWithChildren, ReactElement, Ref } from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useId } from '../../hooks/use-id';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useFieldControlContext } from '../field-container/context';
import { HintProps } from './types';

const StyledHint = styled.span<{ $isMobile: boolean }>`
    color: ${(props) => props.theme.component['field-hint-text-color']};
    display: block;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '1.25rem')};
`;

export const Hint = forwardRef(({
    children,
    id: providedId,
    ...otherProps
}: PropsWithChildren<HintProps>, ref: Ref<HTMLSpanElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const dataAttributes = useDataAttributes(otherProps);
    const { slotIds } = useFieldControlContext({});
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
