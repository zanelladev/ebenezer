import BlogCard from '@/components/BlogCard';
import EventCard from '@/components/EventCard';
import Hero from '@/components/home/Hero';
import { HomeResources } from '@/lib/resources';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function Home() {
    const supabase = await createClient();

    // Fetch upcoming events (next 2)
    const { data: events } = await supabase
        .from('events')
        .select('*')
        .gte('date', new Date().toISOString())
        .order('date', { ascending: true })
        .limit(2);

    // Fetch latest blog posts (3)
    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3);

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <Hero />

            {/* About Section */}
            <section className="py-20 bg-warm-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h3 className="text-sm font-bold text-primary-600 mb-4 uppercase tracking-wider">
                                {HomeResources.about.title}
                            </h3>
                            <h2 className="font-sans text-4xl font-bold text-gray-900 mb-6 leading-tight">
                                {HomeResources.about.subtitle}
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                {HomeResources.about.description}
                            </p>
                            <p className="text-lg text-gray-700 leading-relaxed mb-8">
                                Queremos explorar e inspirar você a viver o potencial que Deus lhe deu. Junte-se a nós e veja como isso fé-inspirada pode construir um futuro com mais esperança.
                            </p>
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-lg hover:bg-primary-50 transition-colors font-medium border-2 border-primary-600"
                            >
                                Conheça nossa história
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>

                        {/* Image with decorative overlay */}
                        <div className="relative">
                            <div className="absolute -left-6 -top-6 w-48 h-48 bg-primary-500 rounded-br-[80px] z-0"></div>
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=500&fit=crop"
                                    alt="Comunidade"
                                    className="w-full h-[400px] object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-20 bg-primary-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-12">
                        <h3 className="text-sm font-bold text-primary-700 mb-4 uppercase tracking-wider">
                            {HomeResources.events.title}
                        </h3>
                        <h2 className="font-sans text-4xl font-bold text-gray-900 mb-4">
                            {HomeResources.events.subtitle}
                        </h2>
                        <p className="text-lg text-gray-700 max-w-3xl">
                            Acreditamos que o crescimento espiritual acontece quando caminhamos juntos. Por isso, cada encontro, palestra no calendário e pessoas como uma porta para momentos criados para inspirar.
                        </p>
                    </div>

                    {events && events.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                            {events.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 mb-8">{HomeResources.events.noEvents}</p>
                    )}

                    <div className="text-left">
                        <Link
                            href="/events"
                            className="inline-flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                        >
                            {HomeResources.events.viewAll}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Blog Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h3 className="text-sm font-bold text-primary-700 mb-4 uppercase tracking-wider">
                                {HomeResources.blog.title}
                            </h3>
                            <h2 className="font-sans text-4xl font-bold text-gray-900">
                                {HomeResources.blog.subtitle}
                            </h2>
                        </div>
                        <Link
                            href="/blog"
                            className="hidden md:inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {HomeResources.blog.viewAll}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>

                    {posts && posts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-600 mb-8">{HomeResources.blog.noPosts}</p>
                    )}

                    <div className="text-center md:hidden">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
                        >
                            {HomeResources.blog.viewAll}
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
