'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import { createClient } from '@/lib/supabase/client';
import { useState } from 'react';

export default function MigratePage() {
    const [migrating, setMigrating] = useState(false);
    const [result, setResult] = useState<string>('');
    const supabase = createClient();

    const migrateData = async () => {
        setMigrating(true);
        setResult('Starting migration...\n');

        try {
            // Check for old events with 'content' field
            const { data: events, error: eventsError } = await supabase
                .from('events')
                .select('*');

            if (eventsError) {
                setResult(prev => prev + `Error fetching events: ${eventsError.message}\n`);
                setMigrating(false);
                return;
            }

            setResult(prev => prev + `Found ${events?.length || 0} events\n`);

            // Check if storage bucket exists
            const { data: buckets } = await supabase.storage.listBuckets();
            const hasMarkdownBucket = buckets?.some(b => b.name === 'markdown-content');

            if (!hasMarkdownBucket) {
                setResult(prev => prev + '\n⚠️  WARNING: markdown-content bucket not found!\n');
                setResult(prev => prev + 'Please run the SQL setup script first.\n');
                setMigrating(false);
                return;
            }

            setResult(prev => prev + '\n✓ Storage bucket exists\n');
            setResult(prev => prev + '\nEvents in database:\n');

            events?.forEach(event => {
                setResult(prev => prev + `\n- ${event.name}`);
                setResult(prev => prev + `\n  ID: ${event.id}`);
                setResult(prev => prev + `\n  Has content_url: ${!!event.content_url}`);
                setResult(prev => prev + `\n  Content URL: ${event.content_url || 'N/A'}\n`);
            });

            setResult(prev => prev + '\nMigration check complete!\n');
            setResult(prev => prev + '\nIf content_url is missing, delete the old event and create a new one through the admin dashboard.\n');

        } catch (error) {
            setResult(prev => prev + `\nError: ${error}\n`);
        }

        setMigrating(false);
    };

    return (
        <AdminLayout>
            <div className="p-8 max-w-4xl mx-auto">
                <h1 className="font-serif text-4xl font-bold text-gray-900 mb-8">
                    Data Migration Check
                </h1>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                    <h2 className="font-semibold text-yellow-900 mb-2">⚠️ Important</h2>
                    <p className="text-yellow-800 mb-4">
                        This tool checks if your events and posts are using the new storage-based schema.
                    </p>
                    <p className="text-yellow-800">
                        Events created before the schema update won't have a <code className="bg-yellow-100 px-1 rounded">content_url</code> field and will need to be recreated.
                    </p>
                </div>

                <button
                    onClick={migrateData}
                    disabled={migrating}
                    className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50 mb-6"
                >
                    {migrating ? 'Checking...' : 'Check Database'}
                </button>

                {result && (
                    <div className="bg-gray-900 text-green-400 p-6 rounded-lg font-mono text-sm whitespace-pre-wrap overflow-auto">
                        {result}
                    </div>
                )}

                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <h2 className="font-semibold text-blue-900 mb-2">📝 How to Fix</h2>
                    <ol className="text-blue-800 space-y-2 list-decimal list-inside">
                        <li>Delete the old event (it doesn't have a valid content_url)</li>
                        <li>Go to Events Management</li>
                        <li>Create a new event with the same information</li>
                        <li>The new event will automatically store markdown in Supabase Storage</li>
                    </ol>
                </div>
            </div>
        </AdminLayout>
    );
}
