import { CommonResources, FooterResources } from '@/lib/resources';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* About */}
                    <div>
                        <h3 className="font-serif font-bold text-xl mb-4">Comunidade Ebenézer</h3>
                        <p className="text-gray-400 leading-relaxed">
                            {FooterResources.description}
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">{FooterResources.quickLinks.title}</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                                    {CommonResources.navigation.about}
                                </Link>
                            </li>
                            <li>
                                <Link href="/events" className="text-gray-400 hover:text-white transition-colors">
                                    {CommonResources.navigation.events}
                                </Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                                    {CommonResources.navigation.blog}
                                </Link>
                            </li>
                            <li>
                                <Link href="/donate" className="text-gray-400 hover:text-white transition-colors">
                                    {CommonResources.navigation.donate}
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="font-semibold text-lg mb-4">{FooterResources.contact.title}</h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>{FooterResources.contact.email}</li>
                            <li>{FooterResources.contact.phone}</li>
                            <li>{FooterResources.contact.address}</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
                    <p>{FooterResources.copyright}</p>
                </div>
            </div>
        </footer>
    );
}
