import { Status, StatusTypes } from './status';
import { mountWithTheme } from '../../test-utils/renderer';

const statusTypesArray: StatusTypes[] = ['enabled', 'disabled', 'blocked'];

describe('Status', () => {
    statusTypesArray.forEach((type) => (
        it(`matches snapshot (${type})`, () => {
            const tree = mountWithTheme(<Status type={type} label={type} />);

            expect(tree).toMatchSnapshot();
        })
    ));
});
