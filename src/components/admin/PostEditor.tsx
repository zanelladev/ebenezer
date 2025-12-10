"use client"

import type React from "react"

import { AdminPostsResources, CommonResources } from "@/lib/resources"
import { fetchMarkdownContent, generateFilename, uploadImage, uploadMarkdownFile } from "@/lib/storage"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"
import { ArrowLeft, ImagePlus } from "lucide-react"
import { useEffect, useState } from "react"
import RichTextEditor from "./RichTextEditor"

export default function PostEditor({ post, onSave, onCancel }: Props) {
  const [name, setName] = useState(post?.name || "")
  const [content, setContent] = useState("")
  const [authorName, setAuthorName] = useState(post?.author_name || "")
  const [datetime, setDatetime] = useState(() => {
    if (post?.created_at) {
      return post.created_at.slice(0, 16)
    }
    return ""
  })
  const [bannerUrl, setBannerUrl] = useState(post?.banner_url || "")
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (post?.content_url) {
      setLoading(true)
      fetchMarkdownContent(post.content_url).then(({ content: markdownContent, error }) => {
        if (!error && markdownContent) {
          setContent(markdownContent)
        }
        setLoading(false)
      })
    }
  }, [post])

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingBanner(true)
    const filename = `banner-${Date.now()}-${file.name}`
    const { url, error } = await uploadImage(file, "banners", filename)

    if (error || !url) {
      alert(CommonResources.errors.bannerUploadFailed)
      setUploadingBanner(false)
      return
    }

    setBannerUrl(url)
    setUploadingBanner(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const filename = post?.content_url
        ? post.content_url.split("/").pop()?.replace(".md", "") || generateFilename(name)
        : generateFilename(name)

      const { url, error: uploadError } = await uploadMarkdownFile(content, "posts", filename)

      if (uploadError || !url) {
        alert(CommonResources.errors.contentUploadFailed)
        setSaving(false)
        return
      }

      const postData: PostInsert = {
        name,
        content_url: url,
        author_name: authorName,
        banner_url: bannerUrl || null,
        ...(datetime && { created_at: new Date(datetime).toISOString() }),
      }

      if (post) {
        const { error } = await supabase.from("posts").update(postData).eq("id", post.id)

        if (!error) {
          onSave()
        } else {
          alert(CommonResources.errors.updateFailed)
        }
      } else {
        const { error } = await supabase.from("posts").insert([postData])

        if (!error) {
          onSave()
        } else {
          alert(CommonResources.errors.createFailed)
        }
      }
    } catch (error) {
      alert(CommonResources.errors.genericError)
    }

    setSaving(false)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={onCancel}
          className="p-2 hover:bg-accent rounded-lg transition-colors"
          aria-label={AdminPostsResources.editor.actions.back}
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <h1 className="font-display text-4xl font-bold text-foreground">
          {post ? AdminPostsResources.editor.titleEdit : AdminPostsResources.editor.titleNew}
        </h1>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{AdminPostsResources.editor.loading}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {AdminPostsResources.editor.fields.title.label} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all"
              placeholder={AdminPostsResources.editor.fields.title.placeholder}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {AdminPostsResources.editor.fields.banner.label}
            </label>
            <div className="space-y-3">
              {bannerUrl && (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border">
                  <img
                    src={bannerUrl || "/placeholder.svg"}
                    alt={AdminPostsResources.editor.fields.banner.preview}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <label className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-accent/50 transition-all cursor-pointer">
                <ImagePlus className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {uploadingBanner
                    ? AdminPostsResources.editor.fields.banner.uploading
                    : bannerUrl
                      ? AdminPostsResources.editor.fields.banner.change
                      : AdminPostsResources.editor.fields.banner.button}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  disabled={uploadingBanner}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {AdminPostsResources.editor.fields.author.label} *
            </label>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all"
              placeholder={AdminPostsResources.editor.fields.author.placeholder}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Created Date</label>
            <input
              type="datetime-local"
              value={datetime}
              onChange={(e) => setDatetime(e.target.value)}
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {AdminPostsResources.editor.fields.content.label} *
            </label>
            <RichTextEditor value={content} onChange={setContent} type="posts" />
            <p className="text-sm text-muted-foreground mt-2">{AdminPostsResources.editor.fields.content.info}</p>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-xl hover:bg-secondary/80 transition-all font-medium disabled:opacity-50"
            >
              {AdminPostsResources.editor.actions.cancel}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 transition-all font-medium disabled:opacity-50 shadow-sm"
            >
              {saving ? AdminPostsResources.editor.actions.saving : AdminPostsResources.editor.actions.save}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

type Post = Database["public"]["Tables"]["posts"]["Row"]
type PostInsert = Database["public"]["Tables"]["posts"]["Insert"]

interface Props {
  post: Post | null
  onSave: () => void
  onCancel: () => void
}
