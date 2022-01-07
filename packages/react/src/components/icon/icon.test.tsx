import { render } from 'enzyme';
import { Icon } from './icon';

describe('Icon', () => {
    test('Matches the snapshot', () => {
        const tree = render(<Icon name="home" />);

        expect(tree).toMatchSnapshot();
    });
});
