import { ReactElement } from 'react';
import { CommonSearchProps, SearchInput } from './search-input';

export type SearchContextualProps = CommonSearchProps

export function SearchContextual(props: SearchContextualProps): ReactElement {
    return (
        <SearchInput
            {...props /* eslint-disable-line react/jsx-props-no-spreading */}
            hasIcon
            data-testid="search-input"
        />
    );
}
