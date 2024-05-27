import { FunctionComponent, PropsWithChildren, useState, useCallback } from 'react';
import styled from 'styled-components';
import { useId } from '../../hooks/use-id';
import { Button, ButtonProps } from '../buttons/button';

type ButtonPropsWithoutOnClick = Omit<ButtonProps, 'onClick'>;

interface DisclosureWidgetProps {
    idContent?: string;
    buttonProps: ButtonPropsWithoutOnClick;
}

const Container = styled.div`
    margin: 0;
    padding: 0;
`;

export const Disclosure: FunctionComponent<PropsWithChildren<DisclosureWidgetProps>> = ({
    idContent: providedIdContent,
    buttonProps,
    children,
}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const idContent = useId(providedIdContent);
    const handleOnButtonClick = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded, setExpanded]);

    return (
        <>
            <Button
                {...buttonProps /* eslint-disable-line react/jsx-props-no-spreading */}
                onClick={handleOnButtonClick}
                aria-expanded={expanded}
                aria-controls={idContent}
            />
            <Container id={idContent}>
                {expanded && children}
            </Container>
        </>
    );
};
