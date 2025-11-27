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
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-6 max-w-4xl">
                        <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                            EVENTOS
                        </p>
                        <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] font-semibold text-[#002F34]">
                            {EventsResources.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-[#002F34]/80 leading-relaxed max-w-3xl">
                            {EventsResources.subtitle}
                        </p>
                    </div>
                </div>
            </section>

            {/* Upcoming Events */}
            <section className="py-12 sm:py-16 lg:py-20 bg-[#EFFEFD]">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-2 mb-8 sm:mb-12">
                        <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                            PRÓXIMOS EVENTOS
                        </p>
                        <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-[46px] leading-[1.22] font-semibold text-[#002F34]">
                            {EventsResources.upcoming.title}
                        </h2>
                    </div>

                    {upcomingEvents.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                            {upcomingEvents.map((event) => (
                                <EventCard key={event.id} event={event} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-[#002F34]/80 text-center py-8 sm:py-12 text-base sm:text-lg">
                            {EventsResources.upcoming.empty}
                        </p>
                    )}
                </div>
            </section>

            {/* Past Events */}
            {pastEvents.length > 0 && (
                <section className="py-12 sm:py-16 lg:py-20 bg-white">
                    <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col gap-2 mb-8 sm:mb-12">
                            <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                                EVENTOS ANTERIORES
                            </p>
                            <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-[46px] leading-[1.22] font-semibold text-[#002F34]">
                                {EventsResources.past.title}
                            </h2>
                        </div>
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
