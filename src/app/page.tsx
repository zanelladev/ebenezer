import Hero from "@/components/home/Hero"
import AboutSection from "@/components/home/AboutSection"
import EventsSection from "@/components/home/EventsSection"
import BlogSection from "@/components/home/BlogSection"
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

  // Prepare featured event for hero
  const featuredEvent =
    events && events.length > 0
      ? {
          title: events[0].name,
          date: new Date(events[0].date).toLocaleDateString("pt-BR"),
          time: events[0].time || "A definir",
          location: events[0].location,
          image: events[0].banner_image_url || events[0].image_url,
        }
      : null

  // Prepare events for events section (skip the first one used in hero)
  const sectionEvents =
    events && events.length > 1
      ? events.slice(1).map((event) => ({
          id: event.id,
          title: event.name,
          date: event.date,
          time: event.time || "A definir",
          location: event.location,
          image_url: event.banner_image_url || event.image_url,
        }))
      : []

  // Prepare posts for blog section
  const sectionPosts = posts
    ? posts.map((post) => ({
        id: post.id,
        title: post.name,
        author: post.author_name || "Pastor Marcos",
        read_time: 9,
        image_url: post.banner_image_url || post.image_url,
      }))
    : []

  console.log("Events:", events?.length, "Posts:", posts?.length)
  console.log("Featured Event:", featuredEvent)

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
