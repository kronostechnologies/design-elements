import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithProviders } from '../../test-utils/renderer';
import { RadioCardGroup } from './radio-card-group';
import { RadioCard } from './radio-card';

jest.mock('../../utils/uuid');

describe('Radio Card', () => {
    const inputTestId = 'radio-card-test-input';
    const containerTestId = 'radio-card-test-container';

    test('onChange callback is called when input is changed', () => {
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

    test.skip('onChange callback is called when container is clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" onChange={callback}>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
        );

        getByTestId(wrapper, containerTestId).simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('label should have isChecked prop set to true when input is defaultChecked', () => {
        const wrapper = mountWithTheme(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" defaultChecked>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
        );

        expect(getByTestId(wrapper, containerTestId).getElement().props.isChecked).toBe(true);
    });

    test('container should have isChecked prop set to true when input is checked', () => {
        const wrapper = mountWithTheme(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" defaultChecked>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
        );

        expect(getByTestId(wrapper, containerTestId).getElement().props.isChecked).toBe(true);
    });

    test('Matches snapshot (Default, Desktop)', () => {
        const tree = renderWithProviders(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test">
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (Label, Desktop)', () => {
        const tree = renderWithProviders(
            <RadioCardGroup label="Test">
                <RadioCard name="test" label="Test" value="test">
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (Checked, Desktop)', () => {
        const tree = renderWithProviders(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" checked>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (Disabled, Desktop)', () => {
        const tree = renderWithProviders(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test" disabled>
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (Default, Mobile)', () => {
        const tree = renderWithProviders(
            <RadioCardGroup>
                <RadioCard name="test" label="Test" value="test">
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches snapshot (Label, Mobile)', () => {
        const tree = renderWithProviders(
            <RadioCardGroup label="Test">
                <RadioCard name="test" label="Test" value="test">
                    Test description
                </RadioCard>
            </RadioCardGroup>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
