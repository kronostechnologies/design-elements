import { FunctionComponent, PropsWithChildren, useState } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import {
    Size,
    Button,
    IconButton,
    ButtonProps,
} from '../buttons';
import { IconName } from '../icon/icon';

export type ButtonPropsWithoutOnClick = Omit<ButtonProps, 'onClick'> & {
    iconName?: IconName;
    size?: Size;
}

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
    display: ${({ $expanded }) => ($expanded ? 'block' : 'none')};
    position: absolute;
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
            {!buttonProps.iconName && (
                <Button
                    {...buttonProps /* eslint-disable-line react/jsx-props-no-spreading */}
                    onClick={() => setExpanded(!expanded)}
                    onBlur={() => setExpanded(false)}
                    aria-expanded={expanded}
                    aria-controls={idContent}
                />
            )}
            {buttonProps.iconName && (
                <IconButton
                    {...buttonProps /* eslint-disable-line react/jsx-props-no-spreading */}
                    iconName={buttonProps.iconName}
                    onClick={() => setExpanded(!expanded)}
                    onBlur={() => setExpanded(false)}
                    aria-expanded={expanded}
                    aria-controls={idContent}
                />
            )}
            <Container $expanded={expanded} id={idContent}>
                {children}
            </Container>
        </DisclosureContainer>
    );
};

Disclosure.displayName = 'Disclosure';
