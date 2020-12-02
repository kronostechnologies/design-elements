import { useDeviceContext } from '@design-elements/components/device-context-provider/device-context-provider';
import { Icon } from '@design-elements/components/icon/icon';
import { SideDrawer } from '@design-elements/components/side-drawer/side-drawer';
import { focus } from '@design-elements/utils/css-state';
import React, { FunctionComponent, ReactNode, useState } from 'react';
import styled, { useTheme } from 'styled-components';

const BurgerButton = styled.button`
    appearance: none;
    background-color: transparent;
    border: 1px solid transparent;
    cursor: pointer;
    margin: 0;
    ${focus}
    padding: 0;
`;

const Container = styled.div`
    color: ${(props) => props.theme.greys.white};
`;

interface Props {
    mobileDrawerContent: ReactNode;
}

export const Content: FunctionComponent<Props> = ({ children, mobileDrawerContent }) => {
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
                    <Icon name="menu" color={theme.greys.white} />
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
