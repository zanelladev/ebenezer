'use client';

import { motion } from 'framer-motion';
import { LiaCalendarAltSolid, LiaClockSolid, LiaMapMarkerSolid } from 'react-icons/lia';

interface HeroProps {
    featuredEvent?: {
        title: string;
        date: string;
        time: string;
        location: string;
        image?: string;
    } | null;
}

export default function Hero({ featuredEvent }: HeroProps) {
    return (
        <section className="relative bg-white">
            <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[400px] sm:min-h-[500px] lg:min-h-[599px] py-8 sm:py-10 lg:py-12">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-8 lg:gap-16"
                    >
                        <div className="flex flex-col gap-6 lg:gap-8">
                            <div className="flex flex-col gap-4 lg:gap-5">
                                <h1 className="font-montserrat text-3xl sm:text-4xl md:text-5xl lg:text-[64px] leading-[1.1] lg:leading-[1] font-semibold text-[#002F34]">
                                    Bem-vindo à Comunidade Ebenézer
                                </h1>
                                <p className="text-base sm:text-lg lg:text-xl text-[#002F34]/80 leading-[1.4] lg:leading-[1.2] max-w-full lg:max-w-[618px]">
                                    Unimos fé, comunhão e amor. Encontre paz, esperança
                                    e conexão com Deus em nossos encontros. Junte-se a nós!
                                </p>
                            </div>
                        </div>

                        {/* Featured Event Preview */}
                        {featuredEvent && (
                            <div className="flex flex-col gap-3">
                                <h3 className="font-montserrat text-xl sm:text-2xl font-semibold text-[#002F34]">
                                    Próximo evento
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-6 sm:gap-10">
                                    <div className="w-full sm:w-[175px] h-[200px] sm:h-[137px] rounded-lg overflow-hidden flex-shrink-0">
                                        <img
                                            src={featuredEvent.image || "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=175&h=137&fit=crop"}
                                            alt="Event preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-3 sm:gap-4 flex-1">
                                        <h4 className="font-montserrat text-lg sm:text-xl font-medium text-[#002F34]">
                                            {featuredEvent.title}
                                        </h4>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <LiaCalendarAltSolid className="w-5 h-5 sm:w-6 sm:h-6 text-[#0D4E54]/80 flex-shrink-0" />
                                                <span className="text-sm sm:text-base text-[#0D4E54]/80">{featuredEvent.date}</span>
                                            </div>
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <LiaClockSolid className="w-5 h-5 sm:w-6 sm:h-6 text-[#0D4E54]/80 flex-shrink-0" />
                                                <span className="text-sm sm:text-base text-[#0D4E54]/80">{featuredEvent.time}</span>
                                            </div>
                                            <div className="flex items-center gap-3 sm:gap-4">
                                                <LiaMapMarkerSolid className="w-5 h-5 sm:w-6 sm:h-6 text-[#0D4E54]/80 flex-shrink-0" />
                                                <span className="text-sm sm:text-base text-[#0D4E54]/80">{featuredEvent.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Right Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative h-full min-h-[300px] sm:min-h-[400px] lg:min-h-[474px] order-first lg:order-last"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=600&h=700&fit=crop"
                            alt="Igreja Ebenézer"
                            className="w-full h-full object-cover rounded-2xl"
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
