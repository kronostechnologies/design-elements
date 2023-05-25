import { MouseEvent, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { StyledLink } from '../route-link/styles/styled-link';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { SectionalBanner } from '../sectional-banner/sectional-banner';

type MobileDeviceContext = Pick<DeviceContextProps, 'isMobile'>;
type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const Message = styled.p<MobileDeviceContext>`
    font-size: ${(props) => (props.isMobile ? '1rem' : '0.875rem')};
    margin: ${(props) => (props.isMobile ? 'var(--spacing-2x)' : 'var(--spacing-1x)')} 0 0 0;
`;

const ErrorList = styled.ul`
    margin: var(--spacing-2x) 0;
    padding-left: 1rem;
`;

const ErrorItem = styled.li`
    margin-bottom: var(--spacing-1x);
`;

export interface ErrorMessage {
    text: string;
    targetId: string;
}

interface ErrorSummaryProps {
    className?: string;
    /**
     * @default h2
     */
    headingTag?: HeadingTag;
    /**
     * Array of objects with a `text` attribute containing the error message and a `targetId`
     * referencing the target input that will get the focus when clicking the error.
     */
    messages: ErrorMessage[];
}

const handleErrorClick = (targetId: string, event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    document.getElementById(targetId)?.focus();
};

export const ErrorSummary: VoidFunctionComponent<ErrorSummaryProps> = ({
    className,
    headingTag,
    messages,
}) => {
    const { t } = useTranslation('error-summary');
    const { isMobile } = useDeviceContext();

    const errorItems = messages.map((error) => (
        <ErrorItem key={error.targetId}>
            <StyledLink
                $hasLabel={false}
                $isMobile={isMobile}
                href={`#${error.targetId}`}
                onClick={(event) => handleErrorClick(error.targetId, event)}
            >
                {error.text}
            </StyledLink>
        </ErrorItem>
    ));

    return (
        <SectionalBanner
            className={className}
            focusable
            headingTag={headingTag ?? 'h2'}
            title={t('title')}
            type="alert"
        >
            <Message isMobile={isMobile}>{t('message')}</Message>
            <ErrorList>{errorItems}</ErrorList>
        </SectionalBanner>
    );
};
