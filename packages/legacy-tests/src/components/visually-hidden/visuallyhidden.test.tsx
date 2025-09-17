import { render } from 'enzyme';
import { VisuallyHidden } from '~/components/visually-hidden/visually-hidden';

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
