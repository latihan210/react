import { Head, Link, router } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        total_member: number;
        filter: {
            search: string;
        };
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
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    const [filters, setFilters] = useState({
        name: stats.filter?.name || '',
        username: stats.filter?.username || '',
        email: stats.filter?.email || '',
    });

    const currentSort = stats.filter?.sort || 'name';
    const currentDirection = stats.filter?.direction || 'asc';

    const handleSort = (column: string) => {
        const direction = currentSort === column && currentDirection === 'asc' ? 'desc' : 'asc';

        router.get(dashboard().url, { ...filters, sort: column, direction }, {
            preserveState: true,
            replace: true,
        });
    };

    const handleColumnSearch = (column: string, value: string) => {
        const newFilters = { ...filters, [column]: value };
        setFilters(newFilters);
        router.get(dashboard().url, { ...newFilters, sort: currentSort, direction: currentDirection }, {
            preserveState: true,
            replace: true,
        });

        const renderSortIcon = (column: string) => {
            if (currentSort !== column) return <span className="ml-1 opacity-30">↕</span>;
            return currentDirection === 'asc' ? <span className="ml-1 text-primary">↑</span> : <span className="ml-1 text-primary">↓</span>;
        };

        router.get(dashboard().url, newFilters, {
            preserveState: true,
            replace: true,
        });
    };

    function renderSortIcon(column: string): React.ReactNode {
        if (currentSort !== column) return <span className="ml-1 opacity-30">↕</span>;
        return currentDirection === 'asc'
            ? <span className="ml-1 text-primary">↑</span>
            : <span className="ml-1 text-primary">↓</span>;
    }
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video flex flex-col overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex items-center justify-center uppercase tracking-widest text-[10px] font-bold text-muted-foreground p-4">
                            <h1>Total Members</h1>
                        </div>
                        <div className="mt-auto">
                            <div className="text-3xl text-center font-black italic leading-none tabular-nums">
                                {stats.total_member}
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <div className="overflow-x-auto p-4">
                        <table className="w-full table-auto border-collapse">
                            <thead>
                                <tr className='border-b border-sidebar-border/70 dark:border-sidebar-border'>
                                    <th className="p-3 text-left text-sm font-semibold text-muted-foreground uppercase tracking-wider w-12">
                                        #
                                    </th>
                                    <th
                                        className="p-3 text-left text-sm font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                                        onClick={() => handleSort('name')}
                                    >
                                        Name {renderSortIcon('name')}
                                    </th>
                                    <th
                                        className="p-3 text-left text-sm font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                                        onClick={() => handleSort('username')}
                                    >
                                        Username {renderSortIcon('username')}
                                    </th>
                                    <th
                                        className="p-3 text-left text-sm font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer hover:text-foreground transition-colors"
                                        onClick={() => handleSort('email')}
                                    >
                                        Email {renderSortIcon('email')}
                                    </th>
                                </tr>
                                {/* Baris Filter tetap sama */}
                                <tr className="border-b border-sidebar-border/50 bg-muted/5">
                                    <th className="p-2"></th>
                                    <th className="p-2">
                                        <input
                                            type="text"
                                            placeholder="Filter Name..."
                                            className="w-full rounded border border-sidebar-border bg-background px-2 py-1 text-xs font-normal focus:ring-1 focus:ring-primary outline-none"
                                            value={filters.name}
                                            onChange={(e) => handleColumnSearch('name', e.target.value)}
                                        />
                                    </th>
                                    <th className="p-2">
                                        <input
                                            type="text"
                                            placeholder="Filter Username..."
                                            className="w-full rounded border border-sidebar-border bg-background px-2 py-1 text-xs font-normal focus:ring-1 focus:ring-primary outline-none"
                                            value={filters.username}
                                            onChange={(e) => handleColumnSearch('username', e.target.value)}
                                        />
                                    </th>
                                    <th className="p-2">
                                        <input
                                            type="text"
                                            placeholder="Filter Email..."
                                            className="w-full rounded border border-sidebar-border bg-background px-2 py-1 text-xs font-normal focus:ring-1 focus:ring-primary outline-none"
                                            value={filters.email}
                                            onChange={(e) => handleColumnSearch('email', e.target.value)}
                                        />
                                    </th>
                                </tr>
                            </thead>
                            <tbody className='divide-y divide-border-sidebar-border/70 dark:divide-sidebar-border'>
                                {stats.users.data.map((user, index) => (
                                    <tr key={user.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="py-2">{(stats.users.current_page - 1) * stats.users.per_page + index + 1}</td>
                                        <td className="py-2">{user.name}</td>
                                        <td className="py-2">{user.username}</td>
                                        <td className="py-2">{user.email}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex flex-wrap justify-center gap-1 p-4 border-t border-sidebar-border/70">
                        {stats.users.links.map((link, i) => (
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
