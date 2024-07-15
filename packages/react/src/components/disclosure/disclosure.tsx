import { FunctionComponent, PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { Button, ButtonProps } from '../buttons/button';

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
    height: ${({ $expanded }) => ($expanded ? 'auto' : '0')};
    border-radius: var(--border-radius);
    box-shadow: 0 10px 20px 0 ${({ theme }) => theme.component['disclosure-box-shadow-color']};
    color: ${({ theme }) => theme.component['disclosure-text-color']};
    list-style-type: none;
    position: absolute;
    width: 100%;
    z-index: 700;
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

    return (
        <DisclosureContainer>
            <Button
                {...buttonProps /* eslint-disable-line react/jsx-props-no-spreading */}
                onClick={() => setExpanded(!expanded)}
                aria-expanded={expanded}
                aria-controls={idContent}
            />
            <Container $expanded={expanded} id={idContent}>
                {children}
            </Container>
        </DisclosureContainer>
    );
};
