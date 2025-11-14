import { fetchMarkdownContent } from '@/lib/storage';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: post } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();

    if (!post) {
        notFound();
    }

    // Fetch markdown content from storage
    const { content, error } = await fetchMarkdownContent(post.content_url);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div className="pt-20 min-h-screen bg-warm-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Header */}
                <div className="mb-6 sm:mb-8">
                    <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4">
                        {post.name}
                    </h1>
                    <div className="text-gray-600 text-sm sm:text-base flex flex-wrap items-center gap-2">
                        <span>{formatDate(post.created_at)}</span>
                        <span className="mx-1">•</span>
                        <span>By {post.author_name}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 lg:p-8">
                    {error ? (
                        <p className="text-red-600 text-sm sm:text-base">Failed to load post content</p>
                    ) : (
                        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none">
                            <ReactMarkdown>{content || ''}</ReactMarkdown>
                        </div>
                    )}
                </div>

                {/* Back button */}
                <div className="mt-6 sm:mt-8">
                    <Link
                        href="/blog"
                        className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2 text-sm sm:text-base"
                    >
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}
