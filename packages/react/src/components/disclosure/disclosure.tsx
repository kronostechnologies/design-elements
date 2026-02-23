import { FunctionComponent, PropsWithChildren } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { focus } from '../../utils/css-state';
import type { MutuallyExclusive } from '../../utils/types';
import { type ButtonProps } from '../buttons';
import type { IconButtonProps } from '../buttons/icon-button';
import { DropdownMenuButton, type DropdownMenuButtonProps } from '../dropdown-menu-button';
import { Icon, type IconName } from '../icon';

type ButtonDisclosureButtonProps = Partial<Pick<ButtonProps, 'buttonType'>>
    & Omit<ButtonProps, 'buttonType' | 'className' | 'onClick'>;

type IconDisclosureButtonProps = Partial<Pick<IconButtonProps, 'buttonType'>>
    & Omit<IconButtonProps, 'buttonType' | 'className' | 'onClick'>;

export type DisclosureButtonProps = MutuallyExclusive<ButtonDisclosureButtonProps, IconDisclosureButtonProps>

export interface DisclosureProps {
    align?: DropdownMenuButtonProps['align'];
    buttonProps: DisclosureButtonProps;
    className?: string;
    idContent?: string;
}

const Container = styled.div`
    border-radius: var(--border-radius);
    overflow-y: auto;
    padding: var(--spacing-half) var(--spacing-2x);

    ${focus};
`;

export const Disclosure: FunctionComponent<PropsWithChildren<DisclosureProps>> = ({
    align,
    idContent: providedIdContent,
    buttonProps,
    className,
    children,
}) => {
    const idContent = useId(providedIdContent);

    const {
        buttonType = 'tertiary',
        inverted = false,
        ...otherButtonProps
    } = buttonProps;

    const icon = 'iconName' in buttonProps && buttonProps.iconName
        ? <Icon name={buttonProps.iconName as unknown as IconName} />
        : undefined;

    return (
        <DropdownMenuButton
            align={align}
            buttonType={buttonType}
            className={className}
            dropdownMenuId={idContent}
            dropdownMenuWidth="auto"
            hasCaret={false}
            icon={icon}
            inverted={inverted}
            render={() => (
                <Container data-testid="disclosure-content">
                    {children}
                </Container>
            )}
            {...otherButtonProps /* eslint-disable-line react/jsx-props-no-spreading */}
        />
    );
};

Disclosure.displayName = 'Disclosure';
