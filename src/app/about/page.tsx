'use client';

import { AboutResources } from '@/lib/resources';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-white py-12 sm:py-16 lg:py-20">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-6 max-w-4xl"
                    >
                        <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                            SOBRE NÓS
                        </p>
                        <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] font-semibold text-[#002F34]">
                            {AboutResources.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-[#002F34]/80 leading-relaxed max-w-3xl">
                            {AboutResources.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-[#EFFEFD]">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&h=500&fit=crop"
                                alt="Nossa história"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex flex-col gap-6"
                        >
                            <div className="flex flex-col gap-2">
                                <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                                    NOSSA JORNADA
                                </p>
                                <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-[46px] leading-[1.22] font-semibold text-[#002F34]">
                                    {AboutResources.history.title}
                                </h2>
                            </div>
                            <div className="flex flex-col gap-4 text-base sm:text-lg text-[#002F34]/80 leading-relaxed">
                                <p>{AboutResources.history.description}</p>
                                <p>
                                    Ao longo dos anos, crescemos como uma comunidade vibrante que celebra a diversidade,
                                    abraça a compaixão e busca causar um impacto positivo em nosso mundo.
                                </p>
                                <p>
                                    Hoje, Ebenézer se destaca como um farol de esperança e luz, comprometido em servir nossa
                                    comunidade com amor, graça e humildade.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-2 text-center max-w-3xl mx-auto">
                            <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                                NOSSOS VALORES
                            </p>
                            <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-[46px] leading-[1.22] font-semibold text-[#002F34]">
                                {AboutResources.mission.title}
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-8">
                            {AboutResources.values.items.map((value, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-[#EFFEFD] p-6 lg:p-8 rounded-2xl flex flex-col gap-4"
                                >
                                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                                        <svg className="w-8 h-8 text-[#009CA3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {index === 0 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />}
                                            {index === 1 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />}
                                            {index === 2 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />}
                                            {index === 3 && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                                        </svg>
                                    </div>
                                    <h3 className="font-montserrat text-xl sm:text-2xl font-semibold text-[#002F34]">
                                        {value.title}
                                    </h3>
                                    <p className="text-base text-[#002F34]/80 leading-relaxed">
                                        {value.description}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-12 sm:py-16 lg:py-20 bg-[#EFFEFD]">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center flex flex-col gap-8 items-center"
                    >
                        <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-[46px] leading-[1.22] font-semibold text-[#002F34] max-w-3xl">
                            Faça parte da nossa jornada
                        </h2>
                        <p className="text-lg sm:text-xl text-[#002F34]/80 max-w-2xl leading-relaxed">
                            Venha conhecer a nossa comunidade e descobrir como você pode crescer espiritualmente
                            e fazer a diferença na vida de outras pessoas.
                        </p>
                        <Link
                            href="/events"
                            className="inline-flex items-center justify-center gap-6 px-8 h-14 bg-[#009CA3] rounded-lg font-montserrat text-base font-semibold text-white hover:bg-[#047A81] transition-colors"
                        >
                            Conheça nossos eventos
                            <div className="w-5 h-5 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 43 43" fill="none">
                                    <path d="M2.83 2.83L36.78 36.78" stroke="white" strokeWidth="2" />
                                    <path d="M36.78 2.83L36.78 36.78L2.83 36.78" stroke="white" strokeWidth="2" />
                                </svg>
                            </div>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
