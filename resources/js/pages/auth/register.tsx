import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { store } from '@/actions/App/Http/Controllers/UsersController';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Register New Member',
        href: '/register',
    },
];

export default function Register() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Register" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-col gap-4">
                    <div className="relative min-h-[50vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                        <div className="p-6">
                            <Form
                                {...store.form()}
                                resetOnSuccess={['password', 'password_confirmation']}
                                disableWhileProcessing
                                className="flex flex-col gap-6"
                            >
                                {({ processing, errors }) => (
                                    <>
                                        <div className="grid gap-6">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Name</Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    required
                                                    autoFocus
                                                    tabIndex={1}
                                                    autoComplete="name"
                                                    name="name"
                                                    placeholder="Full name"
                                                />
                                                <InputError
                                                    message={errors.name}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="username">Username</Label>
                                                <Input
                                                    id="username"
                                                    type="text"
                                                    required
                                                    tabIndex={2}
                                                    autoComplete="username"
                                                    name="username"
                                                    placeholder="Username"
                                                />
                                                <InputError
                                                    message={errors.username}
                                                    className="mt-2"
                                                />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Email address</Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    required
                                                    tabIndex={3}
                                                    autoComplete="email"
                                                    name="email"
                                                    placeholder="email@example.com"
                                                />
                                                <InputError message={errors.email} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="password">Password</Label>
                                                <Input
                                                    id="password"
                                                    type="password"
                                                    required
                                                    tabIndex={4}
                                                    autoComplete="new-password"
                                                    name="password"
                                                    placeholder="Password"
                                                />
                                                <InputError message={errors.password} />
                                            </div>

                                            <div className="grid gap-2">
                                                <Label htmlFor="password_confirmation">
                                                    Confirm password
                                                </Label>
                                                <Input
                                                    id="password_confirmation"
                                                    type="password"
                                                    required
                                                    tabIndex={5}
                                                    autoComplete="new-password"
                                                    name="password_confirmation"
                                                    placeholder="Confirm password"
                                                />
                                                <InputError
                                                    message={errors.password_confirmation}
                                                />
                                            </div>

                                            <div className="flex items-center justify-center mt-4">
                                                <Button
                                                    type="submit"
                                                    className="w-fit mr-2"
                                                    tabIndex={6}
                                                    data-test="register-user-button"
                                                >
                                                    {processing && <Spinner />}
                                                    Create account
                                                </Button>

                                                <Button
                                                    type='button'
                                                    onClick={() => window.history.back()}
                                                    tabIndex={7}
                                                    className="text-sm cursor-pointer"
                                                >
                                                    Back
                                                </Button>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
