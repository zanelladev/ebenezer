import { fetchMarkdownContent } from '@/lib/storage';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { LiaCalendarAltSolid, LiaMapMarkerSolid } from 'react-icons/lia';
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
        <div className="pt-20 min-h-screen bg-white">
            <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
                {/* Back button */}
                <div className="mb-6 sm:mb-8">
                    <Link
                        href="/events"
                        className="inline-flex items-center gap-2 text-[#009CA3] hover:text-[#047A81] font-medium text-sm sm:text-base transition-colors"
                    >
                        ← Voltar para eventos
                    </Link>
                </div>

                {/* Header */}
                <div className="mb-8 sm:mb-12 flex flex-col gap-6">
                    <div className="flex flex-col gap-2">
                        <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                            EVENTO
                        </p>
                        <h1 className="font-montserrat text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#002F34]">
                            {event.name}
                        </h1>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 text-[#002F34]/80 text-sm sm:text-base">
                        <div className="flex items-center gap-2">
                            <LiaCalendarAltSolid className="w-5 h-5 flex-shrink-0 text-[#009CA3]" />
                            <span>{formatDate(event.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <LiaMapMarkerSolid className="w-5 h-5 flex-shrink-0 text-[#009CA3]" />
                            <span>{event.location}</span>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="bg-[#EFFEFD] rounded-2xl p-6 sm:p-8 lg:p-12">
                    {error ? (
                        <div>
                            <p className="text-red-600 mb-4 text-sm sm:text-base">Falha ao carregar conteúdo do evento</p>
                            <details className="text-xs sm:text-sm text-[#002F34]/60">
                                <summary className="cursor-pointer font-medium">Detalhes do erro</summary>
                                <pre className="mt-2 p-3 sm:p-4 bg-white rounded overflow-auto text-xs">
                                    {JSON.stringify({
                                        error: error.message,
                                        content_url: event.content_url
                                    }, null, 2)}
                                </pre>
                            </details>
                        </div>
                    ) : content ? (
                        <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:font-montserrat prose-headings:text-[#002F34] prose-p:text-[#002F34]/80 prose-a:text-[#009CA3] prose-strong:text-[#002F34]">
                            <ReactMarkdown>{content}</ReactMarkdown>
                        </div>
                    ) : (
                        <p className="text-[#002F34]/80 text-sm sm:text-base">Conteúdo não disponível</p>
                    )}
                </div>
            </div>
        </div>
    );
}
