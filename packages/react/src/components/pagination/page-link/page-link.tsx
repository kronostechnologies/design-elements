import { FC, useCallback } from 'react';
import { useDeviceContext } from '../../device-context-provider/device-context-provider';
import { Page, StyledText } from './styled';
import { usePaginationContext } from '../context';

interface PageLinkProps {
    index: number;
}

export const PageLink: FC<PageLinkProps> = ({
    index,
}) => {
    const { isMobile } = useDeviceContext();
    const { currentPage, changePage } = usePaginationContext();
    const isSelected = index === currentPage;
    const id = `page-${index}`;

    const handlePageKeyDown = useCallback((key: string, page: number): void => {
        if (key === 'Enter') {
            changePage(page);
        }
    }, [changePage]);

    return (
        <Page
            key={id}
            data-testid={id}
            isSelected={isSelected}
            onClick={isSelected ? undefined : () => changePage(index)}
            onKeyPress={(event) => handlePageKeyDown(event.key, index)}
            isMobile={isMobile}
            tabIndex={0}
        >
            <StyledText
                aria-label={`go to page ${index}`}
                aria-current={isSelected ? 'page' : undefined}
                isMobile={isMobile}
                isSelected={isSelected}
            >
                {index}
            </StyledText>
        </Page>
    );
};
