import { render } from 'enzyme';
import { Icon } from '~/components/icon/icon';

describe('Icon', () => {
    it('Matches the snapshot', () => {
        const tree = render(<Icon name="home" />);

        expect(tree).toMatchSnapshot();
    });
});
