import React from 'react';
import styled from 'styled-components';
import { Button } from '../buttons/button';

const Title = styled.h2`
    font-size: 1.25rem;
    font-weight: var(--font-normal);
    height: 32px;
    line-height: 24px;
    margin-bottom: var(--spacing-2x);
    margin-top: 0;
`;

const Subtitle = styled.h3`
    font-size: 1rem;
    font-weight: var(--font-normal);
    height: 24px;
    line-height: 22px;
    margin: 0;
`;

const ConfirmButton = styled(Button)`
    margin-right: var(--spacing-1x);
`;

const CancelButton = styled(Button)``;

interface GetHeaderProps {
    titleId: string;
    title?: string;
    subtitle?: string;
}

interface GetFooterProps {
    closeModal(): void;
}

export const getHeader = ({ titleId, title, subtitle }: GetHeaderProps) => {
    if (title || subtitle) {
        return (
            <>
                {title && <Title id={titleId} tabIndex={-1}>{title}</Title>}
                {subtitle && <Subtitle tabIndex={-1}>{subtitle}</Subtitle>}
            </>
        );
    } else return undefined;
};

export const getFooter = ({ closeModal }: GetFooterProps) => (
    <>
        <ConfirmButton label="Confirm" buttonType="primary"/>
        <CancelButton label="Cancel" buttonType="tertiary" onClick={closeModal}/>
    </>
);
