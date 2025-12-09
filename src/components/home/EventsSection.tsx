"use client"

import { motion } from "framer-motion"
import { ArrowUpRight, Calendar, Clock, MapPin } from "lucide-react"
import Link from "next/link"

interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  image_url?: string
}

interface EventsSectionProps {
  events: Event[]
}

export default function EventsSection({ events }: EventsSectionProps) {
  const displayEvents = events.slice(0, 2)

  return (
    <section className="bg-accent/10 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex flex-col gap-6"
            >
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                  Eventos Futuros
                </p>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl font-bold text-foreground leading-tight text-balance">
                Fortaleça sua fé em um ambiente de união
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Acreditamos que o crescimento espiritual acontece quando caminhamos juntos. Cada encontro é pensado como
                uma ponte para conectar você mais profundamente com Deus.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-start lg:justify-end"
            >
              <Link
                href="/events"
                className="group inline-flex items-center gap-3 px-8 py-4 bg-primary rounded-xl font-display text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                Ver todos os eventos
                <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link
                  href={`/events/${event.id}`}
                  className="flex flex-col gap-5 p-6 bg-card border border-border rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  <div className="w-full h-56 rounded-xl overflow-hidden bg-muted flex items-center justify-center">
                    {event.image_url ? (
                      <img
                        src={event.image_url || "/placeholder.svg"}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <img src="/assets/Logo.svg" alt="Ebenézer Logo" className="w-40 h-10 object-contain opacity-30" />
                    )}
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="font-display text-2xl font-semibold text-foreground group-hover:text-primary transition-colors">
                      {event.title}
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-5 h-5" />
                        <span className="text-sm">
                          {(() => {
                            const [year, month, day] = event.date.split("T")[0].split("-")
                            const date = new Date(Number(year), Number(month) - 1, Number(day))
                            return date.toLocaleDateString("pt-BR")
                          })()}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-5 h-5" />
                        <span className="text-sm">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-5 h-5" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
            {displayEvents.length === 0 && (
              <div className="col-span-2 flex items-center justify-center py-20 text-muted-foreground">
                Nenhum evento futuro disponível
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
