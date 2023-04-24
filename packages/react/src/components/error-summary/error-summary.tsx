import { MouseEvent, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { StyledLink } from '../route-link/styles/styled-link';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { SectionalBanner } from '../sectional-banner/sectional-banner';

type MobileDeviceContext = Pick<DeviceContextProps, 'isMobile'>;

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

const ErrorLink = styled(StyledLink)``;

interface ErrorSummaryProps {
    className?: string;
    /**
     * Array of objects with a `text` attribute containing the error message and a `targetId`
     * referencing the target input that will get the focus when clicking the error.
     */
    messages: {
        text: string;
        targetId: string;
    }[];
}

const handleErrorClick = (targetId: string, event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();
    document.getElementById(targetId)?.focus();
};

export const ErrorSummary: VoidFunctionComponent<ErrorSummaryProps> = ({
    className,
    messages,
}) => {
    const { t } = useTranslation('error-summary');
    const { isMobile } = useDeviceContext();

    const errorItems = messages.map((error) => (
        <ErrorItem key={error.targetId}>
            <ErrorLink
                to={`#${error.targetId}`}
                $hasLabel={false}
                type="anchor"
                onClick={(event) => handleErrorClick(error.targetId, event)}
            >
                {error.text}
            </ErrorLink>
        </ErrorItem>
    ));

    return (
        <SectionalBanner
            type="alert"
            title={t('title')}
            className={className}
        >
            <Message isMobile={isMobile}>{t('message')}</Message>
            <ErrorList>{errorItems}</ErrorList>
        </SectionalBanner>
    );
};
