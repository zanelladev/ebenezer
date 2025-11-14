'use client';

import { CommonResources, DateResources } from '@/lib/resources';
import { Database } from '@/lib/supabase/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LiaClockSolid, LiaUserSolid } from 'react-icons/lia';

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
                    <div className="p-4 sm:p-6 flex-1 flex flex-col">
                        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-gray-500 text-xs sm:text-sm mb-3">
                            <div className="flex items-center gap-1">
                                <LiaClockSolid className="w-4 h-4" />
                                <span>{formatDate(post.created_at)}</span>
                            </div>
                            <span className="hidden sm:inline">•</span>
                            <div className="flex items-center gap-1">
                                <LiaUserSolid className="w-4 h-4" />
                                <span className="line-clamp-1">{post.author_name}</span>
                            </div>
                        </div>
                        <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 flex-1">
                            {post.name}
                        </h3>
                        <div className="mt-auto pt-2 text-primary-600 font-medium group-hover:underline text-sm sm:text-base">
                            {CommonResources.actions.readMore} →
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
