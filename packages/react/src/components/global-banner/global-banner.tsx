import React, { forwardRef, ReactElement, ReactNode, MouseEvent, Ref, useState } from 'react';
import styled, { css, StyledProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Button } from '../buttons/button';
import { Icon, IconName } from '../icon/icon';

export type GlobalBannerType = 'alert' | 'warning' | 'info' | 'default';

interface ContainerProps {
    bannerType: GlobalBannerType;
    isMobile: boolean;
}

function getContainerBackgroundColor({ bannerType, theme }: StyledProps<{ bannerType: GlobalBannerType }>): string {
    switch (bannerType) {
        case 'alert':
            return theme.notifications['alert-2.1'];
        case 'warning':
            return theme.notifications['warning-3.3'];
        case 'info':
            return theme.notifications['info-1.1'];
        case 'default':
            return theme.greys['dark-grey'];
    }
}

function getContainerColor({ bannerType, theme }: StyledProps<ContainerProps>): string {
    switch (bannerType) {
        case 'alert':
        case 'info':
        case 'default':
            return theme.greys.white;
        case 'warning':
            return theme.greys.black;
    }
}

function getContainerPadding({ isMobile }: ContainerProps): string {
    return isMobile
        ? 'var(--spacing-3x) var(--spacing-2x) var(--spacing-2x)'
        : ' 0 var(--spacing-2x) var(--spacing-1x) var(--spacing-5x)';
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

const Message = styled.span`
    display: inline-block;
`;

const Container = styled.section<ContainerProps>`
    align-items: center;
    background-color: ${getContainerBackgroundColor};
    color: ${getContainerColor};
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    flex-wrap: ${({ isMobile }) => (isMobile ? 'nowrap' : 'wrap')};
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    justify-content: space-between;
    letter-spacing: ${({ isMobile }) => (isMobile ? 0.02875 : 0.0125)}rem;
    line-height: 1.5rem;
    padding: ${getContainerPadding};
    position: relative;
`;

const Content = styled.div<{ isMobile: boolean }>`
    align-items: center;
    display: flex;
    justify-content: ${({ isMobile }) => (isMobile ? 'unset' : 'center')};
    margin-top: ${({ isMobile }) => (isMobile ? '0' : 'var(--spacing-1x)')};
    position: relative;

    ${({ isMobile }) => isMobile && css`align-self: flex-start;`};
`;

const StyledIcon = styled(Icon)<React.SVGProps<SVGSVGElement> & { $isMobile: boolean }>`
    flex-shrink: 0;
    margin-right: var(--spacing-1x);

    ${({ $isMobile }) => ($isMobile ? css`align-self: flex-start;` : css`
        left: calc(var(--spacing-3x) * -1);
        position: absolute;
        top: var(--spacing-half);
    `)};
`;

const Text = styled.span`
    letter-spacing: 0.015rem;
    margin: 0;
`;

interface ButtonProps {
    bannerType: GlobalBannerType;
}

function getActionButtonHoverColor({ bannerType, theme }: StyledProps<ButtonProps>): string {
    /* TODO change colors when updating thematization */
    switch (bannerType) {
        case 'alert':
            return '#f99d99';
        case 'warning':
            return '#9e6900';
        case 'info':
            return '#cfc1e3';
        case 'default':
            return theme.greys['mid-grey'];
    }
}

const ActionButton = styled(Button).attrs({ buttonType: 'secondary', inverted: true })<ButtonProps>`
    ${({ bannerType, theme }) => bannerType === 'warning' && css`
        border-color: ${theme.greys.black};
        color: ${theme.greys.black};
    `}

    &:hover {
        border-color: ${getActionButtonHoverColor};
        color: ${getActionButtonHoverColor};
    }

    &:focus {
        background-color: ${getContainerBackgroundColor};
        ${({ bannerType, theme }) => bannerType === 'warning' && css`color: ${theme.greys.black};`}
    }
`;

function getTertiaryButtonHoverBackgroundColor({ bannerType }: StyledProps<ButtonProps>): string {
    /* TODO change colors when updating thematization */
    switch (bannerType) {
        case 'alert':
            return '#7b1a15';
        case 'warning':
            return '#9e6900';
        case 'info':
            return '#3a1c60';
        case 'default':
            return '#878f9a';
    }
}

const TertiaryButton = styled(Button).attrs({ buttonType: 'tertiary', inverted: true })<ButtonProps>`
    ${({ bannerType, theme }) => bannerType === 'warning' && css`color: ${theme.greys.black};`}

    &:focus {
        background-color: ${getContainerBackgroundColor};
        ${({ bannerType, theme }) => bannerType === 'warning' && css`color: ${theme.greys.black};`}
    }

    &:hover {
        background-color: ${getTertiaryButtonHoverBackgroundColor};
        ${({ bannerType, theme }) => bannerType === 'warning' && css`color: ${theme.greys.white};`}
    }
`;

const ButtonContainer = styled.div<{ isMobile: boolean }>`
    display: flex;
    flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
    margin-top: ${({ isMobile }) => (isMobile ? 'var(--spacing-3x)' : 'var(--spacing-1x)')};
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

const GetIconName = (bannerType: GlobalBannerType): IconName => {
    switch (bannerType) {
        case 'alert':
            return 'alertOctagon';
        case 'warning':
        case 'default':
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
    secondaryActionButton?: ActionButton;
    className?: string;
    children: ReactNode;
    hidden?: boolean;
    /**
     * Adds an ignore-button. Note that alert type banners are not dismissable.
     */
    dismissable?: boolean;
    label: string;
    type?: GlobalBannerType;
}

export const GlobalBanner = forwardRef(({
    actionButton,
    children,
    className,
    hidden,
    dismissable = false,
    label,
    secondaryActionButton,
    type = 'default',
}: Props, ref: Ref<HTMLElement>): ReactElement => {
    const { isMobile } = useDeviceContext();
    const [visible, setVisible] = useState(!hidden);
    const { t } = useTranslation('global-banner');
    const hasDismissButton = type !== 'alert' && dismissable;
    const hasButtons = hasDismissButton || actionButton || secondaryActionButton;

    return visible ? (
        <Container
            ref={ref}
            aria-atomic="true"
            aria-live="polite"
            className={className}
            data-testid="container"
            isMobile={isMobile}
            bannerType={type}
            role="status"
        >
            <Content isMobile={isMobile}>
                <StyledIcon
                    aria-label={type}
                    focusable={undefined}
                    $isMobile={isMobile}
                    name={GetIconName(type)}
                    role="img"
                    size={isMobile ? '24' : '16'}
                />
                <Text>
                    <Label isMobile={isMobile}>{label}</Label>
                    <Message>{children}</Message>
                </Text>
            </Content>
            {hasButtons && (
                <ButtonContainer isMobile={isMobile}>
                    {actionButton && (
                        <ActionButton
                            data-testid="action-button"
                            bannerType={type}
                            onClick={actionButton.onClick}
                            type="button"
                        >
                            {actionButton.label}
                        </ActionButton>
                    )}
                    {secondaryActionButton && (
                        <TertiaryButton
                            data-testid="secondary-action-button"
                            bannerType={type}
                            onClick={secondaryActionButton.onClick}
                            type="button"
                        >
                            {secondaryActionButton.label}
                        </TertiaryButton>
                    )}
                    {hasDismissButton && (
                        <TertiaryButton
                            data-testid="dismiss-button"
                            bannerType={type}
                            onClick={() => setVisible(false)}
                            type="button"
                        >
                            {t('ignore')}
                        </TertiaryButton>
                    )}
                </ButtonContainer>
            )}
        </Container>
    ) : null;
});
