"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import PostEditor from "@/components/admin/PostEditor"
import { AdminDashboardResources, AdminPostsResources } from "@/lib/resources"
import { deleteMarkdownFile } from "@/lib/storage"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"
import Link from "next/link"
import { useEffect, useState } from "react"

type Post = Database["public"]["Tables"]["posts"]["Row"]

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    const { data } = await supabase.from("posts").select("*").order("created_at", { ascending: false })

    if (data) setPosts(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm(AdminPostsResources.confirmDelete)) return

    const postToDelete = posts.find((p) => p.id === id)

    const { error } = await supabase.from("posts").delete().eq("id", id)

    if (!error) {
      if (postToDelete?.content_url) {
        await deleteMarkdownFile(postToDelete.content_url)
      }
      fetchPosts()
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (isCreating || editingPost) {
    return (
      <AdminLayout>
        <PostEditor
          post={editingPost}
          onSave={() => {
            setIsCreating(false)
            setEditingPost(null)
            fetchPosts()
          }}
          onCancel={() => {
            setIsCreating(false)
            setEditingPost(null)
          }}
        />
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="p-8 lg:p-12">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-[#002F34] hover:text-[#009CA3] transition-colors mb-8 group"
        >
          <svg
            className="w-5 h-5 transition-transform group-hover:-translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-montserrat font-medium">{AdminDashboardResources.navigation.backToDashboard}</span>
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <p className="font-lato text-sm font-semibold text-[#047A81] uppercase tracking-wide">GERENCIAMENTO</p>
            <h1 className="font-montserrat text-3xl font-semibold text-[#002F34]">{AdminPostsResources.title}</h1>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 bg-[#009CA3] text-white px-5 py-2.5 rounded-lg hover:bg-[#047A81] transition-colors font-montserrat font-medium text-sm shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            {AdminPostsResources.createButton}
          </button>
        </div>

        {loading ? (
          <p className="text-[#002F34]/80">{AdminPostsResources.list.loadingText}</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#002F34]/10 rounded-xl">
            <p className="text-[#002F34]/80 mb-4 text-lg">{AdminPostsResources.empty.title}</p>
            <button
              onClick={() => setIsCreating(true)}
              className="text-[#009CA3] hover:text-[#047A81] font-montserrat font-semibold"
            >
              {AdminPostsResources.empty.action}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-6 rounded-xl border border-[#002F34]/10 hover:border-[#009CA3] transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-montserrat text-xl font-semibold text-[#002F34] mb-2">{post.name}</h3>
                    <p className="text-[#002F34]/60 text-sm">
                      📅 {formatDate(post.created_at)} • ✍️ By {post.author_name}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingPost(post)}
                      className="px-4 py-2 border border-[#009CA3] text-[#009CA3] rounded-lg hover:bg-[#009CA3] hover:text-white transition-colors font-montserrat font-medium text-sm"
                    >
                      {AdminPostsResources.actions.edit}
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-montserrat font-medium text-sm"
                    >
                      {AdminPostsResources.actions.delete}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  )
}
