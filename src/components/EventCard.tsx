'use client';

import { DateResources } from '@/lib/resources';
import { Database } from '@/lib/supabase/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group">
                    <div className="p-6">
                        <div className="text-primary-600 font-semibold text-sm mb-2">
                            {formatDate(event.date)}
                        </div>
                        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                            {event.name}
                        </h3>
                        <p className="text-gray-600 text-sm">
                            📍 {event.location}
                        </p>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
