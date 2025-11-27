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

    const isActive = (path: string) => {
        if (path === '/admin') {
            return pathname === '/admin';
        }
        return pathname?.startsWith(path);
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Admin Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#009CA3]/10">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo & Title */}
                        <div className="flex items-center gap-4">
                            <Link href="/" className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#009CA3] rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold text-xl">E</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-lato text-xs font-semibold text-[#047A81] uppercase tracking-wide">
                                        PAINEL ADMIN
                                    </span>
                                    <span className="font-montserrat text-lg font-bold text-[#002F34]">
                                        Ebenézer
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                href="/admin"
                                className={`px-4 py-2 rounded-lg transition-all font-montserrat font-medium text-sm ${
                                    isActive('/admin') && pathname === '/admin'
                                        ? 'bg-[#009CA3] text-white shadow-md'
                                        : 'text-[#002F34] hover:bg-[#EFFEFD]'
                                }`}
                            >
                                📊 Dashboard
                            </Link>
                            <Link
                                href="/admin/events"
                                className={`px-4 py-2 rounded-lg transition-all font-montserrat font-medium text-sm ${
                                    isActive('/admin/events')
                                        ? 'bg-[#009CA3] text-white shadow-md'
                                        : 'text-[#002F34] hover:bg-[#EFFEFD]'
                                }`}
                            >
                                📅 Events
                            </Link>
                            <Link
                                href="/admin/posts"
                                className={`px-4 py-2 rounded-lg transition-all font-montserrat font-medium text-sm ${
                                    isActive('/admin/posts')
                                        ? 'bg-[#009CA3] text-white shadow-md'
                                        : 'text-[#002F34] hover:bg-[#EFFEFD]'
                                }`}
                            >
                                📝 Posts
                            </Link>
                            <Link
                                href="/admin/migrate"
                                className={`px-4 py-2 rounded-lg transition-all font-montserrat font-medium text-sm ${
                                    isActive('/admin/migrate')
                                        ? 'bg-[#009CA3] text-white shadow-md'
                                        : 'text-[#002F34] hover:bg-[#EFFEFD]'
                                }`}
                            >
                                🔄 Migrate
                            </Link>
                        </div>

                        {/* Right Actions */}
                        <div className="flex items-center gap-3">
                            <Link
                                href="/"
                                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-[#002F34] hover:text-[#009CA3] transition-colors font-montserrat font-medium text-sm"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                View Site
                            </Link>
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 font-montserrat font-medium text-sm"
                            >
                                {isLoggingOut ? 'Logging out...' : 'Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="pt-20">
                {children}
            </main>
        </div>
    );
}
