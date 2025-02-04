import { FC, useCallback } from 'react';
import { useDeviceContext } from '../../device-context-provider/device-context-provider';
import { PageButtonWrapper, StyledButton, StyledText } from './styled';
import { usePaginationContext } from '../context';

interface PageButtonProps {
    index: number;
}

export const PaginationPageButton: FC<PageButtonProps> = ({
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
        <PageButtonWrapper key={id}>
            <StyledButton
                className="pagination-page-button"
                data-testid={id}
                isSelected={isSelected}
                onClick={isSelected ? undefined : () => changePage(index)}
                onKeyPress={(event) => handlePageKeyDown(event.key, index)}
                type="button"
                $isMobile={isMobile}
            >
                <StyledText
                    aria-label={`go to page ${index}`}
                    aria-current={isSelected ? 'page' : undefined}
                    $isMobile={isMobile}
                    isSelected={isSelected}
                >
                    {index}
                </StyledText>
            </StyledButton>
        </PageButtonWrapper>

    );
};
