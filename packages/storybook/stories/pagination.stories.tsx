import { Pagination } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { DeviceContextDecorator } from './utils/device-context-decorator';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Navigation/Pagination',
    component: Pagination,
    decorators: [DeviceContextDecorator],
};

export const Normal: Story = () => (
    <>
        <Pagination totalPages={0} numberOfResults={undefined} />
        <Pagination totalPages={3} numberOfResults={30} />
        <Pagination totalPages={5} numberOfResults={100} />
        <Pagination totalPages={50} numberOfResults={1530} />
    </>
);

export const ControlledPagination: Story = () => {
    const [currentPage, setCurrentPage] = useState(1);

    return (
        <Pagination
            totalPages={5}
            numberOfResults={100}
            onPageChange={setCurrentPage}
            activePage={currentPage}
        />
    );
};
ControlledPagination.parameters = rawCodeParameters;

export const WithoutResults: Story = () => (
    <Pagination totalPages={11} />
);

export const With4DigitsNumberOfPages: Story = () => (
    <Pagination totalPages={1000} />
);
