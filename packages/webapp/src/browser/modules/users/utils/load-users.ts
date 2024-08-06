import usersData from '../data/users.json';
import { User } from '../types';

export function loadUsers(): User[] {
    return usersData.map((userData) => ({
        id: `id_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 5)}`,
        firstName: userData['first name'],
        lastName: userData['last name'],
        name: `${userData['first name']} ${userData['last name']}`,
        title: userData.title,
        email: userData.email,
        birthDate: userData['birth date'],
        time: userData.time,
        gender: userData.gender,
        numberDependents: userData['number dependents'],
        phone: userData.phone,
        contactMethod: userData['contact method'],
        user: userData.user,
        activityName: userData['activity name'],
        activityType: userData['activity type'],
        category: userData.category,
        activitySettings: userData['activity settings'],
        description: userData.description,
        color: userData.color,
        investment: userData.investment,
        contribution: userData.contribution,
        currency: userData.currency,
        frequency: userData.frequency,
        rate: userData.rate,
    }));
}
