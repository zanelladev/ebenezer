import BlogCard from '@/components/BlogCard';
import { BlogResources } from '@/lib/resources';
import { createClient } from '@/lib/supabase/server';

export default async function BlogPage() {
    const supabase = await createClient();

    const { data: posts } = await supabase
        .from('posts')
        .select('*')
        .order('created_at', { ascending: false });

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-50 to-warm-100 py-12 sm:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                        {BlogResources.title}
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700">
                        {BlogResources.subtitle}
                    </p>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {posts && posts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 sm:py-16 lg:py-20">
                            <p className="text-gray-600 text-base sm:text-lg">
                                {BlogResources.empty}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
