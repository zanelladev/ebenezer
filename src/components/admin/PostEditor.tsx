'use client';

import { AdminPostsResources } from '@/lib/resources';
import { fetchMarkdownContent, generateFilename, uploadMarkdownFile } from '@/lib/storage';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';
import '@uiw/react-markdown-preview/markdown.css';
import '@uiw/react-md-editor/markdown-editor.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

// Dynamic import for markdown editor
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

type Post = Database['public']['Tables']['posts']['Row'];
type PostInsert = Database['public']['Tables']['posts']['Insert'];

interface Props {
    post: Post | null;
    onSave: () => void;
    onCancel: () => void;
}

export default function PostEditor({ post, onSave, onCancel }: Props) {
    const [name, setName] = useState(post?.name || '');
    const [content, setContent] = useState('');
    const [authorName, setAuthorName] = useState(post?.author_name || '');
    const [saving, setSaving] = useState(false);
    const [loading, setLoading] = useState(false);
    const supabase = createClient();

    // Load existing markdown content if editing
    useEffect(() => {
        if (post?.content_url) {
            setLoading(true);
            fetchMarkdownContent(post.content_url).then(({ content: markdownContent, error }) => {
                if (!error && markdownContent) {
                    setContent(markdownContent);
                }
                setLoading(false);
            });
        }
    }, [post]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            // Generate filename and upload markdown content
            const filename = post?.content_url
                ? post.content_url.split('/').pop()?.replace('.md', '') || generateFilename(name)
                : generateFilename(name);

            const { url, error: uploadError } = await uploadMarkdownFile(content, 'posts', filename);

            if (uploadError || !url) {
                alert('Failed to upload markdown content');
                setSaving(false);
                return;
            }

            const postData: PostInsert = {
                name,
                content_url: url,
                author_name: authorName,
            };

            if (post) {
                // Update existing post
                const { error } = await supabase
                    .from('posts')
                    .update(postData)
                    .eq('id', post.id);

                if (!error) {
                    onSave();
                } else {
                    alert('Failed to save post');
                }
            } else {
                // Create new post
                const { error } = await supabase
                    .from('posts')
                    .insert([postData]);

                if (!error) {
                    onSave();
                } else {
                    alert('Failed to create post');
                }
            }
        } catch (error) {
            console.error('Error saving post:', error);
            alert('An error occurred while saving');
        }

        setSaving(false);
    };

    return (
        <div className="p-8 max-w-5xl mx-auto">
            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-8">
                {post ? AdminPostsResources.editor.titleEdit : AdminPostsResources.editor.titleNew}
            </h1>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-gray-600">{AdminPostsResources.editor.loading}</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {AdminPostsResources.editor.fields.title.label} *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder={AdminPostsResources.editor.fields.title.placeholder}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {AdminPostsResources.editor.fields.author.label} *
                        </label>
                        <input
                            type="text"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                            placeholder={AdminPostsResources.editor.fields.author.placeholder}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {AdminPostsResources.editor.fields.content.label} *
                        </label>
                        <div data-color-mode="light">
                            <MDEditor
                                value={content}
                                onChange={(val) => setContent(val || '')}
                                height={400}
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            {AdminPostsResources.editor.fields.content.info}
                        </p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="submit"
                            disabled={saving}
                            className="flex-1 bg-primary-600 text-white py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:opacity-50"
                        >
                            {saving ? AdminPostsResources.editor.actions.saving : AdminPostsResources.editor.actions.save}
                        </button>
                        <button
                            type="button"
                            onClick={onCancel}
                            disabled={saving}
                            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium disabled:opacity-50"
                        >
                            {AdminPostsResources.editor.actions.cancel}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}
