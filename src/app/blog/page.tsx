import BlogCard from "@/components/BlogCard"
import { BlogResources } from "@/lib/resources"
import { createClient } from "@/lib/supabase/server"

export default async function BlogPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Blog</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              {BlogResources.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{BlogResources.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {posts && posts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">{BlogResources.empty}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
