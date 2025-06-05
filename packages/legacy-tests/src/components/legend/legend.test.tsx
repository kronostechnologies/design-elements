import { Legend } from '~/components/legend/legend';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';

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

    it('Is rendering all legends', () => {
        const wrapper = mountWithTheme(<Legend items={legendItem} />);

        expect(wrapper.find('li').length).toBe(3);
    });

    it('Matches the snapshot', () => {
        const tree = renderWithTheme(<Legend items={legendItem} />);

        expect(tree).toMatchSnapshot();
    });
});
