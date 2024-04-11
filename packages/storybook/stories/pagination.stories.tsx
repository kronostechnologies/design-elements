import { Pagination } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { DeviceContextDecorator } from './utils/device-context-decorator';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Pagination',
    component: Pagination,
    decorators: [DeviceContextDecorator],
};

export const Default: Story = () => (
    <>
        <Pagination resultsPerPage={10} numberOfResults={30} />
        <Pagination resultsPerPage={50} numberOfResults={100} />
        <Pagination resultsPerPage={75} numberOfResults={1530} />
    </>
);

export const ControlledPagination: Story = () => {
    const [currentPage, setCurrentPage] = useState(18);

    return (
        <Pagination
            resultsPerPage={5}
            numberOfResults={100}
            onPageChange={setCurrentPage}
            activePage={currentPage}
        />
    );
};
ControlledPagination.parameters = rawCodeParameters;
