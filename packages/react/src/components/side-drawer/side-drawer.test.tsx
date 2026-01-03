import { renderWithProviders } from '../../test-utils/renderer';
import { SideDrawer } from './side-drawer';

describe('Side Drawer', () => {
    it('Is open', () => {
        const { container } = renderWithProviders(
            <SideDrawer open>
                <p>Test</p>
            </SideDrawer>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Is closed on right side', () => {
        const { container } = renderWithProviders(
            <SideDrawer open={false}>
                <p>Test</p>
            </SideDrawer>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Is closed on left side', () => {
        const { container } = renderWithProviders(
            <SideDrawer open={false} drawerOrigin="left">
                <p>Test</p>
            </SideDrawer>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Has nested drawer', () => {
        const { container } = renderWithProviders(
            <SideDrawer open drawerOrigin="left">
                <SideDrawer open nested>
                    <p>Test</p>
                </SideDrawer>
            </SideDrawer>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Has width set to 50%', () => {
        const { container } = renderWithProviders(
            <SideDrawer open width="50%">
                <p>Test</p>
            </SideDrawer>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('Has different height when in mobile', () => {
        const { container } = renderWithProviders(
            <SideDrawer open width="50%">
                <p>Test</p>
            </SideDrawer>,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
