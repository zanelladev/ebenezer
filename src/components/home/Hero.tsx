'use client';

import { HomeResources } from '@/lib/resources';
import { motion } from 'framer-motion';

export default function Hero() {
    return (
        <section className="relative min-h-[600px] flex items-center bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                            {HomeResources.hero.title}
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            {HomeResources.hero.description}
                        </p>

                        {/* Featured Event Preview */}
                        <div className="bg-warm-50 rounded-xl p-6 border-l-4 border-primary-500">
                            <h3 className="text-sm font-semibold text-primary-700 mb-3">PRÓXIMO EVENTO</h3>
                            <div className="flex gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=120&h=120&fit=crop"
                                    alt="Event preview"
                                    className="w-24 h-24 object-cover rounded-lg"
                                />
                                <div className="flex-1">
                                    <h4 className="font-bold text-gray-900 mb-2">Retiro Ebenézer 2025</h4>
                                    <div className="space-y-1 text-sm text-gray-600">
                                        <p className="flex items-center gap-2">
                                            <span>📅</span> 15/07/2025
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span>🕐</span> A partir das 13:00
                                        </p>
                                        <p className="flex items-center gap-2">
                                            <span>📍</span> Salão social Comunidade Ebenézer
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Image with Decorative Overlay */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative">
                            {/* Decorative teal block */}
                            <div className="absolute -right-6 -bottom-6 w-48 h-48 bg-primary-500 rounded-tl-[80px] z-0"></div>

                            {/* Main image */}
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=600&h=700&fit=crop"
                                    alt="Igreja Ebenézer"
                                    className="w-full h-[500px] object-cover"
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
