'use client';

import { AdminEventsResources } from '@/lib/resources';
import { fetchMarkdownContent, generateFilename, uploadMarkdownFile } from '@/lib/storage';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamic import for markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type Event = Database['public']['Tables']['events']['Row'];
type EventInsert = Database['public']['Tables']['events']['Insert'];

interface Props {
    event: Event | null;
    onSave: () => void;
    onCancel: () => void;
}

export default function EventEditor({ event, onSave, onCancel }: Props) {
    const [name, setName] = useState(event?.name || '');
    const [date, setDate] = useState(event?.date?.split('T')[0] || '');
    const [location, setLocation] = useState(event?.location || '');
    const [content, setContent] = useState('');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    // Load existing markdown content if editing
    useEffect(() => {
        if (event?.content_url) {
            setLoading(true);
            fetchMarkdownContent(event.content_url).then(({ content: markdownContent, error }) => {
                if (!error && markdownContent) {
                    setContent(markdownContent);
                }
                setLoading(false);
            });
        }
    }, [event]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Generate filename and upload markdown content
            const filename = event?.content_url
                ? event.content_url.split('/').pop()?.replace('.md', '') || generateFilename(name)
                : generateFilename(name);

            const { url, error: uploadError } = await uploadMarkdownFile(content, 'events', filename);

            if (uploadError || !url) {
                alert('Failed to upload markdown content');
                setSaving(false);
                return;
            }

            const eventData: EventInsert = {
                name,
                date,
                location,
                content_url: url,
            };

            if (event) {
                // Update existing event
                const { error } = await supabase
                    .from('events')
                    .update(eventData)
                    .eq('id', event.id);

                if (!error) {
                    onSave();
                } else {
                    alert('Failed to save event');
                }
            } else {
                // Create new event
                const { error } = await supabase
                    .from('events')
                    .insert([eventData]);

                if (!error) {
                    onSave();
                } else {
                    alert('Failed to create event');
                }
            }
        } catch (error) {
            console.error('Error saving event:', error);
            alert('An error occurred while saving');
        }

        setSaving(false);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-8">
                {event ? AdminEventsResources.editor.titleEdit : AdminEventsResources.editor.titleNew}
            </h1>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">{AdminEventsResources.editor.loading}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {AdminEventsResources.editor.fields.name.label} *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder={AdminEventsResources.editor.fields.name.placeholder}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {AdminEventsResources.editor.fields.date.label} *
                        </label>
                        <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {AdminEventsResources.editor.fields.location.label} *
                        </label>
                        <input
                            type="text"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder={AdminEventsResources.editor.fields.location.placeholder}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {AdminEventsResources.editor.fields.content.label} *
                        </label>
                        <div data-color-mode="light">
                            <MDEditor
                                value={content}
                                onChange={(val) => setContent(val || '')}
                                height={400}
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            {AdminEventsResources.editor.fields.content.info}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
                        >
                            {saving ? AdminEventsResources.editor.actions.saving : AdminEventsResources.editor.actions.save}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={saving}
                            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
                        >
                            {AdminEventsResources.editor.actions.cancel}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
