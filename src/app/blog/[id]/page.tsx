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
        <div className="pt-20 min-h-screen bg-white">
            <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Back button */}
                <div className="mb-6 sm:mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-[#009CA3] hover:text-[#047A81] font-medium text-sm sm:text-base transition-colors"
                    >
                        ← Voltar para o blog
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-8 sm:mb-12 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                            ARTIGO
                        </p>
                        <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#002F34]">
                            {post.name}
                        </h1>
                    </div>
                    <div className="text-[#002F34]/80 text-sm sm:text-base flex flex-wrap items-center gap-2">
                        <span>{formatDate(post.created_at)}</span>
                        <span className="mx-1">•</span>
                        <span>Por {post.author_name}</span>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-[#EFFEFD] rounded-2xl p-6 sm:p-8 lg:p-12">
                    {error ? (
                        <p className="text-red-600 text-sm sm:text-base">Falha ao carregar conteúdo da publicação</p>
                    ) : (
                        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:font-montserrat prose-headings:text-[#002F34] prose-p:text-[#002F34]/80 prose-a:text-[#009CA3] prose-strong:text-[#002F34]">
                            <ReactMarkdown>{content || ''}</ReactMarkdown>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
