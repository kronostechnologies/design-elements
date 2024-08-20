import {
    ComponentProps,
    ComponentType,
    PropsWithChildren,
    ReactNode,
    useMemo,
    VoidFunctionComponent,
} from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Heading } from '../heading/heading';
import { Icon, IconName } from '../icon/icon';
import {
    AlertContainer,
    DiscoveryContainer,
    InfoContainer,
    NeutralContainer,
    SectionalBannerType,
    SuccessContainer,
    WarningContainer,
} from '../sectional-banner/sectional-banner';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span';
export type CalloutType = 'neutral' | 'info' | 'discovery' | 'success' | 'warning' | 'alert';
type Live = 'polite' | 'assertive';
type Role = 'status' | 'alert';
type MobileDeviceContext = { $isMobile: boolean };

interface CalloutProps {
    className?: string;
    children: ReactNode;
    focusable?: boolean;
    /** @default `span` */
    headingTag?: HeadingTag;
    id?: string;
    /** Sets custom message title */
    title?: string;
    /** Sets message type */
    type: CalloutType;
}

const BannerIcon = styled(Icon) <ComponentProps<typeof Icon> & { $isMobile: boolean }>`
    grid-area: icon;
    margin-top: ${({ $isMobile }) => ($isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half)')};
`;

const Message = styled.p<MobileDeviceContext>`
    font-size: ${(props) => (props.$isMobile ? '1rem' : '0.875rem')};
    margin: ${(props) => (props.$isMobile ? 'var(--spacing-2x)' : 'var(--spacing-half)')} 0 0 0;
`;

const TextWrapper = styled.div<MobileDeviceContext>`
    box-sizing: border-box;
    grid-area: content;
    margin-left: var(--spacing-1halfx);
`;

interface AbstractContainerProps extends MobileDeviceContext {
    className?: string;
    role: Role;
    tabIndex?: number;
}

interface BannerTypeProps {
    ariaLive: Live;
    container: ComponentType<PropsWithChildren<AbstractContainerProps>>;
    iconName: IconName;
    role: Role;
    title: 'Neutral' | 'Info' | 'Discovery' | 'Success' | 'Warning' | 'Alert';
}

function handleType(type: SectionalBannerType): BannerTypeProps {
    switch (type) {
        case 'neutral':
            return {
                container: NeutralContainer,
                iconName: 'info',
                ariaLive: 'polite',
                role: 'status',
                title: 'Neutral',
            };
        case 'info':
            return {
                container: InfoContainer,
                iconName: 'info',
                ariaLive: 'polite',
                role: 'status',
                title: 'Info',
            };
        case 'discovery':
            return {
                container: DiscoveryContainer,
                iconName: 'lightbulb',
                ariaLive: 'polite',
                role: 'status',
                title: 'Discovery',
            };
        case 'success':
            return {
                container: SuccessContainer,
                iconName: 'check',
                ariaLive: 'polite',
                role: 'status',
                title: 'Success',
            };
        case 'warning':
            return {
                container: WarningContainer,
                iconName: 'alertTriangle',
                ariaLive: 'assertive',
                role: 'alert',
                title: 'Warning',
            };
        case 'alert':
            return {
                container: AlertContainer,
                iconName: 'alertOctagon',
                ariaLive: 'assertive',
                role: 'alert',
                title: 'Alert',
            };
    }
}

export const Callout: VoidFunctionComponent<CalloutProps> = ({
    className,
    children,
    focusable,
    headingTag,
    id,
    title,
    type,
}) => {
    const { t } = useTranslation('sectional-banner');
    const { isMobile } = useDeviceContext();
    const bannerType: BannerTypeProps = useMemo(() => handleType(type), [type]);
    const Container = bannerType.container;

    const iconSize = isMobile ? 24 : 20;
    const messageTag = (typeof children === 'string') ? 'p' : 'div';

    const headingId = useId(id);

    return (
        <Container
            className={className}
            $isMobile={isMobile}
            tabIndex={focusable ? -1 : undefined}
            aria-live={bannerType.ariaLive}
            aria-atomic="true"
            aria-labelledby={headingId}
            role={bannerType.role}
        >
            <BannerIcon
                name={bannerType.iconName}
                size={iconSize.toString()}
                aria-hidden="true"
                $isMobile={isMobile}
            />

            <TextWrapper $isMobile={isMobile}>
                <Heading $isMobile={isMobile} as={headingTag} id={headingId}>{title || t(bannerType.title)}</Heading>
                <Message $isMobile={isMobile} as={messageTag}>{children}</Message>
            </TextWrapper>
        </Container>
    );
};
