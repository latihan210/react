import { Head } from '@inertiajs/react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    stats: {
        total_member: number;
        member_active: number;
        member_inactive: number;
    };
}

export default function Dashboard({ stats }: DashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex items-center justify-center uppercase tracking-widest text-[10px] font-bold text-muted-foreground p-4 mt-7">
                            <h1>Total Members</h1>
                        </div>
                        <div className="mt-auto">
                            <div className="text-3xl text-center font-black italic leading-none tabular-nums">
                                {stats.total_member}
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex items-center justify-center uppercase tracking-widest text-[10px] font-bold text-muted-foreground p-4 mt-7">
                            <h1>Active Members</h1>
                        </div>
                        <div className="mt-auto">
                            <div className="text-3xl text-center font-black italic leading-none tabular-nums">
                                {stats.member_active}
                            </div>
                        </div>
                    </div>
                    <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                        <div className="flex items-center justify-center uppercase tracking-widest text-[10px] font-bold text-muted-foreground p-4 mt-7">
                            <h1>Inactive Members</h1>
                        </div>
                        <div className="mt-auto">
                            <div className="text-3xl text-center font-black italic leading-none tabular-nums">
                                {stats.member_inactive}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                </div>
            </div>
        </AppLayout>
    );
}
