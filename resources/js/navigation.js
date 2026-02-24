import {
    IconHome2, IconTicket, IconUsers, IconSettings,
    IconChartBar, IconMail, IconShield
} from '@tabler/icons-react';

export const getNavigationByRole = (role) => {
    const baseNav = [
        { icon: IconHome2, label: 'Dashboard', id: 'dashboard' },
        { icon: IconTicket, label: 'Tickets', id: 'tickets' },
    ];

    switch (role?.toLowerCase()) {
        case 'admin':
            return [
                ...baseNav,
                { icon: IconUsers, label: 'Users & Teams', id: 'users' },
                { icon: IconChartBar, label: 'Reports', id: 'reports' },
                { icon: IconSettings, label: 'Settings', id: 'settings' },
            ];
        case 'team manager':
            return [
                ...baseNav,
                { icon: IconUsers, label: 'My Team', id: 'team' },
                { icon: IconChartBar, label: 'Team Reports', id: 'reports' },
            ];
        case 'personel':
            return [
                ...baseNav,
                { icon: IconMail, label: 'My Assigned', id: 'assigned' },
            ];
        case 'free':
        default:
            return baseNav;
    }
};
