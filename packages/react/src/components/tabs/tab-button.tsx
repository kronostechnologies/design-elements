import React, { ReactElement } from 'react';

interface ButtonSelection {
    id: string;
}

interface TabButtonProps {
    id: string;
    textValue: string;
    controlledPanelId: string;
    isSelected: boolean;
    selectionCallback(buttonSelection: ButtonSelection): void;
}

export function TabButton(
    { id, textValue, controlledPanelId, isSelected , selectionCallback }: TabButtonProps,
): ReactElement {
    return (
        <button
            id={id}
            role="tab"
            aria-selected={isSelected}
            aria-controls={controlledPanelId}
            tabIndex={isSelected ? undefined : -1}
            onClick={() => selectionCallback({ id: id })}
        >
            {textValue}
        </button>
    );
}
