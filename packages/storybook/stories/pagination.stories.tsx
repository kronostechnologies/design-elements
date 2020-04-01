import { DeviceContextProvider, Pagination } from '@equisoft/design-elements-react';
import * as React from 'react';

export default {
    title: 'Pagination',
    component: Pagination,
    decorators: [(storyFn: () => React.ReactElement) => <DeviceContextProvider>{storyFn()}</DeviceContextProvider>],
};

export const normal = () => (
    <Pagination totalPages={11} defaultActivePage={1} pagesShown={5} />
);
