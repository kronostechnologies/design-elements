import { FunctionComponent, PropsWithChildren, ReactNode, useState } from 'react';
import styled, { useTheme } from 'styled-components';
import { focus } from '../../utils/css-state';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { SideDrawer } from '../side-drawer/side-drawer';

const BurgerButton = styled.button`
    appearance: none;
    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    margin: 0;
    padding: 0;

    ${focus};
`;

const Container = styled.div`
    align-items: center;
    color: ${(props) => props.theme.colors.white};
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

export const Content: FunctionComponent<PropsWithChildren<Props>> = ({ children, mobileDrawerContent }) => {
    const { isMobile } = useDeviceContext();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const theme = useTheme();

    if (isMobile && mobileDrawerContent) {
        return (
            <>
                <BurgerButton
                    aria-expanded={drawerOpen}
                    aria-controls="menu-drawer"
                    aria-label="Navigation"
                    type="button"
                    onClick={() => setDrawerOpen(!drawerOpen)}
                >
                    <Icon name="menu" color={theme.colors.white} />
                </BurgerButton>
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
