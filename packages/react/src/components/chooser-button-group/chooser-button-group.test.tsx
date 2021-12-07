import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { ChooserButtonGroup } from './chooser-button-group';

jest.mock('../../utils/uuid');

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
        const wrapper = mount(
            ThemeWrapped(
                <ChooserButtonGroup
                    inColumns
                    groupName="maritalStatus"
                    options={maritalStatus}
                    skipOption={skipOption}
                    onChange={callback}
                />,
            ),
        );

        wrapper.find('input').at(0).simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <ChooserButtonGroup
                    inColumns
                    groupName="maritalStatus"
                    options={maritalStatus}
                    skipOption={skipOption}
                    value="married"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
