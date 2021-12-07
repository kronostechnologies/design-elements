import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { doNothing } from '../../test-utils/callbacks';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { ChooserButton } from './chooser-button';

jest.mock('../../utils/uuid');

describe('Chooser Button', () => {
    test('onChange Callback is called when changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(
                <ChooserButton
                    groupName="maritalStatus"
                    onChange={callback}
                    type="radio"
                    value="test value"
                >
                    Children
                </ChooserButton>,
            ),
        );
        wrapper.find('input').simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <ChooserButton
                    groupName="maritalStatus"
                    onChange={doNothing}
                    type="radio"
                    value="test value"
                    defaultChecked
                >
                    Children
                </ChooserButton>,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
