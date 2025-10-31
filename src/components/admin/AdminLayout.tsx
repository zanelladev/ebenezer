'use client';

import { AdminLayoutResources } from '@/lib/resources';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/');
        router.refresh();
    };

    const isActive = (path: string) => pathname?.startsWith(path);

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            <div className="flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-lg min-h-screen">
                    <div className="p-6 border-b">
                        <h2 className="font-serif text-2xl font-bold text-gray-900">
                            {AdminLayoutResources.title}
                        </h2>
                    </div>

                    <nav className="p-4">
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/admin"
                                    className={`block px-4 py-3 rounded-lg transition-colors ${pathname === '/admin'
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {AdminLayoutResources.menu.dashboard}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin/events"
                                    className={`block px-4 py-3 rounded-lg transition-colors ${isActive('/admin/events')
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {AdminLayoutResources.menu.events}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin/posts"
                                    className={`block px-4 py-3 rounded-lg transition-colors ${isActive('/admin/posts')
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {AdminLayoutResources.menu.posts}
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/admin/migrate"
                                    className={`block px-4 py-3 rounded-lg transition-colors ${isActive('/admin/migrate')
                                        ? 'bg-primary-600 text-white'
                                        : 'text-gray-700 hover:bg-gray-100'
                                        }`}
                                >
                                    {AdminLayoutResources.menu.migrate}
                                </Link>
                            </li>
                        </ul>
                    </nav>

                    <div className="p-4 border-t absolute bottom-20 w-64">
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                        >
                            {isLoggingOut ? AdminLayoutResources.loggingOut : AdminLayoutResources.logout}
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}
