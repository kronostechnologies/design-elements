import { FunctionComponent, PropsWithChildren, ReactNode, useState } from 'react';
import styled from 'styled-components';
import { IconButton } from '../buttons';
import { useDeviceContext } from '../device-context-provider';
import { SideDrawer } from '../side-drawer';

const BurgerButton = styled(IconButton)`
    margin: 0;
    padding: 0;
`;

const Container = styled.div`
    align-items: center;
    color: ${(props) => props.theme.component['global-header-content-text-color']};
    display: flex;
    justify-content: flex-end;
    width: 100%;

    > * + * {
        margin-left: var(--spacing-1x);
    }
`;

interface Props {
    mobileDrawerContent: ReactNode;
}

export const GlobalHeaderContent: FunctionComponent<PropsWithChildren<Props>> = ({ children, mobileDrawerContent }) => {
    const { isMobile } = useDeviceContext();
    const [drawerOpen, setDrawerOpen] = useState(false);

    if (isMobile && mobileDrawerContent) {
        return (
            <>
                <BurgerButton
                    aria-expanded={drawerOpen}
                    aria-controls="menu-drawer"
                    aria-label="Navigation"
                    type="button"
                    buttonType="tertiary"
                    inverted
                    iconName="menu"
                    onClick={() => setDrawerOpen(!drawerOpen)}
                />
                <SideDrawer id="menu-drawer" open={drawerOpen}>
                    {mobileDrawerContent}
                </SideDrawer>
            </>
        );
    }

    return (
        <Container>
            {children}
        </Container>
    );
};

GlobalHeaderContent.displayName = 'GlobalHeaderContent';
