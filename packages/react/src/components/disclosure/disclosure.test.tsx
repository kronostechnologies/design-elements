import { shallow } from 'enzyme';
import { useId } from '../../hooks/use-id';
import { mountWithProviders } from '../../test-utils/renderer';
import { Button } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';
import { ButtonPropsWithoutOnClick, Container, Disclosure } from './disclosure';

jest.mock('../../hooks/use-id');

describe('Disclosure', () => {
    const content = 'content';
    const idContent = 'idContent';
    const buttonTypes = [
        {
            describeName: 'Button',
            component: Button,
            props: {
                buttonType: 'primary',
                label: 'disclose content',
            } as ButtonPropsWithoutOnClick,
        },
        {
            describeName: 'IconButton',
            component: IconButton,
            props: {
                iconName: 'home',
                buttonType: 'primary',
                label: 'disclose content',
            } as ButtonPropsWithoutOnClick,
        },
    ];

    beforeEach(() => {
        jest.mocked(useId).mockReturnValue(idContent);
    });

    buttonTypes.forEach(({
        describeName,
        props: buttonProps,
        component: ButtonComponent,
    }) => {
        describe(describeName, () => {
            it('renders a button and a div', () => {
                const wrapper = mountWithProviders(
                    <Disclosure buttonProps={buttonProps}>{content}</Disclosure>,
                );

                expect(wrapper.find(ButtonComponent).exists()).toBe(true);
                expect(wrapper.find(Container).exists()).toBe(true);
            });

            it('calls useId to generated content id', () => {
                const someId = 'someId';

                shallow(
                    <Disclosure buttonProps={buttonProps} idContent={someId}>{content}</Disclosure>,
                );

                expect(useId).toHaveBeenCalledWith(someId);
            });

            it('sets div content id to id generated by useId', () => {
                const wrapper = mountWithProviders(
                    <Disclosure buttonProps={buttonProps}>{content}</Disclosure>,
                );

                expect(wrapper.find(Container).prop('id')).toBe(idContent);
            });

            it('sets button aria-controls to id generated by useId', () => {
                const wrapper = shallow(
                    <Disclosure buttonProps={buttonProps}>{content}</Disclosure>,
                );

                expect(wrapper.find(ButtonComponent).prop('aria-controls')).toBe(idContent);
            });

            it('toggles expanded state when button is clicked', () => {
                const wrapper = mountWithProviders(
                    <Disclosure buttonProps={buttonProps}>{content}</Disclosure>,
                );
                const button = wrapper.find(ButtonComponent);

                expect(button.prop('aria-expanded')).toBe(false);
                button.simulate('click');

                expect(wrapper.find(ButtonComponent).prop('aria-expanded')).toBe(true);
                button.simulate('click');
                expect(wrapper.find(ButtonComponent).prop('aria-expanded')).toBe(false);
            });

            it('renders content container when button has not been clicked yet', () => {
                const childrenContent = <p>Test Content</p>;

                const wrapper = shallow(
                    <Disclosure buttonProps={buttonProps}>{childrenContent}</Disclosure>,
                );

                expect(wrapper.find(Container).exists()).toBe(true);
            });

            it('renders children content when button has not been clicked yet', () => {
                const childrenContent = <p>Test Content</p>;

                const wrapper = shallow(
                    <Disclosure buttonProps={buttonProps}>{childrenContent}</Disclosure>,
                );

                expect(wrapper.find(Container).contains(childrenContent)).toBe(true);
            });

            it('sets content container expanded to false when button has not been clicked yet', () => {
                const childrenContent = <p>Test Content</p>;

                const wrapper = shallow(
                    <Disclosure buttonProps={buttonProps}>{childrenContent}</Disclosure>,
                );

                expect(wrapper.find(Container).prop('$expanded')).toBe(false);
            });

            it('sets container expanded to true after button is clicked', () => {
                const childrenContent = <p>Test Content</p>;
                const wrapper = mountWithProviders(
                    <Disclosure buttonProps={buttonProps}>{childrenContent}</Disclosure>,
                );
                const button = wrapper.find(ButtonComponent);

                button.simulate('click');

                expect(wrapper.find(Container).prop('$expanded')).toBe(true);
            });

            it('sets container expanded back to false when button loses focus', () => {
                const childrenContent = <p>Test Content</p>;
                const wrapper = mountWithProviders(
                    <Disclosure buttonProps={buttonProps}>{childrenContent}</Disclosure>,
                );
                const button = wrapper.find(ButtonComponent);

                button.simulate('click');
                button.simulate('blur');

                expect(wrapper.find(Container).prop('$expanded')).toBe(false);
            });

            it('renders content container after button is clicked', () => {
                const childrenContent = <p>Test Content</p>;
                const wrapper = mountWithProviders(
                    <Disclosure buttonProps={buttonProps}>{childrenContent}</Disclosure>,
                );
                const button = wrapper.find(ButtonComponent);

                button.simulate('click');

                expect(wrapper.find(Container).exists()).toBe(true);
            });

            it('renders children content after button is clicked', () => {
                const childrenContent = <p>Test Content</p>;
                const wrapper = mountWithProviders(
                    <Disclosure buttonProps={buttonProps}>{childrenContent}</Disclosure>,
                );
                const button = wrapper.find(ButtonComponent);

                button.simulate('click');

                expect(wrapper.find(Container).contains(childrenContent)).toBe(true);
            });
        });
    });
});
