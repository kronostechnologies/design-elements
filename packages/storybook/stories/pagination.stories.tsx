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

export const WithoutResults: Story = () => (
    <Pagination resultsPerPage={11} />
);

export const With4DigitsNumberOfPages: Story = () => (
    <Pagination resultsPerPage={2} numberOfResults={2000} />
);
