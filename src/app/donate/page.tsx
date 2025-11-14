'use client';

import { DonateResources } from '@/lib/resources';
import { motion } from 'framer-motion';

export default function DonatePage() {
    return (
        <div className="pt-20">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-primary-50 to-warm-100 py-12 sm:py-16 lg:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                            {DonateResources.title}
                        </h1>
                        <p className="text-base sm:text-lg lg:text-xl text-gray-700">
                            {DonateResources.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-12 sm:py-16 lg:py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-8 sm:mb-12">
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                                {DonateResources.introduction.title}
                            </h2>
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed mb-4 sm:mb-6">
                                {DonateResources.introduction.description}
                            </p>
                        </div>

                        <div className="mb-8 sm:mb-12">
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                                {DonateResources.why.title}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {DonateResources.why.items.map((item, index) => (
                                    <div key={index} className="bg-warm-50 p-4 sm:p-6 rounded-xl">
                                        <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{item.title}</h4>
                                        <p className="text-gray-600 text-sm sm:text-base">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Donation Methods */}
                        <div className="mb-8 sm:mb-12">
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">
                                {DonateResources.methods.title}
                            </h3>
                            <div className="space-y-4 sm:space-y-6">
                                <div className="bg-warm-50 p-4 sm:p-6 rounded-xl">
                                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{DonateResources.methods.pix.title}</h4>
                                    <p className="text-gray-600 mb-2 text-sm sm:text-base">{DonateResources.methods.pix.description}</p>
                                    <p className="text-primary-600 font-mono font-bold text-sm sm:text-base break-all">{DonateResources.methods.pix.key}</p>
                                </div>
                                <div className="bg-warm-50 p-4 sm:p-6 rounded-xl">
                                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{DonateResources.methods.bank.title}</h4>
                                    <p className="text-gray-600 text-sm sm:text-base">{DonateResources.methods.bank.bank}: Banco do Brasil</p>
                                    <p className="text-gray-600 text-sm sm:text-base">{DonateResources.methods.bank.agency}: 1234-5</p>
                                    <p className="text-gray-600 text-sm sm:text-base">{DonateResources.methods.bank.account}: 67890-1</p>
                                </div>
                                <div className="bg-warm-50 p-4 sm:p-6 rounded-xl">
                                    <h4 className="font-bold text-gray-900 mb-2 text-sm sm:text-base">{DonateResources.methods.inPerson.title}</h4>
                                    <p className="text-gray-600 text-sm sm:text-base">{DonateResources.methods.inPerson.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Impact Section */}
                        <div className="text-center bg-primary-50 p-6 sm:p-8 rounded-xl">
                            <h3 className="font-serif text-xl sm:text-2xl font-bold text-gray-900 mb-3 sm:mb-4">
                                {DonateResources.impact.title}
                            </h3>
                            <p className="text-base sm:text-lg text-gray-700">
                                {DonateResources.impact.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Thank You Section */}
            <section className="py-12 sm:py-16 lg:py-20 bg-primary-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                            {DonateResources.thanks.title}
                        </h2>
                        <p className="text-base sm:text-lg lg:text-xl text-primary-50">
                            {DonateResources.thanks.message}
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
