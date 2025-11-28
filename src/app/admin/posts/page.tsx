"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import PostEditor from "@/components/admin/PostEditor"
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
    if (!confirm("Are you sure you want to delete this post?")) return

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
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
          <span className="font-montserrat font-medium">Back to Dashboard</span>
        </Link>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
          <div className="flex flex-col gap-2">
            <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">GERENCIAMENTO</p>
            <h1 className="font-montserrat text-4xl font-semibold text-[#002F34]">Blog Posts Management</h1>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="bg-[#009CA3] text-white px-6 py-3 rounded-lg hover:bg-[#047A81] transition-colors font-montserrat font-semibold shadow-md"
          >
            + Create Post
          </button>
        </div>

        {loading ? (
          <p className="text-[#002F34]/80">Loading posts...</p>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 bg-[#EFFEFD] rounded-2xl">
            <p className="text-[#002F34]/80 mb-4 text-lg">No blog posts yet</p>
            <button
              onClick={() => setIsCreating(true)}
              className="text-[#009CA3] hover:text-[#047A81] font-montserrat font-semibold"
            >
              Create your first post
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-[#EFFEFD] p-6 lg:p-8 rounded-2xl border-2 border-transparent hover:border-[#009CA3] transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                  <div className="flex-1">
                    <h3 className="font-montserrat text-2xl font-semibold text-[#002F34] mb-3">{post.name}</h3>
                    <p className="text-[#002F34]/60 text-sm mb-2">
                      📅 {formatDate(post.created_at)} • ✍️ By {post.author_name}
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setEditingPost(post)}
                      className="px-5 py-2.5 bg-[#009CA3] text-white rounded-lg hover:bg-[#047A81] transition-colors font-montserrat font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-montserrat font-medium"
                    >
                      Delete
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
