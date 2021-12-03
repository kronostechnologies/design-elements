import { ReactElement } from 'react';
import { CommonSearchProps, SearchInput } from './search-input';

export type SearchGlobalProps = CommonSearchProps

export function SearchGlobal(props: SearchGlobalProps): ReactElement {
    return (
        <SearchInput
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
            hasButton
            data-testid="search-input"
        />
    );
}
