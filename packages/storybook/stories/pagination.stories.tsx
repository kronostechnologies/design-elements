import { Pagination } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { DeviceContextDecorator } from './utils/device-context-decorator';
import { rawCodeParameters } from './utils/parameters';

const PaginationMeta: Meta<typeof Pagination> = {
    title: 'Components/Pagination',
    component: Pagination,
    decorators: [DeviceContextDecorator],
    args: {
        resultsPerPage: 10,
        numberOfResults: 30,
    },
    argTypes: {
        onPageChange: {
            control: { disable: true },
        },
    },
    render: (args) => (
        <Pagination
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        />
    ),
};

export default PaginationMeta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
    ...PaginationMeta,
};

export const ControlledPagination: Story = {
    ...PaginationMeta,
    render: () => {
        const [currentPage, setCurrentPage] = useState(18);

        return (
            <Pagination
                resultsPerPage={5}
                numberOfResults={100}
                onPageChange={setCurrentPage}
                activePage={currentPage}
            />
        );
    },
};
ControlledPagination.parameters = rawCodeParameters;
