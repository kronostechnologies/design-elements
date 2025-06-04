import { RadioCard } from '~/components/radio-card-group/radio-card';
import { RadioCardGroup } from '~/components/radio-card-group/radio-card-group';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';

describe('Radio Card', () => {
    const inputTestId = 'radio-card-test-input';
    const labelTestId = 'radio-card-test-label';

    it('onChange callback is called when input is changed', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" onChange={callback}>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
        );

        getByTestId(wrapper, inputTestId).simulate('change');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test.skip('onChange callback is called when label is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" onChange={callback}>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
        );

        getByTestId(wrapper, labelTestId).simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
