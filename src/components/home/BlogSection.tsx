"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Clock, User } from "lucide-react"
import Link from "next/link"

interface Post {
  id: string
  title: string
  author: string
  read_time?: number
  image_url?: string
}

interface BlogSectionProps {
  posts: Post[]
}

export default function BlogSection({ posts }: BlogSectionProps) {
  const displayPosts = posts.slice(0, 3)

  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col gap-4 flex-1"
            >
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Blog</p>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight text-balance">
                Reflexões que fortalecem a jornada
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Link
                href="/blog"
                className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-primary rounded-xl font-display text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Ver todos os posts
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link
                  href={`/blog/${post.id}`}
                  className="flex flex-col gap-5 bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="w-full h-64 overflow-hidden bg-muted">
                    <img
                      src={
                        post.image_url ||
                        "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500&h=300&fit=crop"
                      }
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex flex-col gap-4 p-6">
                    <div className="flex items-center gap-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs font-medium">{post.read_time || 9} min</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span className="text-xs font-medium">{post.author}</span>
                      </div>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
            {displayPosts.length === 0 && (
              <div className="col-span-full flex items-center justify-center py-20 text-muted-foreground">
                Nenhuma publicação disponível
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
