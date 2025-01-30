import { generateComponentClasses } from '../../utils/generate-component-classes';

const COMPONENT_NAME = 'AttachedFile';

export interface AttachedFileClasses {
    root: string;
    icon: string;
    status: string;
}

export type AttachedFileClassKeys = keyof AttachedFileClasses;

export const attachedFileClasses: AttachedFileClasses = generateComponentClasses(
    COMPONENT_NAME,
    [
        'root',
        'icon',
        'status',
    ],
);
