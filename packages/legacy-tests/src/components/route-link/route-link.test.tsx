import { shallow } from 'enzyme';
import { NavLink } from 'react-router-dom';
import { RouteLink } from '~/components/route-link/route-link';

describe('Route Link', () => {
    it('calls onClick callback when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(
            <RouteLink
                routerLink={NavLink}
                href="/test"
                label="Navigation Link"
                onClick={callback}
            />,
        );

        wrapper.simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });
});
