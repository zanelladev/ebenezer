'use client';

import { CommonResources, DateResources } from '@/lib/resources';
import { Database } from '@/lib/supabase/types';
import { motion } from 'framer-motion';
import Link from 'next/link';

type Post = Database['public']['Tables']['posts']['Row'];

export default function BlogCard({ post }: { post: Post }) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(DateResources.locale, DateResources.formats.short);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link href={`/blog/${post.id}`}>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow h-full flex flex-col group">
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="text-gray-500 text-sm mb-2">
                            {formatDate(post.created_at)} • {CommonResources.common.by} {post.author_name}
                        </div>
                        <h3 className="font-serif text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors">
                            {post.name}
                        </h3>
                        <div className="mt-4 text-primary-600 font-medium group-hover:underline">
                            {CommonResources.actions.readMore} →
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
