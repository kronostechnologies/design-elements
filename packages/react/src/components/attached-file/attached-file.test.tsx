import { renderWithProviders } from '../../test-utils/renderer';
import { AttachedFile } from './attached-file';

describe('AttachedFile', () => {
    test('Matches Default Snapshot', () => {
        const tree = renderWithProviders(<AttachedFile
            filename='File.txt'
            status='default'
            filesize={100000}
        />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches Uploading Snapshot', () => {
        const tree = renderWithProviders(<AttachedFile
            filename='File.txt'
            status='uploading'
            filesize={100000}
        />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches Success Snapshot', () => {
        const tree = renderWithProviders(<AttachedFile
            filename='File.txt'
            status='success'
            filesize={100000}
        />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches Cancelled Snapshot', () => {
        const tree = renderWithProviders(<AttachedFile
            filename='File.txt'
            status='cancelled'
            filesize={100000}
        />);

        expect(tree).toMatchSnapshot();
    });

    test('Matches Error Snapshot', () => {
        const tree = renderWithProviders(<AttachedFile
            filename='File.txt'
            status='error'
            filesize={100000}
        />);

        expect(tree).toMatchSnapshot();
    });
});
