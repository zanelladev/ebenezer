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
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 max-w-4xl">
                        <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                            BLOG
                        </p>
                        <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] font-semibold text-[#002F34]">
                            {BlogResources.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-[#002F34]/80 leading-relaxed max-w-3xl">
                            {BlogResources.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Blog Posts */}
            <section className="py-12 sm:py-16 lg:py-20 bg-[#EFFEFD]">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    {posts && posts.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 sm:py-16 lg:py-20">
                            <p className="text-[#002F34]/80 text-base sm:text-lg">
                                {BlogResources.empty}
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
