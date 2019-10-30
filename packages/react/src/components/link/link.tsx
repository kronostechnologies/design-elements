import React, { ReactElement } from 'react';

import { Link as DomLink, NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface LinkProps {
    type?: 'nav' | 'ext';
    href: string;
    label: string;
    disabled?: boolean;
}

const Container = styled.div`
    .external {
        color: ${(props: {disabled?: boolean}) => props.disabled ? '#7fbfd2 !important' : '#0080a5'}

        &:hover {
            color: #006c8a;
        }
    }

    .link {
        ${props => props.disabled ? 'cursor: default' : ''};
        font-size: 0.875rem;
        text-decoration: none;

        // &:visited {
        //     color: #0080a5;
        //     font-weight: 600;
        // }
    }

    .navigation {
        color: ${props => props.disabled ? '#9ca7b4 !important' : '#57666e'};

        &:hover {
            color: #000000;
        }
    }
`;

// const handleDisabled = (evt: ChangeEvent<HTMLLinkElement>) => {
//     evt.preventDefault();
// };

export function Link({ type, href, label, disabled }: LinkProps): ReactElement {
    if (type === 'ext') {
        return (
            <Container disabled={disabled}>
                {disabled ?
                    <p className="link external">
                        {label}
                    </p> :
                    <DomLink to={href} className="link external">
                        {label}
                    </DomLink>
                }
            </Container>
        );
    } else {
        return (
            <Container disabled={disabled}>
                {disabled ?
                    <p className="link navigation">
                        {label}
                    </p> :
                    <NavLink to={href} className="link navigation">
                        {label}
                    </NavLink>
                }
            </Container>
        );
    }
}
