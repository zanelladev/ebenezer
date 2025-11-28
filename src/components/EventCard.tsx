"use client"

import { DateResources } from "@/lib/resources"
import type { Database } from "@/lib/supabase/types"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import Link from "next/link"

type Event = Database["public"]["Tables"]["events"]["Row"]

export default function EventCard({ event }: { event: Event }) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString(DateResources.locale, DateResources.formats.long)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group h-full"
    >
      <Link href={`/events/${event.id}`} className="block h-full">
        <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] h-full flex flex-col">
          <div className="p-6 flex flex-col gap-4 flex-1">
            <div className="text-primary font-display font-semibold text-sm">{formatDate(event.date)}</div>
            <h3 className="font-display text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug flex-1">
              {event.name}
            </h3>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
