import React, { FunctionComponent, MouseEvent, useState } from 'react';
import styled, { css, StyledProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Button } from '../buttons/button';
import { Icon, IconName } from '../icon/icon';

export type MessageType = 'alert' | 'warning' | 'info';

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
        ? 'var(--spacing-3x) var(--spacing-2x) var(--spacing-2x)'
        : 'var(--spacing-1x) var(--spacing-2x)';
}

const Label = styled.b<{ isMobile: boolean }>`
    display: ${({ isMobile }) => (isMobile ? 'block' : 'inline')};
    font-weight: var(--font-semi-bold);

    ${({ isMobile }) => (isMobile ? css`
        margin-bottom: var(--spacing-half);
    ` : css`
        margin-right: var(--spacing-1x);
    `)}
`;

const Container = styled.section<ContainerProps>`
    align-items: center;
    background-color: ${getContainerBackgroundColor};
    color: ${getContainerColor};
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
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
        letter-spacing: 0.015rem;
        margin: 0;
    }

    ${({ isMobile }) => isMobile && css`align-self: flex-start;`};
`;

const StyledIcon = styled(Icon)<{ isMobile: boolean }>`
    flex-shrink: 0;
    margin-right: var(--spacing-1x);

    ${({ isMobile }) => isMobile && css`align-self: flex-start;`};
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

interface ButtonContainerProps {
    isMobile: boolean;
    messageType: MessageType;
}

const ButtonContainer = styled.div<ButtonContainerProps>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    margin-top: ${({ isMobile }) => (isMobile ? 'var(--spacing-3x)' : '0')};
    min-width: fit-content;
    width: ${({ isMobile }) => (isMobile ? '100%' : 'unset')};

    * + * {
        ${({ isMobile }) => (isMobile ? css`
            margin-top: var(--spacing-1x);
        ` : css`
            margin-left: var(--spacing-1x);
        `)}
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

export interface ActionButton {
    label: string;
    onClick(event: MouseEvent<HTMLButtonElement>): void;
}

interface Props {
    actionButton?: ActionButton;
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
    actionButton,
    children,
    className,
    hidden,
    label,
    type,
}) => {
    const { isMobile } = useDeviceContext();
    const [visible, setVisible] = useState(!hidden);
    const { t } = useTranslation('global-banner');

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
                    isMobile={isMobile}
                    name={GetIconName(type)}
                    role="img"
                    size={isMobile ? '24' : '16'}
                />
                <span>
                    <Label isMobile={isMobile}>{label}</Label>
                    {children}
                </span>
            </Content>
            <ButtonContainer isMobile={isMobile} messageType={type}>
                {actionButton && (
                    <ActionButton
                        data-testid="action-button"
                        messageType={type}
                        onClick={actionButton.onClick}
                        type="button"
                    >
                        {actionButton.label}
                    </ActionButton>
                )}
                {type !== 'alert' && (
                    <IgnoreButton
                        data-testid="ignore-button"
                        messageType={type}
                        onClick={() => setVisible(false)}
                        type="button"
                    >
                        {t('ignore')}
                    </IgnoreButton>
                )}
            </ButtonContainer>
        </Container>
    ) : null;
};
