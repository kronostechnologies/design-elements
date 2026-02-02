import { VoidFunctionComponent } from 'react';
import { CommonSearchProps, SearchInput } from './search-input';

export type SearchContextualProps = CommonSearchProps

export const SearchContextual: VoidFunctionComponent<SearchContextualProps> = (props) => (
    <SearchInput
        {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        hasIcon
        data-testid="search-input"
    />
);

SearchContextual.displayName = 'SearchContextual';
