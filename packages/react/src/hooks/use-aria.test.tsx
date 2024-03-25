import { renderHook } from '@testing-library/react-hooks';
import { shallow } from 'enzyme';
import { TextArea } from '../components/text-area/text-area';
import { TextInput } from '../components/text-input/text-input';
import { getByTestId } from '../test-utils/enzyme-selectors';
import { useAriaLabels } from './use-aria';

describe('useAriaLabels hook', () => {
    it('warns when no labels are provided', () => {
        const consoleSpy = jest.spyOn(console, 'warn');
        consoleSpy.mockImplementation(() => {});

        renderHook(() => useAriaLabels({}));
        shallow(<TextInput />);

        expect(console.warn).toHaveBeenCalledWith('Component is missing a label, aria-label, or aria-labelledby.');
        expect(console.warn).toHaveBeenCalledTimes(2);
        consoleSpy.mockRestore();
    });

    it('warns when more than one label type is provided', () => {
        const consoleSpy = jest.spyOn(console, 'warn');
        consoleSpy.mockImplementation(() => {});

        renderHook(() => useAriaLabels({ label: 'Test Label', ariaLabel: 'Test Aria Label' }));
        shallow(<TextInput label="This is a label" ariaLabel="This is ariaLabel" />);

        expect(console.warn).toHaveBeenCalledWith(
            'Should not have more than one of label, aria-label, or aria-labelledby set.',
        );
        expect(console.warn).toHaveBeenCalledTimes(2);
        consoleSpy.mockRestore();
    });

    it('adjusts labels when only label is provided', () => {
        const { result } = renderHook(() => useAriaLabels({ inputId: 'test_id', label: 'Test Label' }));
        const wrapper = shallow(<TextInput id="test_id" label="Test Label" />);
        const inputWrapper = getByTestId(wrapper, 'text-input');
        const fieldContainerWrapper = getByTestId(wrapper, 'field-container');

        expect(result.current.processedLabels.label).toBe('Test Label');
        expect(result.current.processedLabels.ariaLabel).toBe('Test Label');
        expect(result.current.processedLabels.ariaLabelledBy).toBe('test_id_label');
        expect(inputWrapper.prop('aria-label')).toContain('Test Label');
        expect(inputWrapper.prop('aria-labelledby')).toContain('test_id_label');
        expect(fieldContainerWrapper.prop('label')).toContain('Test Label');
    });

    it('adjusts labels when only aria-label is provided', () => {
        const { result } = renderHook(() => useAriaLabels({ ariaLabel: 'Test Aria Label' }));
        const wrapper = shallow(<TextInput id="test_id" ariaLabel="Test Aria Label" />);
        const inputWrapper = getByTestId(wrapper, 'text-input');
        const fieldContainerWrapper = getByTestId(wrapper, 'field-container');

        expect(result.current.processedLabels.label).toBeUndefined();
        expect(result.current.processedLabels.ariaLabel).toBe('Test Aria Label');
        expect(result.current.processedLabels.ariaLabelledBy).toBeUndefined();
        expect(inputWrapper.prop('aria-label')).toContain('Test Aria Label');
        expect(inputWrapper.prop('aria-labelledby')).toBeUndefined();
        expect(fieldContainerWrapper.prop('label')).toBeUndefined();
    });

    it('adjusts labels when only aria-labelledby is provided', () => {
        const { result } = renderHook(() => useAriaLabels(
            {
                inputId: 'test_id',
                ariaLabelledBy: 'Test Aria LabelledBy',
            },
        ));
        const wrapper = shallow(<TextInput id="test_id" ariaLabelledBy='Test Aria LabelledBy' />);
        const inputWrapper = getByTestId(wrapper, 'text-input');
        const fieldContainerWrapper = getByTestId(wrapper, 'field-container');

        expect(result.current.processedLabels.label).toBeUndefined();
        expect(result.current.processedLabels.ariaLabel).toBeUndefined();
        expect(result.current.processedLabels.ariaLabelledBy).toBe('Test Aria LabelledBy');
        expect(inputWrapper.prop('aria-label')).toBeUndefined();
        expect(inputWrapper.prop('aria-labelledby')).toBe('Test Aria LabelledBy');
        expect(fieldContainerWrapper.prop('label')).toBeUndefined();
    });

    it('correctly processes conditional IDs for aria-labelledby', () => {
        const { result } = renderHook(() => useAriaLabels({
            label: 'Test Label',
            additonalAriaLabelledBy: [{ id: 'extra_label', include: true }],
        }));

        const wrapper = shallow(
            <TextInput
                id="test_id"
                label="Test Label"
                ariaLabelledBy="extra_label"
            />,
        );

        const inputWrapper = getByTestId(wrapper, 'text-input');
        const fieldContainerWrapper = getByTestId(wrapper, 'field-container');

        expect(result.current.processedLabels.label).toBe('Test Label');
        expect(result.current.processedLabels.ariaLabel).toBe('Test Label');
        expect(result.current.processedLabels.ariaLabelledBy).toContain('extra_label');
        expect(inputWrapper.prop('aria-label')).toContain('Test Label');
        expect(inputWrapper.prop('aria-labelledby')).toContain('test_id_label');
        expect(inputWrapper.prop('aria-labelledby')).toContain('extra_label');
        expect(fieldContainerWrapper.prop('label')).toBe('Test Label');
    });

    it('correctly processes conditional IDs for aria-describedby with validity and hints', () => {
        const { result } = renderHook(() => useAriaLabels({
            inputId: 'test_input',
            label: 'Test Label',
            hasHint: true,
            isValid: true,
            additionalAriaDescribedBy: [{ id: 'extra_description', include: true }],
        }));

        const wrapper = shallow(
            <TextInput
                id="test_id"
                label="Test Label"
                hint="Test Hint"
                ariaDescribedBy="extra_description"
            />,
        );

        const inputWrapper = getByTestId(wrapper, 'text-input');
        const fieldContainerWrapper = getByTestId(wrapper, 'field-container');

        expect(result.current.processedLabels.label).toBe('Test Label');
        expect(result.current.processedLabels.ariaLabel).toBe('Test Label');
        expect(result.current.processedLabels.ariaDescribedBy).toContain('extra_description');
        expect(result.current.processedLabels.ariaDescribedBy).toContain('test_input_hint');
        expect(result.current.processedLabels.ariaDescribedBy).not.toContain('test_input_invalid');
        expect(inputWrapper.prop('aria-labelledby')).toContain('test_id_label');
        expect(inputWrapper.prop('aria-describedby')).toContain('test_id_hint');
        expect(inputWrapper.prop('aria-describedby')).toContain('extra_description');
        expect(inputWrapper.prop('aria-describedby')).not.toContain('test_id_invalid');
        expect(fieldContainerWrapper.prop('label')).toBe('Test Label');
        expect(fieldContainerWrapper.prop('hint')).toContain('Test Hint');
    });

    it('correctly processes conditional IDs for aria-describedby with validity', () => {
        const { result } = renderHook(() => useAriaLabels({
            inputId: 'test_input',
            label: 'Test Label',
            isValid: false,
        }));

        const wrapper = shallow(
            <TextInput
                id="test_id"
                label="Test Label"
                valid={false}
            />,
        );

        const inputWrapper = getByTestId(wrapper, 'text-input');
        const fieldContainerWrapper = getByTestId(wrapper, 'field-container');

        expect(result.current.processedLabels.ariaDescribedBy).not.toContain('extra_description');
        expect(result.current.processedLabels.ariaDescribedBy).not.toContain('test_input_hint');
        expect(result.current.processedLabels.ariaDescribedBy).toContain('test_input_invalid');
        expect(inputWrapper.prop('aria-describedby')).not.toContain('extra_description');
        expect(inputWrapper.prop('aria-describedby')).not.toContain('test_id_hint');
        expect(inputWrapper.prop('aria-describedby')).toContain('test_id_invalid');
        expect(fieldContainerWrapper.prop('label')).toBe('Test Label');
        expect(fieldContainerWrapper.prop('hint')).toBeUndefined();
    });

    it('correctly processes conditional IDs for aria-describedby with extra component', () => {
        const wrapper = shallow(
            <TextArea
                id="test_id"
                label="Test Label"
                maxLength={1}
                value="maxLength"
            />,
        );

        const inputWrapper = getByTestId(wrapper, 'textarea');
        const fieldContainerWrapper = getByTestId(wrapper, 'field-container');

        expect(inputWrapper.prop('aria-describedby')).toContain('test_id_counter');
        expect(fieldContainerWrapper.prop('label')).toBe('Test Label');
    });
});
