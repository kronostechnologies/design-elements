import { Accordion, accordionClasses, Heading, Link, Lozenge, LozengeVariant } from '@equisoft/design-elements-react';
import React, { FunctionComponent, memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';

interface EnvelopeData {
    id: string;
    title: string;
    createdDate: Date;
    status: 'send' | 'completed' | 'declined';
    reasonText?: string;
}

// Types for Lozenge variants and icons based on your design system
type IconName = 'check' | 'send' | 'alertOctagon';

// Status configuration for different envelope statuses with proper typing
const STATUS_CONFIG: Record<EnvelopeData['status'], { variant: LozengeVariant; icon: IconName }> = {
    completed: { variant: 'success', icon: 'check' },
    send: { variant: 'warning', icon: 'send' },
    declined: { variant: 'alert', icon: 'alertOctagon' },
};

// Styled components defined outside the component

// Tu n'auras pas besoin de ce 'Container' il représente celui qui se trouve deja dans l'app
const Container = styled.div`
    width: 560px;
`;

const StyledAccordion = styled(Accordion)`
    .${accordionClasses.button} {
        border-radius: var(--border-radius);
        font-size: inherit;
        font-weight: var(--font-semi-bold);
        line-height: inherit;
        padding: var(--spacing-1halfx) var(--spacing-2x);

        &[aria-expanded='true'] {
            border-radius: var(--border-radius) var(--border-radius) 0 0;
        }
    }

    .${accordionClasses.buttonIcon} {
        margin-left: auto;
        order: 2;
    }

    .${accordionClasses.panel} {
        border-radius: 0 0 var(--border-radius) var(--border-radius);
    }

    .${accordionClasses.content} {
        padding: 0.75rem 1rem;
    }
`;

const Envelope = styled.div`
    background: #fff;
    border: 1px solid  #dbdee1;
    border-radius: 0.25rem;
    display: grid;
    font-family: var(--font-family);
    grid-column-gap: 1rem;
    grid-template-areas:
        'main secondary'
        'bottom bottom';
    grid-template-columns: 1fr auto;
    padding: 0.75rem 1rem;

    &:not(:last-child) {
        margin-bottom: 0.5rem;
    }
`;

const Main = styled.div`
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    font-weight: var(--font-normal);
    gap: 0.25rem;
    letter-spacing: 0.0125rem;
    line-height: 1rem;
`;

const Secondary = styled.div`
    align-items: flex-end;
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
`;

const Bottom = styled.div`
    grid-area: bottom;
`;

const StyledHeading = styled(Heading)`
    margin: 0 0 0.25rem 0;
`;

const StyledDate = styled.span``;

const Reason = styled.p`
    &:last-child {
        margin-bottom: 0;
    }
`;

// EnvelopeItem Component
interface EnvelopeProps {
    envelope: EnvelopeData;
    formatDate: (date: Date) => string;
}

const EnvelopeItem: React.FC<EnvelopeProps> = memo(({ envelope, formatDate }) => {
    const { t } = useTranslation();
    const statusConfig = STATUS_CONFIG[envelope.status];

    return (
        <Envelope key={envelope.id} id={envelope.id}>
            <Main>
                <StyledHeading tag="h3" type="xsmall" bold>
                    {envelope.title}
                </StyledHeading>
                <StyledDate>
                    {t('docusign:created_on')}
                    &nbsp;
                    {formatDate(envelope.createdDate)}
                </StyledDate>
            </Main>
            <Secondary>
                <Lozenge
                    variant={statusConfig.variant}
                    subtle
                    icon={statusConfig.icon}
                >
                    {t(`docusign:status${envelope.status.charAt(0).toUpperCase() + envelope.status.slice(1)}`)}
                </Lozenge>
                <Link external>
                    {t('docusign:link')}
                </Link>
            </Secondary>
            {envelope.reasonText && (
                <Bottom>
                    <Reason>
                        <strong>
                            {t('docusign:reason_label')}
                            &nbsp;:&nbsp;
                        </strong>
                        {envelope.reasonText}
                    </Reason>
                </Bottom>
            )}
        </Envelope>
    );
});

// Main DocusignPage Component
export const DocusignPage: FunctionComponent = memo(() => {
    const { t, i18n } = useTranslation();

    const formatDate = useCallback(
        (date: Date): string => new Intl.DateTimeFormat(i18n.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date),
        [i18n.language],
    );

    const envelopeData = useMemo(() => [
        {
            id: uuid(),
            title: 'TFSA account opening',
            createdDate: new Date(),
            status: 'send' as const,
            reasonText: 'This document requires your signature to finalize the account opening.',
        },
        {
            id: uuid(),
            title: 'Lorem ipsum dolor sit amet',
            createdDate: new Date(),
            status: 'completed' as const,
            reasonText: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        },
        {
            id: uuid(),
            title: 'Lorem ipsum dolor sit amet',
            createdDate: new Date(),
            status: 'declined' as const,
            reasonText: 'Consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
        },
    ], []);

    const accordionItems = useMemo(() => [
        {
            title: t('docusign:accordion_title', { count: envelopeData.length }) ?? `DocuSign envelope status (${envelopeData.length})`,
            headingType: 'small' as const,
            headingTag: 'h2' as const,
            content: (
                <div>
                    {envelopeData.map((envelope) => (
                        <EnvelopeItem
                            key={envelope.id}
                            envelope={envelope}
                            formatDate={formatDate}
                        />
                    ))}
                </div>
            ),
        },
    ], [t, envelopeData, formatDate]);

    return (
        <Container>
            <StyledAccordion items={accordionItems} />
        </Container>
    );
});
