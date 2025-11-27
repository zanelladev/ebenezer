'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LiaClockSolid, LiaUserSolid } from 'react-icons/lia';

interface Post {
    id: string;
    title: string;
    author: string;
    read_time?: number;
    image_url?: string;
}

interface BlogSectionProps {
    posts: Post[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
    const displayPosts = posts.slice(0, 3);

    return (
        <section className="bg-white py-16">
            <div className="max-w-[1244px] mx-auto px-6 lg:px-8">
                <div className="flex flex-col gap-6">
                    {/* Header */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                        <div className="flex flex-col gap-2 flex-1">
                            <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                                BLOG
                            </p>
                            <h2 className="font-montserrat text-[46px] leading-[1.22] font-semibold text-[#002F34]">
                                Mergulhe em reflexões<br />
                                que fortalecem a jornada.
                            </h2>
                        </div>
                        <Link
                            href="/blog"
                            className="inline-flex items-center justify-center gap-6 px-6 h-14 border border-[#009CA3] rounded-lg font-montserrat text-base font-semibold text-[#0D4E54] hover:bg-[#009CA3]/5 transition-colors"
                        >
                            Visualizar todos os eventos
                            <div className="w-8 h-8 flex items-center justify-center">
                                <svg width="43" height="43" viewBox="0 0 43 43" fill="none">
                                    <path d="M2.83 2.83L36.78 36.78" stroke="#02B0B5" strokeWidth="2" />
                                    <path d="M36.78 2.83L36.78 36.78L2.83 36.78" stroke="#02B0B5" strokeWidth="2" />
                                </svg>
                            </div>
                        </Link>
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
                        {displayPosts.map((post, index) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <Link href={`/blog/${post.id}`} className="flex flex-col gap-3 group">
                                    <div className="w-full h-[300px] rounded-lg overflow-hidden">
                                        <img
                                            src={post.image_url || "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=400&h=300&fit=crop"}
                                            alt={post.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="flex items-center gap-2">
                                            <LiaClockSolid className="w-4 h-4 text-[#0D4E54]/80" />
                                            <span className="text-xs text-[#0D4E54]/80">
                                                {post.read_time || 9} min
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <LiaUserSolid className="w-4 h-4 text-[#0D4E54]/80" />
                                            <span className="text-xs text-[#0D4E54]/80">
                                                {post.author || 'Pastor Marcos'}
                                            </span>
                                        </div>
                                    </div>
                                    <h3 className="font-montserrat text-xl font-medium text-[#002F34] group-hover:text-[#009CA3] transition-colors">
                                        {post.title}
                                    </h3>
                                </Link>
                            </motion.div>
                        ))}
                        {displayPosts.length === 0 && (
                            <div className="col-span-full flex items-center justify-center text-gray-500 py-12">
                                Nenhuma publicação disponível
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
