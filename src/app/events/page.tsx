import EventCard from '@/components/EventCard';
import { EventsResources } from '@/lib/resources';
import { createClient } from '@/lib/supabase/server';

export default async function EventsPage() {
    const supabase = await createClient();

    const { data: events } = await supabase
        .from('events')
        .select('*')
        .order('date', { ascending: true });

    const now = new Date();
    const upcomingEvents = events?.filter(event => new Date(event.date) >= now) || [];
    const pastEvents = events?.filter(event => new Date(event.date) < now) || [];

    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-50 to-warm-100 py-12 sm:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                        {EventsResources.title}
                    </h1>
                    <p className="text-base sm:text-lg lg:text-xl text-gray-700">
                        {EventsResources.subtitle}
                    </p>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 lg:mb-12">
                        {EventsResources.upcoming.title}
                    </h2>

                    {upcomingEvents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center py-8 sm:py-12 text-sm sm:text-base">
                            {EventsResources.upcoming.empty}
                        </p>
                    )}
                </div>
            </section>

            {/* Past Events */}
            {pastEvents.length > 0 && (
                <section className="py-12 sm:py-16 lg:py-20 bg-warm-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-8 sm:mb-10 lg:mb-12">
                            {EventsResources.past.title}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {pastEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
