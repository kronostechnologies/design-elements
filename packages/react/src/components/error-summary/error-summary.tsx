import { MouseEvent, RefObject, VoidFunctionComponent } from 'react';
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
    &:first-child {
        margin-top: 0;
        padding-top: 0;
    }
`;

const ErrorList = styled.ul`
    list-style: inside disc;
    margin: var(--spacing-1x) 0;
    padding-left: var(--spacing-1x);
`;

const ErrorItem = styled.li`
    margin-bottom: var(--spacing-1x);
`;

export interface ErrorMessage {
    text: string;
    target: RefObject<HTMLElement> | string;
}

interface ErrorSummaryProps {
    className?: string;
    /**
     * @default h2
     */
    headingTag?: HeadingTag;
    /**
     * Array of objects with a `text` attribute containing the error message and a `target`
     * referencing the target input that will get the focus when clicking the error. The
     * target can either be the id of the element or a component ref.
     */
    messages: ErrorMessage[];
}

const getTargetId = (target: RefObject<HTMLElement> | string): string | undefined => (
    typeof target === 'string' ? target : target.current?.id
);

const handleErrorClick = (target: RefObject<HTMLElement> | string, event: MouseEvent<HTMLAnchorElement>): void => {
    event.preventDefault();

    const targetElement = typeof target === 'string' ? document.getElementById(target) : target.current;
    targetElement?.focus();
};

export const ErrorSummary: VoidFunctionComponent<ErrorSummaryProps> = ({
    className,
    headingTag,
    messages,
}) => {
    const { t } = useTranslation('error-summary');
    const { isMobile } = useDeviceContext();

    const errorItems = messages.map((error, i) => (
        <ErrorItem key={i /* eslint-disable-line react/no-array-index-key */}>
            <StyledLink
                $hasLabel={false}
                $isMobile={isMobile}
                href={`#${getTargetId(error.target)}`}
                onClick={(event) => handleErrorClick(error.target, event)}
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

ErrorSummary.displayName = 'ErrorSummary';
