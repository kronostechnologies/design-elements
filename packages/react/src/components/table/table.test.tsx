import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Table } from './table';

describe('Table', () => {
    test('matches the snapshot', () => {
        const wrapper = shallow(
            <Table columns={columns} data={data} />,
        );

        expect(toJson(wrapper)).toMatchSnapshot();
    });
});

const columns = [
    {
        Header: 'Column 1',
        accessor: 'column1',
    },
    {
        Header: 'Column 2',
        accessor: 'column2',
    },
];

const data = [
    {
        column1: 'Hello',
        column2: 'World',
    },
    {
        column1: 'Hello',
        column2: 'World',
    },
    {
        column1: 'Hello',
        column2: 'World',
    },
];
