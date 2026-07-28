import { type FC } from 'react';
import { CommonSearchProps, SearchInput } from './search-input';

export type SearchGlobalProps = CommonSearchProps

export const SearchGlobal: FC<SearchGlobalProps> = (props) => (
    <SearchInput
        {...props /* eslint-disable-line react/jsx-props-no-spreading */}
        hasButton
        data-testid="search-input"
    />
);

SearchGlobal.displayName = 'SearchGlobal';
