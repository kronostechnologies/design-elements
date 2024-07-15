import { FunctionComponent, PropsWithChildren, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { Button, ButtonProps } from '../buttons/button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

type ButtonPropsWithoutOnClick = Omit<ButtonProps, 'onClick'>;

interface DisclosureWidgetProps {
    idContent?: string;
    buttonProps: ButtonPropsWithoutOnClick;
}

export const Container = styled.div<{ $expanded: boolean; }>`
    background-color: ${({ theme }) => theme.component['disclosure-background-color']};
    border:
        ${({
            $expanded,
            theme,
        }) => (
            $expanded ? `1px solid ${theme.component['disclosure-border-color']}` : 0
        )};
    border-radius: var(--border-radius);
    box-shadow: 0 10px 20px 0 ${({ theme }) => theme.component['disclosure-box-shadow-color']};
    color: ${({ theme }) => theme.component['disclosure-text-color']};
    list-style-type: none;
    position: absolute;
    width: 100%;
    z-index: 700;
`;

export const StyledButton = styled(Button)<{ isMobile: boolean }>`
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    text-transform: unset;
`;

const DisclosureContainer = styled.div`
    position: relative;
`;

export const Disclosure: FunctionComponent<PropsWithChildren<DisclosureWidgetProps>> = ({
    idContent: providedIdContent,
    buttonProps,
    children,
}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const idContent = useId(providedIdContent);
    const { isMobile } = useDeviceContext();
    const handleOnButtonClick = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded, setExpanded]);

    return (
        <DisclosureContainer>
            <StyledButton
                {...buttonProps /* eslint-disable-line react/jsx-props-no-spreading */}
                isMobile={isMobile}
                onClick={handleOnButtonClick}
                aria-expanded={expanded}
                aria-controls={idContent}
            />
            <Container $expanded={expanded} id={idContent}>
                {expanded && children}
            </Container>
        </DisclosureContainer>
    );
};
