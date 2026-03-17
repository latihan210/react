import { Head, Link, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { index as usersIndex } from '@/routes/users';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Members',
        href: usersIndex().url,
    },
];

interface UsersIndexProps {
    users: {
        data: any[];
        current_page: number;
        per_page: number;
        last_page: number;
        total: number;
        links: {
            url: string | null;
            label: string;
            active: boolean;
        }[];
    };
    filter: {
        name?: string;
        username?: string;
        email?: string;
        roles?: string;
        created_at?: string;
        updated_at?: string;
        sort?: string;
        direction?: string;
    };
}

// Definisi kolom secara dinamis
const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'username', label: 'Username', sortable: true },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'roles', label: 'Roles', sortable: true },
    { key: 'created_at', label: 'Created At', sortable: true },
    { key: 'updated_at', label: 'Updated At', sortable: true },
    { key: 'actions', label: 'Actions', sortable: false },
];

export default function UsersIndex({ users, filter }: UsersIndexProps) {
    const [filters, setFilters] = useState({
        name: filter?.name || '',
        username: filter?.username || '',
        email: filter?.email || '',
        roles: filter?.roles || '',
        created_at: filter?.created_at || '',
        updated_at: filter?.updated_at || '',
    });

    const currentSort = filter?.sort || 'name';
    const currentDirection = filter?.direction || 'asc';

    const handleSort = (column: string) => {
        const direction = currentSort === column && currentDirection === 'asc' ? 'desc' : 'asc';
        router.get(usersIndex().url, { ...filters, sort: column, direction }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleColumnSearch = (column: string, value: string) => {
        const newFilters = { ...filters, [column]: value };
        setFilters(newFilters);
        router.get(usersIndex().url, { ...newFilters, sort: currentSort, direction: currentDirection }, {
            preserveState: true,
            replace: true,
        });
    };

    const renderSortIcon = (column: string): React.ReactNode => {
        if (currentSort !== column) return <span className="ml-1 opacity-30">↕</span>;
        return currentDirection === 'asc'
            ? <span className="ml-1 text-primary">↑</span>
            : <span className="ml-1 text-primary">↓</span>;
    };

    const { auth } = usePage().props as any;
    const isAdmin = auth.user.roles.includes('admin');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="overflow-x-auto p-4 text-center">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className='border-b border-sidebar-border/70 dark:border-sidebar-border'>
                                    <th className="p-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider w-12">
                                        #
                                    </th>
                                    {columns.map((col) => (
                                        <th
                                            key={col.key}
                                            className="p-3 text-sm font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                                            onClick={() => col.sortable && handleSort(col.key)}
                                        >
                                            {col.label} {col.sortable && renderSortIcon(col.key)}
                                        </th>
                                    ))}
                                </tr>
                                <tr className="border-b border-sidebar-border/50 bg-muted/5">
                                    <th className="p-2"></th>
                                    {columns.map((col) => {
                                        // Skip filter for actions and roles columns
                                        if (col.key === 'actions') {
                                            return <th key={col.key} className="p-2"></th>;
                                        }
                                        return (
                                            <th key={col.key} className="p-2">
                                                <input
                                                    type="text"
                                                    placeholder={`Filter ${col.label}...`}
                                                    className="w-full rounded border border-sidebar-border bg-background px-2 py-1 text-xs font-normal focus:ring-1 focus:ring-primary outline-none"
                                                    value={filters[col.key as keyof typeof filters]}
                                                    onChange={(e) => handleColumnSearch(col.key, e.target.value)}
                                                />
                                            </th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-border-sidebar-border/70 dark:divide-sidebar-border'>
                                {users.data.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="py-2">{(users.current_page - 1) * users.per_page + index + 1}</td>
                                        {columns.map((col) => (
                                            <td key={col.key} className="py-2 px-3 text-sm">
                                                {col.key === 'roles' ? (
                                                    <div>
                                                        {user.roles ? user.roles.split(', ').map(role => (
                                                            <span key={role} className="items-center px-2 py-0.5 rounded text-xs font-medium bg-primary/10 text-primary capitalize">
                                                                {role}
                                                            </span>
                                                        )) : <span className="text-muted-foreground">-</span>}
                                                    </div>
                                                ) : col.key === 'actions' ? (
                                                    <div className="flex items-center justify-center gap-2">
                                                        <Button variant="default" size="sm" asChild>
                                                            <Link href="#">
                                                                Show
                                                            </Link>
                                                        </Button>
                                                        <Button variant="secondary" size="sm" asChild>
                                                            <Link href={`/users/${user.id}/edit`}>
                                                                Edit
                                                            </Link>
                                                        </Button>
                                                        {isAdmin && (

                                                            <Button
                                                                variant="destructive"
                                                                size="sm"
                                                                onClick={() => {
                                                                    if (confirm('Are you sure you want to delete this user?')) {
                                                                        router.delete(`/users/${user.id}`);
                                                                    }
                                                                }}
                                                            >
                                                                Delete
                                                            </Button>
                                                        )}
                                                    </div>
                                                ) : (
                                                    user[col.key as keyof typeof user]
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 p-4 border-t border-sidebar-border/70">
                        {users.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || ''}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-3 py-1 text-xs rounded-md border transition-colors ${link.active
                                    ? 'bg-primary text-primary-foreground border-primary'
                                    : 'hover:bg-muted border-sidebar-border text-muted-foreground'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                preserveScroll
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}