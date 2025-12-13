import { fetchMarkdownContent } from "@/lib/storage"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

export default async function EventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: event } = await supabase.from("events").select("*").eq("id", id).single()

  if (!event) {
    notFound()
  }

  const { content, error } = await fetchMarkdownContent(event.content_url)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/events"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-display font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para eventos
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 flex flex-col gap-8">
          {event.banner_url && (
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-3xl overflow-hidden">
              <img
                src={event.banner_url}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Evento</p>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {event.name}
            </h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 text-muted-foreground">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-primary" />
              <span className="text-base">{formatDate(event.date)}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-base">{event.location}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-lg">
          {error ? (
            <div className="space-y-4">
              <p className="text-destructive text-base">Falha ao carregar conteúdo do evento</p>
              <details className="text-sm text-muted-foreground">
                <summary className="cursor-pointer font-medium hover:text-foreground transition-colors">
                  Detalhes do erro
                </summary>
                <pre className="mt-4 p-4 bg-muted rounded-xl overflow-auto text-xs">
                  {JSON.stringify(
                    {
                      error: error.message,
                      content_url: event.content_url,
                    },
                    null,
                    2,
                  )}
                </pre>
              </details>
            </div>
          ) : content ? (
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-muted-foreground">Conteúdo não disponível</p>
          )}
        </div>
      </div>
    </div>
  )
}
