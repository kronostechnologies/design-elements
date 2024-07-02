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
    const genders = ['Male', 'Female'];
    const salutations = ['Mr', 'Mrs', 'Ms', 'Miss'];
    const startDate = new Date(1950, 1, 1);
    const endDate = new Date(2002, 1, 1);
    const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'black', 'white', 'gray', 'brown'];

    return Array.from(Array(dataNumber).keys()).map(() => {
        const id = `id_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`;
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const name = `${firstName} ${lastName}`;
        const emailDomain = emailDomains[Math.floor(Math.random() * emailDomains.length)];
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${emailDomain}`;
        const phone = `(${Math.floor((Math.random() * 900) + 100)}) ${Math.floor((Math.random() * 900) + 100)}-${Math.floor((Math.random() * 9000) + 1000)}`;
        const birthDate = new Date(startDate.getTime() + (Math.random() * (endDate.getTime() - startDate.getTime())));
        const gender = genders[Math.floor(Math.random() * genders.length)];
        const salutation = salutations[Math.floor(Math.random() * salutations.length)];
        const favoriteColor = colors[Math.floor(Math.random() * colors.length)];

        return {
            id,
            name,
            email,
            phone,
            birthDate: birthDate.toISOString().split('T')[0],
            gender,
            salutation,
            favoriteColor,
        };
    });
}
