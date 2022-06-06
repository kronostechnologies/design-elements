import { shallow } from 'enzyme';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';
import { Badge, BadgeCircle, BadgeDot } from './badge';

describe('Badge', () => {
    it('is visible when the value is not zero', () => {
        const wrapper = shallow(
            <Badge value={1} />,
        );

        expect(wrapper.find(BadgeCircle).exists()).toBe(true);
    });

    it('is not visible when the value is zero', () => {
        const wrapper = shallow(
            <Badge value={0} />,
        );

        expect(wrapper.find(BadgeCircle).exists()).toBe(false);
        expect(wrapper.find(BadgeDot).exists()).toBe(false);
    });

    it('is visible when the value is zero and showZero is true', () => {
        const wrapper = shallow(
            <Badge value={0} showZero />,
        );

        expect(wrapper.find(BadgeCircle).exists()).toBe(true);
    });

    it('contains the value if below maxValue', () => {
        const wrapper = shallow(
            <Badge value={2} maxValue={9} />,
        );

        expect(wrapper.find(BadgeCircle).text()).toBe('2');
    });

    it('contains the max value and a plus sign if the value is above maxValue', () => {
        const wrapper = shallow(
            <Badge value={12} maxValue={9} />,
        );

        expect(wrapper.find(BadgeCircle).text()).toBe('9+');
    });

    it('shows as a dot if showValue is false', () => {
        const wrapper = shallow(
            <Badge value={1} showValue={false} />,
        );

        expect(wrapper.find(BadgeCircle).exists()).toBe(false);
        expect(wrapper.find(BadgeDot).exists()).toBe(true);
    });

    it('is animated if animate is true', () => {
        const wrapper = mountWithTheme(
            <Badge value={1} animate />,
        );

        const badgeNode = wrapper.find(BadgeCircle).getDOMNode();
        const animationValue = getComputedStyle(badgeNode).getPropertyValue('animation');

        expect(animationValue).not.toBe('');
    });

    it('is positioned according to the offset props', () => {
        const offsetX = 10;
        const offsetY = 10;

        const wrapper = mountWithTheme(
            <Badge value={1} position="top-right" offsetX={offsetX} offsetY={offsetY} />,
        );

        const badgeNode = wrapper.find(BadgeCircle).getDOMNode();
        const badgeStyle = getComputedStyle(badgeNode);

        expect(badgeStyle.getPropertyValue('top')).toEqual(`${offsetY}px`);
        expect(badgeStyle.getPropertyValue('right')).toEqual(`-${offsetX}px`);
        expect(badgeStyle.getPropertyValue('bottom')).toEqual('');
        expect(badgeStyle.getPropertyValue('left')).toEqual('');
    });

    test('matches the snapshot', () => {
        const tree = renderWithTheme(
            <>
                <Badge value={1} />
                <Badge value={1} showValue={false} />
            </>,
        );

        expect(tree).toMatchSnapshot();
    });
});
