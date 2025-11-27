'use client';

import { DonateResources } from '@/lib/resources';
import { motion } from 'framer-motion';

export default function DonatePage() {
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
                            CONTRIBUA
                        </p>
                        <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] font-semibold text-[#002F34]">
                            {DonateResources.title}
                        </h1>
                        <p className="text-lg sm:text-xl text-[#002F34]/80 leading-relaxed max-w-3xl">
                            {DonateResources.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 sm:py-16 lg:py-20 bg-[#EFFEFD]">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-12"
                    >
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-2">
                                <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                                    POR QUE DOAR?
                                </p>
                                <h2 className="font-montserrat text-3xl sm:text-4xl lg:text-[46px] leading-[1.22] font-semibold text-[#002F34]">
                                    {DonateResources.introduction.title}
                                </h2>
                            </div>
                            <p className="text-base sm:text-lg text-[#002F34]/80 leading-relaxed max-w-3xl">
                                {DonateResources.introduction.description}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {DonateResources.why.items.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    className="bg-white p-6 rounded-2xl"
                                >
                                    <h4 className="font-montserrat text-lg sm:text-xl font-semibold text-[#002F34] mb-3">{item.title}</h4>
                                    <p className="text-base text-[#002F34]/80 leading-relaxed">{item.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Donation Methods */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-2">
                            <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                                FORMAS DE CONTRIBUIR
                            </p>
                            <h3 className="font-montserrat text-3xl sm:text-4xl lg:text-[46px] leading-[1.22] font-semibold text-[#002F34]">
                                {DonateResources.methods.title}
                            </h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.1 }}
                                className="bg-[#EFFEFD] p-6 rounded-2xl flex flex-col gap-3"
                            >
                                <h4 className="font-montserrat text-xl font-semibold text-[#002F34]">{DonateResources.methods.pix.title}</h4>
                                <p className="text-base text-[#002F34]/80">{DonateResources.methods.pix.description}</p>
                                <p className="text-[#009CA3] font-mono font-bold text-sm break-all">{DonateResources.methods.pix.key}</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-[#EFFEFD] p-6 rounded-2xl flex flex-col gap-3"
                            >
                                <h4 className="font-montserrat text-xl font-semibold text-[#002F34]">{DonateResources.methods.bank.title}</h4>
                                <p className="text-base text-[#002F34]/80">{DonateResources.methods.bank.bank}: Banco do Brasil</p>
                                <p className="text-base text-[#002F34]/80">{DonateResources.methods.bank.agency}: 1234-5</p>
                                <p className="text-base text-[#002F34]/80">{DonateResources.methods.bank.account}: 67890-1</p>
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.3 }}
                                className="bg-[#EFFEFD] p-6 rounded-2xl flex flex-col gap-3"
                            >
                                <h4 className="font-montserrat text-xl font-semibold text-[#002F34]">{DonateResources.methods.inPerson.title}</h4>
                                <p className="text-base text-[#002F34]/80">{DonateResources.methods.inPerson.description}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Impact & Thank You Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-[#EFFEFD]">
                <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center flex flex-col gap-8 bg-white p-8 sm:p-12 rounded-2xl"
                    >
                        <div className="flex flex-col gap-4">
                            <h3 className="font-montserrat text-3xl sm:text-4xl font-semibold text-[#002F34]">
                                {DonateResources.impact.title}
                            </h3>
                            <p className="text-base sm:text-lg text-[#002F34]/80 leading-relaxed max-w-2xl mx-auto">
                                {DonateResources.impact.description}
                            </p>
                        </div>
                        <div className="flex flex-col gap-4 pt-6 border-t border-[#002F34]/10">
                            <h3 className="font-montserrat text-2xl sm:text-3xl font-semibold text-[#002F34]">
                                {DonateResources.thanks.title}
                            </h3>
                            <p className="text-base sm:text-lg text-[#002F34]/80">
                                {DonateResources.thanks.message}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
