import { Status, StatusType } from '~/components/status/status';
import { mountWithTheme } from '../../test-utils/renderer';

const statusTypesArray: StatusType[] = ['enabled', 'disabled', 'blocked'];

describe('Status', () => {
    statusTypesArray.forEach((type) => (
        it(`matches snapshot (${type})`, () => {
            const tree = mountWithTheme(<Status type={type} label={type} />);

            expect(tree).toMatchSnapshot();
        })
    ));
});
