import {
    ComponentProps,
    ComponentType,
    FunctionComponent,
    PropsWithChildren,
    ReactNode,
    useMemo,
    VoidFunctionComponent,
} from 'react';
import styled, { css, ThemedCssFunction } from 'styled-components';
import { useId } from '../../hooks/use-id';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { focus } from '../../utils/css-state';
import { Button, IconButton } from '../buttons';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Heading, Tag } from '../heading/heading';
import { Icon, IconName } from '../icon/icon';

type MobileDeviceContext = { $isMobile: boolean };
export type SectionalBannerType = 'neutral' | 'info' | 'discovery' | 'success' | 'warning' | 'alert';

interface AbstractContainerProps extends MobileDeviceContext {
    className?: string;
    tabIndex?: number;
}

function getLineHeight(isMobile: boolean): number {
    return isMobile ? 28 : 24;
}

const BannerIcon = styled(Icon) <ComponentProps<typeof Icon> & { $isMobile: boolean }>`
    grid-area: icon;
    margin-top: ${({ $isMobile }) => ($isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half)')};
`;

function getLayout({ $isMobile }: AbstractContainerProps): ReturnType<ThemedCssFunction<ResolvedTheme>> {
    if ($isMobile) {
        return css`
            display: grid;
            grid-template-areas:
                'icon content'
                'button button';
            grid-template-columns: auto 1fr;
        `;
    }
    return css`
        display: flex;
    `;
}

function abstractContainer(
    bgColor: keyof ResolvedTheme['component'],
    borderColor: keyof ResolvedTheme['component'],
    iconColor: keyof ResolvedTheme['component'],
): FunctionComponent<PropsWithChildren<AbstractContainerProps>> {
    return styled.div<AbstractContainerProps>`
        background-color: ${(props) => props.theme.component[bgColor]};
        border: 1px solid ${(props) => props.theme.component[borderColor]};
        border-radius: var(--border-radius-2x);
        box-sizing: border-box;
        line-height: ${({ $isMobile }) => getLineHeight($isMobile)}px;
        padding: ${(props) => (props.$isMobile ? 'var(--spacing-3x) var(--spacing-2x)' : 'var(--spacing-2x) var(--spacing-3x)')};
        position: relative;
        width: 100%;

        ${getLayout};

        ${focus};

        ${BannerIcon} {
            color: ${(props) => (props.theme.component[iconColor])};
            flex: 0 0 auto;
            height: 1rem;
            width: 1rem;
        }
    `;
}

const NeutralContainer = abstractContainer(
    'sectional-banner-neutral-background-color',
    'sectional-banner-neutral-border-color',
    'sectional-banner-neutral-icon-color',
);
const InfoContainer = abstractContainer(
    'sectional-banner-info-background-color',
    'sectional-banner-info-border-color',
    'sectional-banner-info-icon-color',
);
const DiscoveryContainer = abstractContainer(
    'sectional-banner-discovery-background-color',
    'sectional-banner-discovery-border-color',
    'sectional-banner-discovery-icon-color',
);
const SuccessContainer = abstractContainer(
    'sectional-banner-success-background-color',
    'sectional-banner-success-border-color',
    'sectional-banner-success-icon-color',
);
const WarningContainer = abstractContainer(
    'sectional-banner-warning-background-color',
    'sectional-banner-warning-border-color',
    'sectional-banner-warning-icon-color',
);
const AlertContainer = abstractContainer(
    'sectional-banner-alert-background-color',
    'sectional-banner-alert-border-color',
    'sectional-banner-alert-icon-color',
);

const Message = styled.p<MobileDeviceContext>`
    font-size: ${(props) => (props.$isMobile ? '1rem' : '0.875rem')};
    margin: 0;
`;

const TextWrapper = styled.div<MobileDeviceContext>`
    box-sizing: border-box;
    grid-area: content;
    margin-left: var(--spacing-1halfx);
`;

type DismissButtonProps = MobileDeviceContext & { $marginTop: number }

function getDismissButtonRight({ $isMobile }: DismissButtonProps): string {
    return $isMobile ? 'var(--spacing-half)' : 'var(--spacing-1x)';
}

function getDismissButtonTop({ $marginTop }: DismissButtonProps): string {
    return `calc(var(--spacing-2x) - ${2 * $marginTop}px)`;
}

const DismissIconButton = styled(IconButton) <DismissButtonProps>`
    position: absolute;
    right: ${getDismissButtonRight};
    top: ${getDismissButtonTop};
`;

const StyledActionButton = styled(Button)`
    grid-area: button;
    margin-top: var(--spacing-2x);
`;

type ActionButtonProps = {
    label: string;
    isAlertType: boolean;
    onClick?(): void;
}

const ActionButton: VoidFunctionComponent<ActionButtonProps> = ({
    label,
    isAlertType,
    onClick,
}) => (
    <StyledActionButton
        buttonType={isAlertType ? 'destructive-primary' : 'primary'}
        data-testid="button"
        label={label}
        type="button"
        onClick={onClick}
    />
);

interface BannerTypeProps {
    container: ComponentType<PropsWithChildren<AbstractContainerProps>>;
    iconName: IconName;
}

function handleType(type: SectionalBannerType): BannerTypeProps {
    switch (type) {
        case 'neutral':
            return {
                container: NeutralContainer,
                iconName: 'info',
            };
        case 'info':
            return {
                container: InfoContainer,
                iconName: 'info',
            };
        case 'discovery':
            return {
                container: DiscoveryContainer,
                iconName: 'lightbulb',
            };
        case 'success':
            return {
                container: SuccessContainer,
                iconName: 'check',
            };
        case 'warning':
            return {
                container: WarningContainer,
                iconName: 'alertTriangle',
            };
        case 'alert':
            return {
                container: AlertContainer,
                iconName: 'alertOctagon',
            };
    }
}

interface SectionalBannerProps {
    buttonLabel?: string;
    className?: string;
    children: ReactNode;
    focusable?: boolean;
    headingTag?: Tag;
    id?: string;
    /** Sets custom message title */
    title?: string;
    /** Sets message type */
    type: SectionalBannerType;

    onButtonClicked?(): void;

    onDismiss?(): void;
}

function isAlert(bannerType: SectionalBannerType): bannerType is 'alert' {
    return bannerType === 'alert';
}

export const SectionalBanner: VoidFunctionComponent<SectionalBannerProps> = ({
    buttonLabel,
    className,
    children,
    focusable,
    headingTag,
    id,
    title,
    type,
    onButtonClicked,
    onDismiss,
}) => {
    const { t } = useTranslation('sectional-banner');
    const { isMobile } = useDeviceContext();
    const bannerType: BannerTypeProps = useMemo(() => handleType(type), [type]);
    const Container = bannerType.container;
    const isAlertType = isAlert(type);

    const iconSize = isMobile ? 24 : 20;
    const lineHeight = getLineHeight(isMobile);
    const marginTop = (lineHeight - iconSize) / 2;
    const messageTag = (typeof children === 'string') ? 'p' : 'div';

    const headingId = useId(id);

    return (
        <Container
            className={className}
            $isMobile={isMobile}
            tabIndex={focusable ? -1 : undefined}
        >
            <BannerIcon
                name={bannerType.iconName}
                size={iconSize.toString()}
                aria-hidden="true"
                $isMobile={isMobile}
            />

            <TextWrapper $isMobile={isMobile}>
                {title && <Heading tag={headingTag} id={headingId} type="small" bold noMargin>{title}</Heading>}
                <Message $isMobile={isMobile} as={messageTag}>{children}</Message>
                {!isMobile && buttonLabel && (
                    <ActionButton
                        isAlertType={isAlertType}
                        label={buttonLabel}
                        onClick={onButtonClicked}
                        data-testid="desktop-button"
                    />
                )}
            </TextWrapper>

            {isMobile && buttonLabel && (
                <ActionButton
                    isAlertType={isAlertType}
                    label={buttonLabel}
                    onClick={onButtonClicked}
                    data-testid="mobile-button"
                />
            )}

            {onDismiss && (
                <DismissIconButton
                    buttonType="tertiary"
                    iconName="x"
                    onClick={onDismiss}
                    label={t('dismissLabel')}
                    $isMobile={isMobile}
                    $marginTop={marginTop}
                    data-testid="dismiss-button"
                />
            )}
        </Container>
    );
};
