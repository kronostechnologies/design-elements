import { FC } from 'react';
import { ScreenReaderOnlyText } from '../../screen-reader-only-text/ScreenReaderOnlyText';
import { useTranslation } from '../../../i18n/use-translation';
import { useDeviceContext } from '../../device-context-provider/device-context-provider';
import { CurrentPageLabelHeading, ResultsLabel } from './styled';
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
        <div aria-live='off' role='status'>
            <CurrentPageLabelHeading id={id} data-testid="currentPageLabelHeading">
                <ResultsLabel isMobile={isMobile} data-testid="resultsLabel">
                    <ScreenReaderOnlyText label={`${t('pagination')} - `} />
                    {t('results', {
                        pageStartIndex,
                        pageEndIndex,
                        numberOfResults,
                    })}
                </ResultsLabel>
            </CurrentPageLabelHeading>
        </div>
    );
};
