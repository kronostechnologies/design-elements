import { FunctionComponent, PropsWithChildren, useEffect, useMemo, useState } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { clsx } from 'clsx';
import { useTranslation } from '../../i18n/use-translation';
import { Spinner } from '../spinner/spinner';
import { useTheme } from '../../hooks/use-theme';
import { Lozenge } from '../lozenge/lozenge';
import { useId } from '../../hooks/use-id';
import { Button, IconButton } from '../buttons';
import { Icon } from '../icon/icon';
import { attachedFileClasses } from './attached-file-classes';

type AttachedFileStatus = 'default' | 'uploading' | 'cancelled' | 'error' | 'success';

function formatFilesize(units: string[], size: number): string {
    let i = 0;
    let scaledSize = size;
    while (scaledSize >= 1024) {
        scaledSize /= 1024;
        i += 1;
    }
    const roundedValue = Math.round(scaledSize * 10) / 10;

    return `${roundedValue} ${units[i]}`;
}

const getStatustextColor = (status: AttachedFileStatus, theme: DefaultTheme): string => {
    switch (status) {
        case 'error':
            return theme.component['attached-file-error-text-color'];
        case 'success':
            return theme.component['attached-file-success-text-color'];
        default:
            return theme.component['attached-file-auxiliary-text-color'];
    }
};

const AttachedFileRoot = styled.div<{ $status: AttachedFileStatus }>`
    align-items: flex-start;
    background-color: ${({ theme }) => theme.component['attached-file-background-color']};
    border: 1px solid ${({ theme }) => theme.component['attached-file-border-color']};
    border-radius: var(--border-radius);
    display: flex;
    gap: var(--spacing-1x);
    padding: var(--spacing-1x) var(--spacing-2x) var(--spacing-1x) var(--spacing-1halfx);
    
    .${attachedFileClasses.icon} {
        height: var(--size-1x);
        margin-top: var(--spacing-half);
        width: var(--size-1x);
    }

    .${attachedFileClasses.status} {
        color: ${({ theme, $status }) => getStatustextColor($status, theme)};
    }
`;

const AttachedFileContent = styled.div`
    color: ${({ theme }) => theme.component['attached-file-text-color']};
    display: flex;
    flex-direction: column;
    font-size: 0.75rem;
    gap: var(--spacing-half);
    line-height: 1rem;
    margin-top: var(--spacing-half);
`;

const AttachedFileName = styled.span`
    display: block;
`;

const AttachedFileActions = styled.div`
    align-items: center;
    display: flex;
    flex-shrink: 0;
    gap: var(--spacing-1x);
    margin-left: auto;
`;

export interface AttachedFileProps {
    id?: string;
    filename: string;
    className?: string;
    /**
     * Size in bytes
     */
    filesize: number;
    percent?: number;
    errorText?: string;
    onCancel?(): void;
    onDelete?(): void;
    onRetry?(): void;
    onClose?(): void;
    status?: AttachedFileStatus;
    lozengeText?: string;
}

export const AttachedFile: FunctionComponent<PropsWithChildren<AttachedFileProps>> = ({
    id: providedId,
    className,
    filename,
    filesize,
    percent,
    errorText,
    onCancel,
    onDelete,
    onRetry,
    onClose,
    status = 'default',
    lozengeText,
    children,
}) => {
    const { t } = useTranslation('attached-file');
    const { t: tCommon } = useTranslation('common');
    const id = useId(providedId);
    const theme = useTheme();
    const [currentStatus, setCurrentStatus] = useState(status);

    useEffect(() => {
        if (status === 'success') {
            const timer = setTimeout(() => setCurrentStatus('default'), 2000);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [status]);

    const renderIcon = (): JSX.Element => {
        switch (currentStatus) {
            case 'uploading':
                return (
                    <Spinner
                        className={attachedFileClasses.icon}
                        color="#333"
                        percent={percent ?? 0}
                    />
                );
            case 'cancelled':
                return (
                    <Icon
                        className={attachedFileClasses.icon}
                        color={theme.component['attached-file-error-icon-color']}
                        name="xOctagon"
                    />
                );
            case 'error':
                return (
                    <Icon
                        className={attachedFileClasses.icon}
                        color={theme.component['attached-file-error-icon-color']}
                        name="alertOctagon"
                    />
                );
            case 'success':
                return (
                    <Icon
                        className={attachedFileClasses.icon}
                        color={theme.component['attached-file-success-icon-color']}
                        name="check"
                    />
                );
            default:
                return (
                    <Icon
                        className={attachedFileClasses.icon}
                        color={theme.component['attached-file-icon-color']}
                        name="file"
                    />
                );
        }
    };

    const renderActions = (): JSX.Element => {
        switch (currentStatus) {
            case 'uploading':
                return <Button buttonType='tertiary' onClick={onCancel} size='small'>{t('cancel')}</Button>;
            case 'cancelled':
                return (
                    <>
                        <Button buttonType='tertiary' onClick={onRetry} size='small'>{t('resume')}</Button>
                        <IconButton
                            buttonType='tertiary'
                            onClick={onClose}
                            iconName='x'
                            size='small'
                            aria-label={t('Close')}
                        />
                    </>
                );
            case 'error':
                return (
                    <>
                        {onRetry && <Button buttonType='tertiary' onClick={onRetry} size='small'>{t('retry')}</Button>}
                        <IconButton
                            buttonType='tertiary'
                            onClick={onClose}
                            iconName='x'
                            size='small'
                            aria-label={t('Close')}
                        />
                    </>
                );
            default:
                return (
                    <IconButton
                        id={`${id}-delete`}
                        type="button"
                        iconName="trash"
                        buttonType="tertiary"
                        aria-label={t('deleteFile')}
                        aria-labelledby={`${id}-delete ${id}-filename`}
                        onClick={onDelete}
                        size='small'
                    />
                );
        }
    };

    const statusText = useMemo(() => {
        switch (currentStatus) {
            case 'uploading':
                return t('uploading') + (percent !== undefined ? ` ${percent}%` : null);
            case 'cancelled':
                return t('uploadCancelled');
            case 'error':
                return errorText;
            case 'success':
                return t('uploadCompleted');
            default:
                return undefined;
        }
    }, [t, currentStatus, errorText, percent]);

    const filesizeText = filesize ? ` (${formatFilesize(tCommon('unitSymbolBytes', { returnObjects: true }) as string[], filesize)})` : null;

    return (
        <AttachedFileRoot className={clsx(attachedFileClasses.root, className)} id={id} $status={currentStatus}>
            {renderIcon()}
            <AttachedFileContent>
                <AttachedFileName id={`${id}-filename`}>
                    {filename}
                    {filesizeText}
                </AttachedFileName>
                {statusText && (
                    <span className={attachedFileClasses.status}>
                        {statusText}
                    </span>
                )}
            </AttachedFileContent>
            <AttachedFileActions>
                {lozengeText ? (
                    <Lozenge
                        variant='neutral'
                        icon='fileText'
                        subtle
                    >
                        {lozengeText}
                    </Lozenge>
                ) : children}
                {renderActions()}
            </AttachedFileActions>
        </AttachedFileRoot>
    );
};
