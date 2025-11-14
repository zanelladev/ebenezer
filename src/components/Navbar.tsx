'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Início', href: '/' },
        { name: 'Sobre nós', href: '/about' },
        { name: 'Eventos', href: '/events' },
        { name: 'Blog', href: '/blog' },
    ];

    const isActive = (href: string) => {
        if (href === '/') {
            return pathname === '/';
        }
        return pathname.startsWith(href);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3' : 'py-4'}`}>
            <div className="max-w-[1244px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`rounded-2xl transition-all duration-300 ${
                    scrolled 
                        ? 'bg-white/90 backdrop-blur-md shadow-lg' 
                        : 'bg-white shadow-sm'
                }`}>
                    <div className="flex justify-between items-center lg:gap-[130px] px-4 sm:px-6 h-16 sm:h-20">
                        {/* Logo */}
                        <Link href="/" className="flex-shrink-0">
                            <Image
                                src="/assets/Logo.svg"
                                alt="Comunidade Ebenezer"
                                width={192}
                                height={48}
                                className="w-32 h-8 sm:w-40 sm:h-10 lg:w-48 lg:h-12"
                                priority
                            />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-7">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className={`font-montserrat text-base font-normal transition-colors hover:text-black ${
                                        isActive(item.href)
                                            ? 'font-semibold text-black'
                                            : 'text-black/60'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <Link
                                href="/donate"
                                className="font-montserrat font-semibold text-base text-white bg-[#009CA3] hover:bg-[#008891] transition-colors px-6 h-[43px] flex items-center justify-center rounded-lg"
                            >
                                Contribua
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                            aria-label="Toggle menu"
                        >
                            <svg
                                className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="lg:hidden border-t border-gray-100"
                            >
                                <div className="px-4 py-4 space-y-2">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`block px-4 py-2.5 font-montserrat text-base font-normal rounded-lg transition-colors hover:text-black hover:bg-gray-50 ${
                                                isActive(item.href)
                                                    ? 'font-semibold text-black bg-gray-100'
                                                    : 'text-black/60'
                                            }`}
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                    <Link
                                        href="/donate"
                                        onClick={() => setIsOpen(false)}
                                        className="block text-center mt-3 font-montserrat font-semibold text-base text-white bg-[#009CA3] hover:bg-[#008891] px-4 py-2.5 rounded-lg transition-colors"
                                    >
                                        Contribua
                                    </Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </nav>
    );
}
