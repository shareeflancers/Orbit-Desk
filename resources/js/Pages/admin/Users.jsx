import { useState, useEffect } from 'react';
import { Head, useForm, router } from '@inertiajs/react';
import DashboardLayout from '../../Components/layouts/DashboardLayout';
import ThemedDataTable from '../../Components/themed/ThemedDataTable';
import ThemedModal from '../../Components/themed/ThemedModal';
import { Group, Stack, Switch, Text, Badge } from '@mantine/core';
import ThemedInput from '../../Components/themed/ThemedInput';
import ThemedSelect from '../../Components/themed/ThemedSelect';
import ThemedButton from '../../Components/themed/ThemedButton';

export default function Users({ users, filters }) {
    const [search, setSearch] = useState(filters.search || '');
    const [perPage, setPerPage] = useState(String(filters.per_page || 10));
    const [withDeleted, setWithDeleted] = useState(filters.with_deleted === 'true' || filters.with_deleted === true);

    // Modals state
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isRoleOpen, setIsRoleOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    // Forms
    const { data: createData, setData: setCreateData, post: createPost, processing: createProcessing, errors: createErrors, reset: createReset } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'user',
        is_active: true,
    });

    const { data: editData, setData: setEditData, put: editPut, processing: editProcessing, errors: editErrors, reset: editReset } = useForm({
        name: '',
        email: '',
        password: '', // optional on edit
        role: 'user',
        is_active: true,
    });

    const { data: roleData, setData: setRoleData, patch: rolePatch, processing: roleProcessing } = useForm({
        role: 'user',
    });

    // Search and Pagination handlers
    useEffect(() => {
        const timer = setTimeout(() => {
            if (search !== (filters.search || '')) {
                fetchUsers(search, 1, perPage, withDeleted);
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [search]);

    const fetchUsers = (searchParam, pageParam, perPageParam, withDeletedParam) => {
        router.get('/admin/users', {
            search: searchParam,
            page: pageParam,
            per_page: perPageParam,
            with_deleted: withDeletedParam,
        }, { preserveState: true, preserveScroll: true });
    };

    const handlePageChange = (page) => {
        fetchUsers(search, page, perPage, withDeleted);
    };

    const handlePerPageChange = (val) => {
        setPerPage(val);
        fetchUsers(search, 1, val, withDeleted);
    };

    const handleWithDeletedChange = (e) => {
        const val = e.currentTarget.checked;
        setWithDeleted(val);
        fetchUsers(search, 1, perPage, val);
    };

    // Actions
    const handleAdd = () => {
        createReset();
        setIsCreateOpen(true);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditData({
            name: user.name,
            email: user.email,
            password: '',
            role: user.role,
            is_active: !!user.is_active,
        });
        setIsEditOpen(true);
    };

    const handleRoleUpdate = (user) => {
        setSelectedUser(user);
        setRoleData({ role: user.role });
        setIsRoleOpen(true);
    };

    const handleDelete = (user) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(`/admin/users/${user.id}`, { preserveScroll: true });
        }
    };

    const handleToggleActive = (user) => {
        if (confirm(`Are you sure you want to ${user.is_active ? 'deactivate' : 'activate'} ${user.name}?`)) {
            router.patch(`/admin/users/${user.id}/toggle-active`, {}, { preserveScroll: true });
        }
    };

    // Submits
    const submitCreate = (e) => {
        e.preventDefault();
        createPost('/admin/users', {
            onSuccess: () => {
                setIsCreateOpen(false);
                createReset();
            },
        });
    };

    const submitEdit = (e) => {
        e.preventDefault();
        editPut(`/admin/users/${selectedUser.id}`, {
            onSuccess: () => {
                setIsEditOpen(false);
                editReset();
            },
        });
    };

    const submitRole = (e) => {
        e.preventDefault();
        rolePatch(`/admin/users/${selectedUser.id}/role`, {
            onSuccess: () => {
                setIsRoleOpen(false);
            },
        });
    };

    const columns = [
        { key: 'id', label: 'ID', width: 60 },
        {
            key: 'name',
            label: 'Name',
            render: (val, row) => (
                <Group gap="sm">
                    {row.profile_pic ? (
                        <img src={`/storage/${row.profile_pic}`} alt="" className="w-8 h-8 rounded-full object-cover" />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                            {val.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <Text size="sm" fw={500}>{val}</Text>
                </Group>
            )
        },
        { key: 'email', label: 'Email' },
        {
            key: 'role',
            label: 'Role',
            render: (val, row) => (
                <span
                    onClick={() => handleRoleUpdate(row)}
                    className={`cursor-pointer px-2 py-1 rounded text-xs font-semibold ${val === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}
                >
                    {val.toUpperCase()}
                </span>
            )
        },
        {
            key: 'is_active',
            label: 'Status',
            render: (val, row) => (
                <Switch
                    checked={!!val}
                    onChange={() => handleToggleActive(row)}
                    color="green"
                    size="sm"
                    label={val ? 'Active' : 'Inactive'}
                    disabled={row.is_deleted}
                />
            )
        },
        {
            key: 'deleted_at',
            label: 'Deleted At',
            render: (val) => (
                val ? <Badge color="red" variant="light">{new Date(val).toLocaleDateString()}</Badge> : <Badge color="gray" variant="transparent">-</Badge>
            )
        },
        {
            key: 'created_at',
            label: 'Joined',
            render: (val) => new Date(val).toLocaleDateString()
        }
    ];

    return (
        <>
            <Head title="User Management — Orbit Desk" />
            <DashboardLayout
                activeNavId="users"
                title="User Management"
                description="View, manage, and configure system access for all staff and administrative users."
            >

                <Group justify="flex-end" mb="md">
                    <Switch
                        label="Show Deleted Users"
                        checked={withDeleted}
                        onChange={handleWithDeletedChange}
                        color="red"
                    />
                </Group>

                <ThemedDataTable
                    title="User Management"
                    columns={columns}
                    data={users.data}
                    showAddButton={true}
                    addButtonLabel="Add User"
                    onAdd={handleAdd}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    showSearch={true}
                    searchValue={search}
                    onSearch={setSearch}
                    showPagination={true}
                    pagination={users}
                    onPageChange={handlePageChange}
                    perPageOptions={['10', '25', '50']}
                    onPerPageChange={handlePerPageChange}
                />

                {/* Create Modal */}
                <ThemedModal opened={isCreateOpen} onClose={() => setIsCreateOpen(false)} title="Add New User">
                    <form onSubmit={submitCreate}>
                        <Stack pt="md">
                            <ThemedInput
                                label="Name"
                                value={createData.name}
                                onChange={e => setCreateData('name', e.target.value)}
                                error={createErrors.name}
                                required
                            />
                            <ThemedInput
                                label="Email"
                                type="email"
                                value={createData.email}
                                onChange={e => setCreateData('email', e.target.value)}
                                error={createErrors.email}
                                required
                            />
                            <ThemedInput
                                label="Password"
                                type="password"
                                value={createData.password}
                                onChange={e => setCreateData('password', e.target.value)}
                                error={createErrors.password}
                                required
                            />
                            <Group grow>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 ml-1 mb-1 block">Role</label>
                                    <ThemedSelect
                                        data={[{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }]}
                                        value={createData.role}
                                        onChange={val => setCreateData('role', val)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 ml-1 mb-1 block">Status</label>
                                    <Switch
                                        pt={8}
                                        checked={createData.is_active}
                                        onChange={(event) => setCreateData('is_active', event.currentTarget.checked)}
                                        label={createData.is_active ? 'Active' : 'Inactive'}
                                        color="green"
                                    />
                                </div>
                            </Group>
                            <Group justify="flex-end" mt="md">
                                <ThemedButton type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</ThemedButton>
                                <ThemedButton type="submit" isLoading={createProcessing}>Create User</ThemedButton>
                            </Group>
                        </Stack>
                    </form>
                </ThemedModal>

                {/* Edit Modal */}
                <ThemedModal opened={isEditOpen} onClose={() => setIsEditOpen(false)} title="Edit User">
                    <form onSubmit={submitEdit}>
                        <Stack pt="md">
                            <ThemedInput
                                label="Name"
                                value={editData.name}
                                onChange={e => setEditData('name', e.target.value)}
                                error={editErrors.name}
                                required
                            />
                            <ThemedInput
                                label="Email"
                                type="email"
                                value={editData.email}
                                onChange={e => setEditData('email', e.target.value)}
                                error={editErrors.email}
                                required
                            />
                            <ThemedInput
                                label="Password (leave blank to keep current)"
                                type="password"
                                value={editData.password}
                                onChange={e => setEditData('password', e.target.value)}
                                error={editErrors.password}
                            />
                            <Group grow>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 ml-1 mb-1 block">Role</label>
                                    <ThemedSelect
                                        data={[{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }]}
                                        value={editData.role}
                                        onChange={val => setEditData('role', val)}
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-semibold text-gray-700 ml-1 mb-1 block">Status</label>
                                    <Switch
                                        pt={8}
                                        checked={editData.is_active}
                                        onChange={(event) => setEditData('is_active', event.currentTarget.checked)}
                                        label={editData.is_active ? 'Active' : 'Inactive'}
                                        color="green"
                                    />
                                </div>
                            </Group>
                            <Group justify="flex-end" mt="md">
                                <ThemedButton type="button" variant="outline" onClick={() => setIsEditOpen(false)}>Cancel</ThemedButton>
                                <ThemedButton type="submit" isLoading={editProcessing}>Save Changes</ThemedButton>
                            </Group>
                        </Stack>
                    </form>
                </ThemedModal>

                {/* Role Modal */}
                <ThemedModal opened={isRoleOpen} onClose={() => setIsRoleOpen(false)} title="Change User Role" size="sm">
                    <form onSubmit={submitRole}>
                        <Stack pt="md">
                            <Text size="sm" c="dimmed">Select a new role for {selectedUser?.name}</Text>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 ml-1 mb-1 block">Role</label>
                                <ThemedSelect
                                    data={[{ value: 'admin', label: 'Admin' }, { value: 'user', label: 'User' }]}
                                    value={roleData.role}
                                    onChange={val => setRoleData('role', val)}
                                />
                            </div>
                            <Group justify="flex-end" mt="md">
                                <ThemedButton type="button" variant="outline" size="sm" onClick={() => setIsRoleOpen(false)}>Cancel</ThemedButton>
                                <ThemedButton type="submit" size="sm" isLoading={roleProcessing}>Update Role</ThemedButton>
                            </Group>
                        </Stack>
                    </form>
                </ThemedModal>

            </DashboardLayout>
        </>
    );
}
