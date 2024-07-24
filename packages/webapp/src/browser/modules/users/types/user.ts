export interface User {
    id: string;
    firstName: string;
    lastName: string;
    name: string;
    title?: string;
    email?: string;
    birthDate?: string;
    time?: string;
    gender?: string;
    numberDependents?: number;
    phone?: string;
    contactMethod?: string;
    user?: string;
    activityName?: string;
    activityType?: string;
    category?: string;
    activitySettings?: string;
    description?: string;
    color?: string;
    investment?: string;
    contribution?: string;
    currency?: string;
    frequency?: string;
    rate?: number | string;
}

export type UserKeys = keyof User;
