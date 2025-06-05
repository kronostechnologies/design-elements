import { shallow } from 'enzyme';
import { TextArea } from '~/components/text-area/text-area';
import { doNothing } from '../../test-utils/callbacks';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';

describe('TextArea', () => {
    const defaultProps = {
        defaultValue: 'foo',
        label: 'Comment',
        placeholder: 'Enter your comment',
        required: true,
        validationErrorMessage: 'Error message',
    };
    it('onChange callback is called when content is changed', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<TextArea onChange={callback} {...defaultProps} />);

        wrapper.find('textarea').simulate('change', { target: { value: 'bar' } });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onBlur callback is called when content is blurred', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<TextArea onBlur={callback} {...defaultProps} />);

        wrapper.find('textarea').simulate('blur');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onFocus callback is called when content is focused', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<TextArea onFocus={callback} {...defaultProps} />);

        wrapper.find('textarea').simulate('focus');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('onFocus callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<TextArea onBlur={callback} {...defaultProps} disabled />);

        wrapper.find('textarea').simulate('focus');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    it('onFocus callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<TextArea onBlur={callback} {...defaultProps} disabled />);

        wrapper.find('textarea').simulate('focus');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    it('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <TextArea data-testid="some-data-testid" onChange={doNothing} onBlur={doNothing} {...defaultProps} />,
        );

        expect(tree).toMatchSnapshot();
    });

    it('Is disabled', () => {
        const tree = renderWithTheme(<TextArea onChange={doNothing} onBlur={doNothing} {...defaultProps} disabled />);

        expect(tree).toMatchSnapshot();
    });

    it('should flag input as invalid when length exceeds maxLength', () => {
        const wrapper = shallow(
            <TextArea label="Test Input" maxLength={20} />,
        );

        getByTestId(wrapper, 'textarea')
            .simulate('change', { currentTarget: { value: 'This text is longer than input length' } });

        const container = getByTestId(wrapper, 'container');
        const charCounter = getByTestId(wrapper, 'char-counter');
        expect(container.prop('valid')).toBe(false);
        expect(charCounter.prop('valid')).toBe(false);
    });

    it('should display character count when maxLength is provided', () => {
        const wrapper = shallow(
            <TextArea label="Test Input" defaultValue="Default input text" maxLength={20} />,
        );

        const charCounter = getByTestId(wrapper, 'char-counter');
        expect(charCounter.text()).toBe('<ScreenReaderOnlyText />18 / 20 characters');
    });

    it('should not display character count when maxLength is not provided', () => {
        const wrapper = shallow(
            <TextArea label="Test Input" defaultValue="Default input text" />,
        );

        const charCounter = findByTestId(wrapper, 'char-counter');
        expect(charCounter.exists()).toBe(false);
    });
});
