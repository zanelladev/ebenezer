"use client"

import type React from "react"

import { AdminEventsResources } from "@/lib/resources"
import { fetchMarkdownContent, generateFilename, uploadMarkdownFile, uploadImage } from "@/lib/storage"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import RichTextEditor from "./RichTextEditor"
import { ImagePlus } from "lucide-react"

// Dynamic import for markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false })

type Event = Database["public"]["Tables"]["events"]["Row"]
type EventInsert = Database["public"]["Tables"]["events"]["Insert"]

interface Props {
  event: Event | null
  onSave: () => void
  onCancel: () => void
}

export default function EventEditor({ event, onSave, onCancel }: Props) {
  const [name, setName] = useState(event?.name || "")
  const [date, setDate] = useState(event?.date?.split("T")[0] || "")
  const [location, setLocation] = useState(event?.location || "")
  const [content, setContent] = useState("")
  const [bannerUrl, setBannerUrl] = useState(event?.banner_url || "")
  const [uploadingBanner, setUploadingBanner] = useState(false)
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (event?.content_url) {
      setLoading(true)
      fetchMarkdownContent(event.content_url).then(({ content: markdownContent, error }) => {
        if (!error && markdownContent) {
          setContent(markdownContent)
        }
        setLoading(false)
      })
    }
  }, [event])

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploadingBanner(true)
    const filename = `banner-${Date.now()}-${file.name}`
    const { url, error } = await uploadImage(file, "banners", filename)

    if (error || !url) {
      alert("Failed to upload banner image")
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
      const filename = event?.content_url
        ? event.content_url.split("/").pop()?.replace(".md", "") || generateFilename(name)
        : generateFilename(name)

      const { url, error: uploadError } = await uploadMarkdownFile(content, "events", filename)

      if (uploadError || !url) {
        alert("Failed to upload markdown content")
        setSaving(false)
        return
      }

      const eventData: EventInsert = {
        name,
        date,
        location,
        content_url: url,
        banner_url: bannerUrl || null,
      }

      if (event) {
        const { error } = await supabase.from("events").update(eventData).eq("id", event.id)

        if (!error) {
          onSave()
        } else {
          alert("Failed to save event")
        }
      } else {
        const { error } = await supabase.from("events").insert([eventData])

        if (!error) {
          onSave()
        } else {
          alert("Failed to create event")
        }
      }
    } catch (error) {
      console.error("Error saving event:", error)
      alert("An error occurred while saving")
    }

    setSaving(false)
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="font-display text-4xl font-bold text-foreground mb-8">
        {event ? AdminEventsResources.editor.titleEdit : AdminEventsResources.editor.titleNew}
      </h1>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">{AdminEventsResources.editor.loading}</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {AdminEventsResources.editor.fields.name.label} *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all"
              placeholder={AdminEventsResources.editor.fields.name.placeholder}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Banner Image</label>
            <div className="space-y-3">
              {bannerUrl && (
                <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border">
                  <img
                    src={bannerUrl || "/placeholder.svg"}
                    alt="Banner preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <label className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-border rounded-xl hover:border-primary hover:bg-accent/50 transition-all cursor-pointer">
                <ImagePlus className="w-5 h-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {uploadingBanner ? "Uploading..." : bannerUrl ? "Change Banner" : "Upload Banner"}
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
              {AdminEventsResources.editor.fields.date.label} *
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {AdminEventsResources.editor.fields.location.label} *
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="w-full px-4 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all"
              placeholder={AdminEventsResources.editor.fields.location.placeholder}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              {AdminEventsResources.editor.fields.content.label} *
            </label>
            <RichTextEditor value={content} onChange={setContent} type="events" />
            <p className="text-sm text-muted-foreground mt-2">{AdminEventsResources.editor.fields.content.info}</p>
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-primary text-primary-foreground py-3 rounded-xl hover:bg-primary/90 transition-all font-medium disabled:opacity-50 shadow-sm"
            >
              {saving ? AdminEventsResources.editor.actions.saving : AdminEventsResources.editor.actions.save}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
              className="flex-1 bg-secondary text-secondary-foreground py-3 rounded-xl hover:bg-secondary/80 transition-all font-medium disabled:opacity-50"
            >
              {AdminEventsResources.editor.actions.cancel}
            </button>
          </div>
        </form>
      )}
    </div>
  )
}
