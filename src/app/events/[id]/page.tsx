import { fetchMarkdownContent } from '@/lib/storage';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const supabase = await createClient();

    const { data: event } = await supabase
        .from('events')
        .select('*')
        .eq('id', id)
        .single();

    if (!event) {
        notFound();
    }

    // Fetch markdown content from storage
    const { content, error } = await fetchMarkdownContent(event.content_url);

    // Log for debugging
    console.log('Event content_url:', event.content_url);
    console.log('Fetch error:', error);
    console.log('Content length:', content?.length);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="pt-20 min-h-screen bg-warm-50">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="font-serif text-5xl font-bold text-gray-900 mb-4">
                        {event.name}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                            <span className="text-xl">📅</span>
                            <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xl">📍</span>
                            <span>{event.location}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                    {error ? (
                        <div>
                            <p className="text-red-600 mb-4">Failed to load event content</p>
                            <details className="text-sm text-gray-600">
                                <summary className="cursor-pointer font-medium">Error Details</summary>
                                <pre className="mt-2 p-4 bg-gray-100 rounded overflow-auto">
                                    {JSON.stringify({
                                        error: error.message,
                                        content_url: event.content_url
                                    }, null, 2)}
                                </pre>
                            </details>
                        </div>
                    ) : content ? (
                        <div className="prose prose-lg max-w-none">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-gray-600">No content available</p>
                    )}
                </div>

                {/* Back button */}
                <div className="mt-8">
                    <Link
                        href="/events"
                        className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2"
                    >
                        ← Back to Events
                    </Link>
                </div>
            </div>
        </div>
    );
}
