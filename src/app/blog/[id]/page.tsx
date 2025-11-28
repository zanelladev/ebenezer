import { fetchMarkdownContent } from "@/lib/storage"
import { createClient } from "@/lib/supabase/server"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import ReactMarkdown from "react-markdown"

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase.from("posts").select("*").eq("id", id).single()

  if (!post) {
    notFound()
  }

  const { content, error } = await fetchMarkdownContent(post.content_url)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="pt-24 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Back button */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-display font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Voltar para o blog
          </Link>
        </div>

        {/* Header */}
        <div className="mb-12 flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Artigo</p>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              {post.name}
            </h1>
          </div>
          <div className="flex items-center gap-4 text-muted-foreground text-base">
            <span>{formatDate(post.created_at)}</span>
            <span>•</span>
            <span>Por {post.author_name}</span>
          </div>
        </div>

        {/* Content */}
        <div className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-lg">
          {error ? (
            <p className="text-destructive">Falha ao carregar conteúdo da publicação</p>
          ) : (
            <div className="prose prose-lg max-w-none">
              <ReactMarkdown>{content || ""}</ReactMarkdown>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
