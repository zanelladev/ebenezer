'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { LiaCalendarAltSolid, LiaClockSolid, LiaMapMarkerSolid } from 'react-icons/lia';

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    image_url?: string;
}

interface EventsSectionProps {
    events: Event[];
}

export default function EventsSection({ events }: EventsSectionProps) {
    const displayEvents = events.slice(0, 2);

    return (
        <section className="bg-[#EFFEFD] py-16">
            <div className="max-w-[1244px] mx-auto px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row justify-center items-end gap-16">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-12 py-6 flex-1"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                                    EVENTOS FUTUROS
                                </p>
                                <h2 className="font-montserrat text-[46px] leading-[1.22] font-semibold text-[#002F34]">
                                    Fortaleça sua fé em<br />
                                    um ambiente de união.
                                </h2>
                            </div>
                            <div className="flex flex-col gap-4">
                                <p className="text-base text-[#002F34] leading-[1.2]">
                                    Acreditamos que o crescimento espiritual acontece quando caminhamos juntos. Por isso, cada encontro, palestra ou celebração é pensado como uma ponte para conectar você mais profundamente com Deus e com a nossa comunidade. São momentos criados para inspirar, fortalecer sua jornada e construir laços verdadeiros.
                                </p>
                            </div>
                        </div>
                        <Link
                            href="/events"
                            className="inline-flex items-center justify-center gap-6 px-6 h-14 bg-[#009CA3] rounded-lg font-montserrat text-base font-semibold text-[#EFFEFD] hover:bg-[#047A81] transition-colors w-fit"
                        >
                            Visualizar todos os eventos
                            <div className="w-5 h-5 flex items-center justify-center">
                                <svg width="20" height="20" viewBox="0 0 43 43" fill="none">
                                    <path d="M2.83 2.83L36.78 36.78" stroke="#EFFEFD" strokeWidth="2" />
                                    <path d="M36.78 2.83L36.78 36.78L2.83 36.78" stroke="#EFFEFD" strokeWidth="2" />
                                </svg>
                            </div>
                        </Link>
                    </motion.div>

                    {/* Right Events Cards */}
                    <div className="flex flex-col lg:flex-row gap-6 flex-1">
                        {displayEvents.map((event, index) => (
                            <motion.div
                                key={event.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col lg:flex-row gap-8 flex-1"
                            >
                                <div className="flex flex-col gap-3 flex-1">
                                    <h3 className="font-montserrat text-xl font-medium text-[#002F34]">
                                        {event.title}
                                    </h3>
                                    <div className="w-full h-[200px] rounded-lg overflow-hidden">
                                        <img
                                            src={event.image_url || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=400&h=200&fit=crop"}
                                            alt={event.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-4">
                                            <LiaCalendarAltSolid className="w-6 h-6 text-[#0D4E54]/80" />
                                            <span className="text-base text-[#0D4E54]/80">
                                                {new Date(event.date).toLocaleDateString('pt-BR')}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <LiaClockSolid className="w-6 h-6 text-[#0D4E54]/80" />
                                            <span className="text-base text-[#0D4E54]/80">{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <LiaMapMarkerSolid className="w-6 h-6 text-[#0D4E54]/80" />
                                            <span className="text-base text-[#0D4E54]/80">{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                        {displayEvents.length === 0 && (
                            <div className="flex-1 flex items-center justify-center text-gray-500">
                                Nenhum evento futuro disponível
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
