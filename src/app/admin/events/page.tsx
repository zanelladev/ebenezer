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
            <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="font-serif text-4xl font-bold text-gray-900">
                        Events Management
                    </h1>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                        + Create Event
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-600">Loading events...</p>
                ) : events.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl">
                        <p className="text-gray-600 mb-4">No events yet</p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="text-primary-600 hover:underline font-medium"
                        >
                            Create your first event
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {events.map((event) => (
                            <div
                                key={event.id}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                                            {event.name}
                                        </h3>
                                        <p className="text-primary-600 font-medium mb-2">
                                            {formatDate(event.date)} • {event.location}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => setEditingEvent(event)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(event.id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
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
