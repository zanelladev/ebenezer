import EventCard from "@/components/EventCard"
import { EventsResources } from "@/lib/resources"
import { createClient } from "@/lib/supabase/server"

export default async function EventsPage() {
  const supabase = await createClient()

  const { data: events } = await supabase.from("events").select("*").order("date", { ascending: true })

  const now = new Date()
  const upcomingEvents = events?.filter((event) => new Date(event.date) >= now) || []
  const pastEvents = events?.filter((event) => new Date(event.date) < now) || []

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 max-w-4xl">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Eventos</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              {EventsResources.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{EventsResources.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                Próximos Eventos
              </p>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              {EventsResources.upcoming.title}
            </h2>
          </div>

          {upcomingEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground text-center py-12 text-lg">{EventsResources.upcoming.empty}</p>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-16 lg:py-24 bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-4 mb-12">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-muted-foreground rounded-full"></div>
                <p className="font-display text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                  Eventos Anteriores
                </p>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                {EventsResources.past.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
