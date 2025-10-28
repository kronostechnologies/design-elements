import { forwardRef } from 'react';
import { CommonSearchProps, SearchInput } from './search-input';

export type SearchContextualProps = CommonSearchProps

export const SearchContextual = forwardRef<HTMLInputElement, SearchContextualProps>((props, ref) => (
    <SearchInput
        {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        hasIcon
        data-testid="search-input"
        ref={ref}
    />
));

SearchContextual.displayName = 'SearchContextual';
