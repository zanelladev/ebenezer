'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import EventEditor from '@/components/admin/EventEditor';
import { deleteMarkdownFile } from '@/lib/storage';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';
import { useEffect, useState } from 'react';

type Event = Database['public']['Tables']['events']['Row'];

export default function AdminEventsPage() {
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingEvent, setEditingEvent] = useState<Event | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        fetchEvents();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('events')
            .select('*')
            .order('date', { ascending: false });

        if (data) setEvents(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this event?')) return;

        // Find the event to get its content_url
        const eventToDelete = events.find(e => e.id === id);

        // Delete from database
        const { error } = await supabase
            .from('events')
            .delete()
            .eq('id', id);

        if (!error) {
            // Delete markdown file from storage
            if (eventToDelete?.content_url) {
                await deleteMarkdownFile(eventToDelete.content_url);
            }
            fetchEvents();
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isCreating || editingEvent) {
        return (
            <AdminLayout>
                <EventEditor
                    event={editingEvent}
                    onSave={() => {
                        setIsCreating(false);
                        setEditingEvent(null);
                        fetchEvents();
                    }}
                    onCancel={() => {
                        setIsCreating(false);
                        setEditingEvent(null);
                    }}
                />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="p-8 lg:p-12">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-12">
                    <div className="flex flex-col gap-2">
                        <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                            GERENCIAMENTO
                        </p>
                        <h1 className="font-montserrat text-4xl font-semibold text-[#002F34]">
                            Events Management
                        </h1>
                    </div>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-[#009CA3] text-white px-6 py-3 rounded-lg hover:bg-[#047A81] transition-colors font-montserrat font-semibold shadow-md"
                    >
                        + Create Event
                    </button>
                </div>

                {loading ? (
                    <p className="text-[#002F34]/80">Loading events...</p>
                ) : events.length === 0 ? (
                    <div className="text-center py-16 bg-[#EFFEFD] rounded-2xl">
                        <p className="text-[#002F34]/80 mb-4 text-lg">No events yet</p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="text-[#009CA3] hover:text-[#047A81] font-montserrat font-semibold"
                        >
                            Create your first event
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-[#EFFEFD] p-6 lg:p-8 rounded-2xl border-2 border-transparent hover:border-[#009CA3] transition-all"
                            >
                                <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                                    <div className="flex-1">
                                        <h3 className="font-montserrat text-2xl font-semibold text-[#002F34] mb-3">
                                            {event.name}
                                        </h3>
                                        <p className="text-[#009CA3] font-medium mb-2 text-sm sm:text-base">
                                            📅 {formatDate(event.date)} • 📍 {event.location}
                                        </p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => setEditingEvent(event)}
                                            className="px-5 py-2.5 bg-[#009CA3] text-white rounded-lg hover:bg-[#047A81] transition-colors font-montserrat font-medium"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-montserrat font-medium"
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
    );
}
