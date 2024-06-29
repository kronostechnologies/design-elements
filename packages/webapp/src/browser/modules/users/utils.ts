import { TableData } from '@equisoft/design-elements-react';
import { TableDataType } from './types';

export function generateUsersData(dataNumber: number = 35): TableData<TableDataType>[] {
    const firstNames = ['John', 'Jane', 'Mary', 'James', 'Emma', 'Noah', 'Oliver', 'Sophia', 'Liam', 'Mia'];
    const lastNames = [
        'Doe',
        'Smith',
        'Johnson',
        'Brown',
        'Taylor',
        'Miller',
        'Davis',
        'Garcia',
        'Rodriguez',
        'Wilson',
        'Martinez',
    ];
    const emailDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'equisoft.com'];

    return Array.from(Array(dataNumber).keys()).map(() => {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const emailDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
        const phoneNumber = `(${Math.floor((Math.random() * 900) + 100)}) ${Math.floor((Math.random() * 900) + 100)}-${Math.floor((Math.random() * 9000) + 1000)}`;

        return {
            id: `id_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`, // Generate a unique ID
            name: `${firstName} ${lastName}`,
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}`,
            phone: phoneNumber,
        };
    });
}
