'use client';

import { AboutResources } from '@/lib/resources';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-50 to-warm-100 py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="font-serif text-5xl sm:text-6xl font-bold text-gray-900 mb-6">
                            {AboutResources.title}
                        </h1>
                        <p className="text-xl text-gray-700">
                            {AboutResources.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif text-4xl font-bold text-gray-900 mb-6">
                            {AboutResources.history.title}
                        </h2>
                        <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
                            <p>
                                {AboutResources.history.description}
                            </p>
                            <p>
                                Ao longo dos anos, crescemos como uma comunidade vibrante que celebra a diversidade,
                                abraça a compaixão e busca causar um impacto positivo em nosso mundo. Acreditamos
                                que a fé não se limita ao que acontece dentro de nossas paredes, mas como vivemos
                                nossos valores no dia a dia.
                            </p>
                            <p>
                                Hoje, Ebenézer se destaca como um farol de esperança e luz, comprometido em servir nossa
                                comunidade com amor, graça e humildade. Convidamos você a se juntar a nós nesta jornada
                                de fé e descobrir o poder transformador de pertencer.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-warm-50">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif text-4xl font-bold text-gray-900 mb-8 text-center">
                            {AboutResources.mission.title}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                            {AboutResources.values.items.map((value, index) => (
                                <div key={index} className="bg-white p-8 rounded-xl shadow-lg">
                                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                                        <svg className="w-8 h-8 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                                            {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                                            {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />}
                                            {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                                        </svg>
                                    </div>
                                    <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3 text-center">
                                        {value.title}
                                    </h3>
                                    <p className="text-gray-600 text-center">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-20 bg-primary-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif text-4xl font-bold mb-6">
                            {AboutResources.values.title}
                        </h2>
                        <p className="text-xl mb-8 text-primary-50">
                            Adoraríamos conhecer você! Venha experimentar o que torna Ebenézer um lugar especial.
                        </p>
                        <Link
                            href="/events"
                            className="inline-block bg-white text-primary-600 px-8 py-4 rounded-lg hover:bg-primary-50 transition-colors font-medium text-lg"
                        >
                            Explore Nossos Eventos
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
