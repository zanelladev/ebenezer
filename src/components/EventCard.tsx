'use client';

import { DateResources } from '@/lib/resources';
import { Database } from '@/lib/supabase/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LiaMapMarkerSolid } from 'react-icons/lia';

type Event = Database['public']['Tables']['events']['Row'];

export default function EventCard({ event }: { event: Event }) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(DateResources.locale, DateResources.formats.long);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link href={`/events/${event.id}`}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group h-full">
                    <div className="p-4 sm:p-6">
                        <div className="text-primary-600 font-semibold text-xs sm:text-sm mb-2">
                            {formatDate(event.date)}
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                            {event.name}
                        </h3>
                        <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <LiaMapMarkerSolid className="w-4 h-4 flex-shrink-0" />
                            <span className="line-clamp-1">{event.location}</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
