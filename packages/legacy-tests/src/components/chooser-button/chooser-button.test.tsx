import { ChooserButton } from '~/components/chooser-button/chooser-button';
import { doNothing } from '../../test-utils/callbacks';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';

describe('Chooser Button', () => {
    it('onChange Callback is called when changed', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <ChooserButton
                groupName="maritalStatus"
                onChange={callback}
                type="radio"
                value="test value"
            >
                Children
            </ChooserButton>,
        );

        wrapper.find('input').simulate('change');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <ChooserButton
                groupName="maritalStatus"
                onChange={doNothing}
                type="radio"
                value="test value"
                defaultChecked
            >
                Children
            </ChooserButton>,
        );

        expect(tree).toMatchSnapshot();
    });
});
