import {ComponentType, ReactElement, useRef, useState} from 'react';
import styled from 'styled-components';
import { menuDimensions } from '../../legacy-constants/menuDimensions';
import { Button } from '../buttons/button';
import { DropdownMenuProps } from '../dropdown-menu/dropdown-menu';
import { NavListProps } from '../nav-list/nav-list';

const DropdownButton = styled(Button)``;

interface DropdownProps {
    dropdownComponent: ComponentType<DropdownMenuProps> | ComponentType<NavListProps>;
    children: ReactElement<DropdownMenuProps> | ReactElement<NavListProps>;
}

export const Dropdown = ({
    dropdownComponent,
    children,
}: DropdownProps): ReactElement => {
    const [showDropdown, setShowDropdown] = useState(false);
    const DropdownComponent = styled(dropdownComponent)`
        max-width: ${menuDimensions.maxWidth};
        min-width: ${menuDimensions.minWidth};
        width: initial;
    `;

    const childrenRef = useRef<any>(null);

    return (
        <>
            <DropdownButton
                buttonType="primary"
                data-testid="dropdown-button"
                onClick={() => setShowDropdown(!showDropdown)}
                onKeyDown={() => {
                    childrenRef.current?.click();
                }}
                label="Open"
            />
            {/*eslint-disable-next-line react/jsx-props-no-spreading*/}
            <DropdownComponent hidden={!showDropdown} ref={childrenRef} {...children.props} />
        </>
    );
};
