import { renderWithProviders } from '../../test-utils/renderer';
import { SideDrawer } from './side-drawer';

describe('Side Drawer', () => {
    test('Is open', () => {
        const tree = renderWithProviders(
            <SideDrawer open>
                <p>Test</p>
            </SideDrawer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Is closed on right side', () => {
        const tree = renderWithProviders(
            <SideDrawer open={false}>
                <p>Test</p>
            </SideDrawer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Is closed on left side', () => {
        const tree = renderWithProviders(
            <SideDrawer open={false} drawerOrigin="left">
                <p>Test</p>
            </SideDrawer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has nested drawer', () => {
        const tree = renderWithProviders(
            <SideDrawer open drawerOrigin="left">
                <SideDrawer open nested>
                    <p>Test</p>
                </SideDrawer>
            </SideDrawer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has width set to 50%', () => {
        const tree = renderWithProviders(
            <SideDrawer open width="50%">
                <p>Test</p>
            </SideDrawer>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has different height when in mobile', () => {
        const tree = renderWithProviders(
            <SideDrawer open width="50%">
                <p>Test</p>
            </SideDrawer>,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
