"use client"

import AdminLayout from "@/components/admin/AdminLayout"
import EventEditor from "@/components/admin/EventEditor"
import { deleteMarkdownFile } from "@/lib/storage"
import { createClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"
import Link from "next/link"
import { useEffect, useState } from "react"

type Event = Database["public"]["Tables"]["events"]["Row"]

export default function AdminEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    fetchEvents()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchEvents = async () => {
    setLoading(true)
    const { data } = await supabase.from("events").select("*").order("date", { ascending: false })

    if (data) setEvents(data)
    setLoading(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    const eventToDelete = events.find((e) => e.id === id)

    const { error } = await supabase.from("events").delete().eq("id", id)

    if (!error) {
      if (eventToDelete?.content_url) {
        await deleteMarkdownFile(eventToDelete.content_url)
      }
      fetchEvents()
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

  if (isCreating || editingEvent) {
    return (
      <AdminLayout>
        <EventEditor
          event={editingEvent}
          onSave={() => {
            setIsCreating(false)
            setEditingEvent(null)
            fetchEvents()
          }}
          onCancel={() => {
            setIsCreating(false)
            setEditingEvent(null)
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

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <p className="font-lato text-sm font-semibold text-[#047A81] uppercase tracking-wide">GERENCIAMENTO</p>
            <h1 className="font-montserrat text-3xl font-semibold text-[#002F34]">Events Management</h1>
          </div>
          <button
            onClick={() => setIsCreating(true)}
            className="inline-flex items-center gap-2 bg-[#009CA3] text-white px-5 py-2.5 rounded-lg hover:bg-[#047A81] transition-colors font-montserrat font-medium text-sm shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Create Event
          </button>
        </div>

        {loading ? (
          <p className="text-[#002F34]/80">Loading events...</p>
        ) : events.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#002F34]/10 rounded-xl">
            <p className="text-[#002F34]/80 mb-4 text-lg">No events yet</p>
            <button
              onClick={() => setIsCreating(true)}
              className="text-[#009CA3] hover:text-[#047A81] font-montserrat font-semibold"
            >
              Create your first event
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white p-6 rounded-xl border border-[#002F34]/10 hover:border-[#009CA3] transition-all"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-montserrat text-xl font-semibold text-[#002F34] mb-2">{event.name}</h3>
                    <p className="text-[#002F34]/60 font-medium text-sm">
                      📅 {formatDate(event.date)} • 📍 {event.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setEditingEvent(event)}
                      className="px-4 py-2 border border-[#009CA3] text-[#009CA3] rounded-lg hover:bg-[#009CA3] hover:text-white transition-colors font-montserrat font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-4 py-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-colors font-montserrat font-medium text-sm"
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
