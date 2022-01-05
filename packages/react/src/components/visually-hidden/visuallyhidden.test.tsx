import { render } from 'enzyme';
import { VisuallyHidden } from './visuallyhidden';

describe('Visually hidden', () => {
    test('Matches the snapshot', () => {
        const tree = render(
            <VisuallyHidden>
                Hidden
            </VisuallyHidden>,
        );

        expect(tree).toMatchSnapshot();
    });
});
