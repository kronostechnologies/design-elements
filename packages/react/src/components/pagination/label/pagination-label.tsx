import { FC } from 'react';
import { ScreenReaderOnlyText } from '../../screen-reader-only-text/ScreenReaderOnlyText';
import { useTranslation } from '../../../i18n/use-translation';
import { useDeviceContext } from '../../device-context-provider/device-context-provider';
import { ResultsLabelHeading } from './styled';
import { usePaginationContext } from '../context';

interface PageLabelProps {
    id: string;
}

export const PaginationLabel: FC<PageLabelProps> = ({
    id,
}) => {
    const { t } = useTranslation('pagination');
    const { isMobile } = useDeviceContext();
    const { resultsPerPage, currentPage, numberOfResults } = usePaginationContext();

    const pageStartIndex = resultsPerPage && numberOfResults
        ? (resultsPerPage * (currentPage - 1)) + 1 : 0;
    const pageEndIndex = resultsPerPage && numberOfResults
        ? Math.min(numberOfResults, resultsPerPage * currentPage) : 0;

    return (
        <div className="pagination-label" aria-live='off' role='status'>
            <ResultsLabelHeading
                id={id}
                data-testid="resultsLabel"
                type="small"
                tag="h3"
                $isMobile={isMobile}
            >
                <ScreenReaderOnlyText label={`${t('pagination')} - `} />
                {t('results', {
                    pageStartIndex,
                    pageEndIndex,
                    numberOfResults,
                })}
            </ResultsLabelHeading>
        </div>
    );
};
