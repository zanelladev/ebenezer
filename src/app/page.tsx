import AboutSection from "@/components/home/AboutSection"
import BlogSection from "@/components/home/BlogSection"
import EventsSection from "@/components/home/EventsSection"
import Hero from "@/components/home/Hero"
import { createClient } from "@/lib/supabase/server"

export default async function Home() {
  const supabase = await createClient()

  // Fetch upcoming events (next 3, 1 for hero + 2 for events section)
  const { data: events } = await supabase
    .from("events")
    .select("*")
    .gte("date", new Date().toISOString())
    .order("date", { ascending: true })
    .limit(3)

  // Fetch latest blog posts (3)
  const { data: posts } = await supabase.from("posts").select("*").order("created_at", { ascending: false }).limit(3)

  // Helper function to extract time from date
  const formatTime = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })
  }

  // Prepare featured event for hero
  const featuredEvent =
    events && events.length > 0
      ? {
        title: events[0].name,
        date: new Date(events[0].date).toLocaleDateString("pt-BR"),
        time: formatTime(events[0].date),
        location: events[0].location,
        image: events[0].banner_url,
      }
      : null

  // Prepare events for events section (skip the first one used in hero)
  const sectionEvents =
    events && events.length > 1
      ? events.slice(1).map((event) => ({
        id: event.id,
        title: event.name,
        date: event.date,
        time: formatTime(event.date),
        location: event.location,
        image_url: event.banner_url,
      }))
      : []

  // Prepare posts for blog section
  const sectionPosts = posts
    ? posts.map((post) => ({
      id: post.id,
      title: post.name,
      author: post.author_name || "Pastor Marcos",
      read_time: 9,
      image_url: post.banner_url,
    }))
    : []

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <Hero featuredEvent={featuredEvent} />

      {/* About Section */}
      <AboutSection />

      {/* Events Section */}
      <EventsSection events={sectionEvents} />

      {/* Blog Section */}
      <BlogSection posts={sectionPosts} />
    </div>
  )
}
