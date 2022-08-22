import { forwardRef } from 'react';
import { CommonSearchProps, SearchInput } from './search-input';

export type SearchGlobalProps = CommonSearchProps

export const SearchGlobal = forwardRef(
    (props: SearchGlobalProps, ref) => (
        <SearchInput
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
            hasButton
            data-testid="search-input"
            ref={ref}
        />
    ),
);

SearchGlobal.displayName = 'Button';
