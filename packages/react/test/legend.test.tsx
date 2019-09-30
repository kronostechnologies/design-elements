import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { Legend } from '../src/components/results/legend';

describe('Legend', () => {
    const legendItem = [
        {
            name: 'You',
            description: 'Data from your answers',
        },
        {
            name: 'Equisoft Peers',
            description: 'Private Equisoft data',
            color: '#000014',
        },
        {
            name: 'General Peers',
            description: 'Publicly accessible data',
            color: '#304E63',
        },
    ];

    test('Is rendering all legends', () => {
        const wrapper = mount(
            <Legend items={legendItem}/>,
        );
        expect(wrapper.find(`li`).length).toBe(3);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Legend items={legendItem}/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
