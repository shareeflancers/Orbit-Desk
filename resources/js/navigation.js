import {
    IconHome2, IconUsers
} from '@tabler/icons-react';

export const getNavigationByRole = (role) => {
    const baseNav = [
        { icon: IconHome2, label: 'Dashboard', id: 'dashboard', path: '/dashboard' },
    ];

    switch (role?.toLowerCase()) {
        case 'admin':
            return [
                ...baseNav,
                { icon: IconUsers, label: 'Users Management', id: 'users', path: '/admin/users' },
            ];
        case 'team manager':
            return [
                ...baseNav,
            ];
        case 'personel':
            return [
                ...baseNav,
            ];
        case 'free':
        default:
            return baseNav;
    }
};
