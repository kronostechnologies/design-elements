import React, { FunctionComponent, useState } from 'react';
import styled, { css, StyledProps } from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Button } from '../buttons/button';
import { Icon, IconName } from '../icon/icon';

type MessageType = 'alert' | 'warning' | 'info';

interface ContainerProps {
    messageType: MessageType;
    isMobile: boolean;
}

function getContainerBackgroundColor({ messageType, theme }: StyledProps<ContainerProps>): string {
    switch (messageType) {
        case 'alert':
            return theme.notifications['alert-2.1'];
        case 'warning':
            return theme.notifications['warning-3.3'];
        case 'info':
            return theme.notifications['info-1.1'];
    }
}

function getContainerColor({ messageType, theme }: StyledProps<ContainerProps>): string {
    switch (messageType) {
        case 'alert':
        case 'info':
            return theme.greys.white;
        case 'warning':
            return theme.greys.black;
    }
}

function getContainerPadding({ isMobile }: ContainerProps): string {
    return isMobile
        ? 'var(--spacing-3x) var(--spacing-2x)'
        : 'var(--spacing-1x) var(--spacing-2x)';
}

const Label = styled.b<{ isMobile: boolean }>`
    font-weight: ${({ isMobile }) => (isMobile ? 'var(--font-normal)' : 'var(--font-semi-bold)')};
    margin-right: var(--spacing-1x);
`;

const Container = styled.section<ContainerProps>`
    align-items: center;
    background-color: ${getContainerBackgroundColor};
    color: ${getContainerColor};
    display: flex;
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    justify-content: space-between;
    letter-spacing: ${({ isMobile }) => (isMobile ? 0.46 : 0.2)}px;
    line-height: 1.5rem;
    padding: ${getContainerPadding};
`;

const Content = styled.div<{ isMobile: boolean }>`
    align-items: center;
    display: flex;
    justify-content: ${({ isMobile }) => (isMobile ? '' : 'center')};

    span {
        margin: 0;
    }
`;

const StyledIcon = styled(Icon)`
    flex-shrink: 0;
    margin-right: var(--spacing-1x);
`;

interface ButtonProps {
    messageType: MessageType;
}

function getActionButtonHoverColor({ messageType }: StyledProps<ButtonProps>): string {
    switch (messageType) {
        case 'alert':
            return '#f99d99';
        case 'warning':
            return '#ffdd99';
        case 'info':
            return '#cfc1e3';
    }
}

const ActionButton = styled(Button).attrs({ buttonType: 'secondary', inverted: true })<ButtonProps>`
    ${({ messageType }) => messageType === 'warning' && css`
        border-color: ${({ theme }) => theme.greys.black};
        color: ${({ theme }) => theme.greys.black};

        &:focus {
            color: ${({ theme }) => theme.greys.white};
        }
    `}

    &:hover {
        border-color: ${getActionButtonHoverColor};
        color: ${getActionButtonHoverColor};
    }
`;

function getIgnoreButtonHoverBackgroundColor({ messageType }: StyledProps<ButtonProps>): string {
    switch (messageType) {
        case 'alert':
            return '#7b1a15';
        case 'warning':
            return '#a36d00';
        case 'info':
            return '#3a1c60';
    }
}

const IgnoreButton = styled(Button).attrs({ buttonType: 'tertiary', inverted: true })<ButtonProps>`
    ${({ messageType }) => messageType === 'warning' && css`
        color: ${({ theme }) => theme.greys.black};
    `}

    &:hover {
        background-color: ${getIgnoreButtonHoverBackgroundColor};
    }
`;

const ButtonContainer = styled.div<{ messageType: MessageType }>`
    min-width: fit-content;

    * + * {
        margin-left: var(--spacing-1x);
    }
`;

const GetIconName = (messageType: MessageType): IconName => {
    switch (messageType) {
        case 'alert':
            return 'alertOctagon';
        case 'warning':
            return 'alertTriangle';
        case 'info':
            return 'info';
    }
};

interface Props {
    className?: string;
    /**
     * Hides the component
     * @default false
     */
     hidden?: boolean;
    label: string;
    type: MessageType;
}

export const GlobalBanner: FunctionComponent<Props> = ({
    children,
    className,
    hidden,
    label,
    type,
}) => {
    const { isMobile } = useDeviceContext();
    const [visible, setVisible] = useState(!hidden);

    return visible ? (
        <Container
            aria-atomic="true"
            aria-live="polite"
            className={className}
            data-testid="container"
            isMobile={isMobile}
            messageType={type}
            role="status"
        >
            <Content isMobile={isMobile}>
                <StyledIcon
                    aria-label={type}
                    focusable
                    name={GetIconName(type)}
                    role="img"
                    size={isMobile ? '24' : '16'}
                />
                <span>
                    <Label isMobile={isMobile}>{label}</Label>
                    {children}
                </span>
            </Content>
            <ButtonContainer messageType={type}>
                <ActionButton messageType={type}>Default</ActionButton>
                <IgnoreButton data-testid="ignore-button" messageType={type} onClick={() => setVisible(false)}>
                    Ignorer
                </IgnoreButton>
            </ButtonContainer>
        </Container>
    ) : null;
};
