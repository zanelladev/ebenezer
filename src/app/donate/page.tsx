'use client';

import { DonateResources } from '@/lib/resources';
import { motion } from 'framer-motion';

export default function DonatePage() {
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
                            {DonateResources.title}
                        </h1>
                        <p className="text-xl text-gray-700">
                            {DonateResources.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main Content */}
            <section className="py-20 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="mb-12">
                            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-6">
                                {DonateResources.introduction.title}
                            </h2>
                            <p className="text-lg text-gray-700 leading-relaxed mb-6">
                                {DonateResources.introduction.description}
                            </p>
                        </div>

                        <div className="mb-12">
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                                {DonateResources.why.title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {DonateResources.why.items.map((item, index) => (
                                    <div key={index} className="bg-warm-50 p-6 rounded-xl">
                                        <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                                        <p className="text-gray-600">{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Donation Methods */}
                        <div className="mb-12">
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                                {DonateResources.methods.title}
                            </h3>
                            <div className="space-y-6">
                                <div className="bg-warm-50 p-6 rounded-xl">
                                    <h4 className="font-bold text-gray-900 mb-2">{DonateResources.methods.pix.title}</h4>
                                    <p className="text-gray-600 mb-2">{DonateResources.methods.pix.description}</p>
                                    <p className="text-primary-600 font-mono font-bold">{DonateResources.methods.pix.key}</p>
                                </div>
                                <div className="bg-warm-50 p-6 rounded-xl">
                                    <h4 className="font-bold text-gray-900 mb-2">{DonateResources.methods.bank.title}</h4>
                                    <p className="text-gray-600">{DonateResources.methods.bank.bank}: Banco do Brasil</p>
                                    <p className="text-gray-600">{DonateResources.methods.bank.agency}: 1234-5</p>
                                    <p className="text-gray-600">{DonateResources.methods.bank.account}: 67890-1</p>
                                </div>
                                <div className="bg-warm-50 p-6 rounded-xl">
                                    <h4 className="font-bold text-gray-900 mb-2">{DonateResources.methods.inPerson.title}</h4>
                                    <p className="text-gray-600">{DonateResources.methods.inPerson.description}</p>
                                </div>
                            </div>
                        </div>

                        {/* Impact Section */}
                        <div className="text-center bg-primary-50 p-8 rounded-xl">
                            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                                {DonateResources.impact.title}
                            </h3>
                            <p className="text-lg text-gray-700">
                                {DonateResources.impact.description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Thank You Section */}
            <section className="py-20 bg-primary-600 text-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="font-serif text-4xl font-bold mb-6">
                            {DonateResources.thanks.title}
                        </h2>
                        <p className="text-xl text-primary-50">
                            {DonateResources.thanks.message}
                        </p>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
