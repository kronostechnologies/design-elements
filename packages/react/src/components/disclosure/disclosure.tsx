import { FunctionComponent, PropsWithChildren, useState, useCallback } from 'react';
import { useId } from '../../hooks/use-id';

interface DisclosureWidgetProps {
    idContent?: string;
}

export const Disclosure: FunctionComponent<PropsWithChildren<DisclosureWidgetProps>> = ({
    idContent: providedIdContent,
    children
}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const idContent = useId(providedIdContent);
    const handleOnButtonClick = useCallback(() => {
        setExpanded(!expanded);
    }, [expanded, setExpanded]);

    return (
        <>
            <button type='button' onClick={handleOnButtonClick} aria-expanded={expanded} aria-controls={idContent} />
            <div id={idContent}>
                {children}
            </div>
        </>
    );
}
