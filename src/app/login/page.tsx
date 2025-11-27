'use client';

import { LoginResources } from '@/lib/resources';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const supabase = createClient();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/admin');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen pt-20 bg-white flex items-center justify-center px-4">
            <div className="max-w-[1244px] w-full mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col gap-8"
                    >
                        <div className="flex flex-col gap-6">
                            <p className="font-lato text-base font-semibold text-[#047A81] uppercase tracking-wide">
                                ÁREA ADMINISTRATIVA
                            </p>
                            <h1 className="font-montserrat text-4xl sm:text-5xl lg:text-[64px] leading-[1.1] font-semibold text-[#002F34]">
                                {LoginResources.title}
                            </h1>
                            <p className="text-lg sm:text-xl text-[#002F34]/80 leading-relaxed">
                                {LoginResources.subtitle}
                            </p>
                        </div>
                    </motion.div>

                    {/* Right Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="bg-[#EFFEFD] rounded-2xl p-8 lg:p-12"
                    >
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6 text-sm">
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleLogin} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block font-montserrat text-sm font-semibold text-[#002F34] mb-2">
                                    {LoginResources.form.email}
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white border-2 border-[#009CA3]/20 rounded-lg focus:border-[#009CA3] focus:ring-2 focus:ring-[#009CA3]/20 transition-all text-[#002F34]"
                                    placeholder={LoginResources.form.emailPlaceholder}
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block font-montserrat text-sm font-semibold text-[#002F34] mb-2">
                                    {LoginResources.form.password}
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white border-2 border-[#009CA3]/20 rounded-lg focus:border-[#009CA3] focus:ring-2 focus:ring-[#009CA3]/20 transition-all text-[#002F34]"
                                    placeholder={LoginResources.form.passwordPlaceholder}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#009CA3] text-white py-4 rounded-lg hover:bg-[#047A81] transition-colors font-montserrat font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? LoginResources.form.loggingIn : LoginResources.form.submit}
                            </button>
                        </form>

                        <p className="text-sm text-[#002F34]/60 text-center mt-6">
                            {LoginResources.info}
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
