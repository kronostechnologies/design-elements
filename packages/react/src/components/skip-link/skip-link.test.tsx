import { shallow } from 'enzyme';
import { renderWithProviders } from '../../test-utils/renderer';
import { SkipLink } from './skip-link';

describe('SkipLink', () => {
    test('should call onClick callback when clicked', () => {
        const callback = jest.fn();
        const wrapper = shallow(<SkipLink href="test" onClick={callback} />);

        wrapper.simulate('click');

        expect(callback).toHaveBeenCalled();
    });

    test('Matches Snapshot (Desktop)', () => {
        const tree = renderWithProviders(<SkipLink href="test" />, 'desktop');

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (Mobile)', () => {
        const tree = renderWithProviders(<SkipLink href="test" />, 'mobile');

        expect(tree).toMatchSnapshot();
    });
});
