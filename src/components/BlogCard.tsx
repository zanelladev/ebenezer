"use client"

import { CommonResources, DateResources } from "@/lib/resources"
import type { Database } from "@/lib/supabase/types"
import { motion } from "framer-motion"
import { ArrowRight, Clock, User } from "lucide-react"
import Link from "next/link"

type Post = Database["public"]["Tables"]["posts"]["Row"]

export default function BlogCard({ post }: { post: Post }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(DateResources.locale, DateResources.formats.short)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group h-full"
    >
      <Link href={`/blog/${post.id}`} className="block h-full">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
          <div className="p-6 flex-1 flex flex-col gap-4">
            <div className="flex items-center gap-4 text-muted-foreground text-xs font-medium">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{formatDate(post.created_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span className="line-clamp-1">{post.author_name}</span>
              </div>
            </div>
            <h3 className="font-display text-xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug flex-1">
              {post.name}
            </h3>
            <div className="flex items-center gap-2 text-primary font-display font-semibold text-sm group-hover:gap-3 transition-all">
              {CommonResources.actions.readMore}
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
