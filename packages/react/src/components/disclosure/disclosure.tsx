import { FunctionComponent, PropsWithChildren, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import {
    Size,
    Button,
    IconButton,
    ButtonProps,
} from '../buttons';
import { IconName } from '../icon/icon';

const useClickOutside = (ref: React.RefObject<HTMLElement>, handler: () => void): void => {
    useEffect(() => {
        const listener = (event: MouseEvent): void => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler();
        };

        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, handler]);
};

export type ButtonPropsWithoutOnClick = Omit<ButtonProps, 'onClick'> & {
    iconName?: IconName;
    size?: Size;
}

export interface DisclosureWidgetProps {
    className?: string;
    idContent?: string;
    buttonProps: ButtonPropsWithoutOnClick;
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
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
    className,
    idContent: providedIdContent,
    buttonProps,
    children,
    expanded,
    setExpanded,
}) => {
    const idContent = useId(providedIdContent);
    const containerRef = useRef<HTMLDivElement>(null);

    useClickOutside(containerRef, () => setExpanded(false));

    return (
        <DisclosureContainer className={className}>
            {!buttonProps.iconName && (
                <Button
                    {...buttonProps /* eslint-disable-line react/jsx-props-no-spreading */}
                    className={className}
                    onClick={() => setExpanded(!expanded)}
                    aria-expanded={expanded}
                    aria-controls={idContent}
                />
            )}
            {buttonProps.iconName && (
                <IconButton
                    {...buttonProps /* eslint-disable-line react/jsx-props-no-spreading */}
                    className={className}
                    iconName={buttonProps.iconName}
                    onClick={() => setExpanded(!expanded)}
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
