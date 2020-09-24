import React, { ReactElement, ReactNode } from 'react';

interface TabPanelProps {
    id: string;
    children: ReactNode;
    associatedTabId: string;
    isSelected: boolean;
}
export function TabPanel({ id, children, associatedTabId, isSelected }: TabPanelProps): ReactElement {
    return (
        <div
            id={id}
            role="tabpanel"
            aria-labelledby={associatedTabId}
            tabIndex={0}
            aria-hidden={!isSelected}
            hidden={!isSelected}
        >
            {children}
        </div>
    );
}
