import { render } from 'enzyme';
import { VisuallyHidden } from '~/components/visually-hidden/visuallyhidden';

describe('Visually hidden', () => {
    it('Matches the snapshot', () => {
        const tree = render(
            <VisuallyHidden>
                Hidden
            </VisuallyHidden>,
        );

        expect(tree).toMatchSnapshot();
    });
});
