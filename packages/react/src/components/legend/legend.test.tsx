import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';
import { Legend } from './legend';

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
        const wrapper = mountWithTheme(<Legend items={legendItem} />);

        expect(wrapper.find('li').length).toBe(3);
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(<Legend items={legendItem} />);

        expect(tree).toMatchSnapshot();
    });
});
