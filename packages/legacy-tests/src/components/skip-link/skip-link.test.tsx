import { shallow } from 'enzyme';
import { SkipLink } from '~/components/skip-link/skip-link';

describe('SkipLink', () => {
    it('should call onClick callback when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<SkipLink href="test" onClick={callback} />);

        wrapper.simulate('click');

        expect(callback).toHaveBeenCalled();
    });
});
