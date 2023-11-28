import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';
import { ChooserButtonGroup } from './chooser-button-group';

describe('Chooser Button GroupItem', () => {
    const maritalStatus = [
        { value: 'single', label: 'Single, living alone or with a roommate' },
        { value: 'married', label: 'Married or living with a spouse' },
    ];

    const skipOption = {
        label: 'Would rather not say',
        value: 'skip',
    };

    test('onChange callback is called when chooser-button is changed', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <ChooserButtonGroup
                inColumns
                groupName="maritalStatus"
                options={maritalStatus}
                skipOption={skipOption}
                onChange={callback}
            />,
        );

        wrapper.find('input').at(0).simulate('change');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <ChooserButtonGroup
                inColumns
                groupName="maritalStatus"
                options={maritalStatus}
                skipOption={skipOption}
                value="married"
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
