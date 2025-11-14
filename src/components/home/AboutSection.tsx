'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutSection() {
    return (
        <section className="bg-white py-20">
            <div className="max-w-[1244px] mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-12 py-6"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                                    SOBRE A COMUNIDADE
                                </p>
                                <h2 className="font-montserrat text-[46px] leading-[1.22] font-semibold text-[#002F34]">
                                    Nossa missão é fazer<br />
                                    a fé transformar vidas.
                                </h2>
                            </div>
                            <div className="flex flex-col gap-4 max-w-[682px]">
                                <p className="text-base text-[#002F34] leading-[1.2]">
                                    Acreditamos que a fé vai além das palavras e se torna uma força poderosa de mudança. Nosso propósito é aplicar os ensinamentos de Cristo de forma prática e relevante no dia a dia. Queremos equipar e inspirar você a viver o potencial que Deus lhe deu. Junte-se a nós e veja como uma fé ativa pode construir um futuro com mais esperança.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/about"
                            className="inline-flex items-center justify-center gap-6 px-6 h-14 border border-[#009CA3] rounded-lg font-montserrat text-base font-semibold text-[#0D4E54] hover:bg-[#009CA3]/5 transition-colors w-fit"
                        >
                            Conheça nossa história
                            <div className="w-8 h-8 flex items-center justify-center">
                                <svg width="43" height="43" viewBox="0 0 43 43" fill="none">
                                    <path d="M2.83 2.83L36.78 36.78" stroke="#02B0B5" strokeWidth="2"/>
                                    <path d="M36.78 2.83L36.78 36.78L2.83 36.78" stroke="#02B0B5" strokeWidth="2"/>
                                </svg>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="relative p-8 pr-0 pb-8"
                    >
                        <div className="w-full h-[357px] rounded-lg overflow-hidden">
                            <img
                                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=600&h=400&fit=crop"
                                alt="Sobre a comunidade"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
