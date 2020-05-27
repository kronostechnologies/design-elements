import React from 'react';
import { DeviceContextProvider } from '../device-context-provider/device-context-provider';
import { Pagination } from './pagination';

export default {
    title: 'Pagination',
    component: Pagination,
    decorators: [(storyFn: () => React.ReactElement) => <DeviceContextProvider>{storyFn()}</DeviceContextProvider>],
};

export const normal = () => (
    <>
        <Pagination totalPages={3} numberOfResults={30} />
        <Pagination totalPages={5} numberOfResults={100} />
        <Pagination totalPages={50} numberOfResults={1530} />
    </>
);
export const withoutResults = () => (
    <>
        <Pagination totalPages={11} />
    </>
);
