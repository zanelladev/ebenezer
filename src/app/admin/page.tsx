import AdminLayout from '@/components/admin/AdminLayout';
import { AdminDashboardResources } from '@/lib/resources';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect('/login');
    }

    return (
        <AdminLayout>
            <div className="p-8">
                <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">
                    {AdminDashboardResources.title}
                </h1>
                <p className="text-gray-600 text-lg">
                    {AdminDashboardResources.welcome}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
                    <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-primary-100">
                        <div className="text-4xl mb-4">📅</div>
                        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                            {AdminDashboardResources.cards.events.title}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {AdminDashboardResources.cards.events.description}
                        </p>
                        <a
                            href="/admin/events"
                            className="text-primary-600 font-medium hover:underline"
                        >
                            {AdminDashboardResources.cards.events.action} →
                        </a>
                    </div>

                    <div className="bg-white p-8 rounded-xl shadow-lg border-2 border-primary-100">
                        <div className="text-4xl mb-4">📝</div>
                        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                            {AdminDashboardResources.cards.posts.title}
                        </h2>
                        <p className="text-gray-600 mb-4">
                            {AdminDashboardResources.cards.posts.description}
                        </p>
                        <a
                            href="/admin/posts"
                            className="text-primary-600 font-medium hover:underline"
                        >
                            {AdminDashboardResources.cards.posts.action} →
                        </a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
