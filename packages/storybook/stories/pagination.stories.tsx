import { Pagination } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import { DeviceContextDecorator } from './utils/device-context-decorator';

export default {
    title: 'Pagination',
    component: Pagination,
    decorators: [DeviceContextDecorator],
};

export const Normal: Story = () => (
    <>
        <Pagination totalPages={3} numberOfResults={30} />
        <Pagination totalPages={5} numberOfResults={100} />
        <Pagination totalPages={50} numberOfResults={1530} />
    </>
);

export const LinkedPagination: Story = () => {
    const [currentPage, setCurrentPage] = useState(1);
    return (
        <>
            <Pagination 
                totalPages={5}
                numberOfResults={100}
                onPageChange={(page: number) => setCurrentPage(page)}
                activePage={currentPage} />
            <Pagination 
                totalPages={5}
                numberOfResults={100}
                onPageChange={(page: number) => setCurrentPage(page)}
                activePage={currentPage} />
        </>
    );
};

export const WithoutResults: Story = () => (
    <>
        <Pagination totalPages={11} />
    </>
);
