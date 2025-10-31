'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import PostEditor from '@/components/admin/PostEditor';
import { deleteMarkdownFile } from '@/lib/storage';
import { createClient } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';
import { useEffect, useState } from 'react';

type Post = Database['public']['Tables']['posts']['Row'];

export default function AdminPostsPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingPost, setEditingPost] = useState<Post | null>(null);
    const [isCreating, setIsCreating] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data } = await supabase
            .from('posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (data) setPosts(data);
        setLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        // Find the post to get its content_url
        const postToDelete = posts.find(p => p.id === id);

        // Delete from database
        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (!error) {
            // Delete markdown file from storage
            if (postToDelete?.content_url) {
                await deleteMarkdownFile(postToDelete.content_url);
            }
            fetchPosts();
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (isCreating || editingPost) {
        return (
            <AdminLayout>
                <PostEditor
                    post={editingPost}
                    onSave={() => {
                        setIsCreating(false);
                        setEditingPost(null);
                        fetchPosts();
                    }}
                    onCancel={() => {
                        setIsCreating(false);
                        setEditingPost(null);
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
                        Blog Posts Management
                    </h1>
                    <button
                        onClick={() => setIsCreating(true)}
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                        + Create Post
                    </button>
                </div>

                {loading ? (
                    <p className="text-gray-600">Loading posts...</p>
                ) : posts.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl">
                        <p className="text-gray-600 mb-4">No blog posts yet</p>
                        <button
                            onClick={() => setIsCreating(true)}
                            className="text-primary-600 hover:underline font-medium"
                        >
                            Create your first post
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {posts.map((post) => (
                            <div
                                key={post.id}
                                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                            >
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                                            {post.name}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-2">
                                            {formatDate(post.created_at)} • By {post.author_name}
                                        </p>
                                    </div>
                                    <div className="flex gap-2 ml-4">
                                        <button
                                            onClick={() => setEditingPost(post)}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(post.id)}
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
