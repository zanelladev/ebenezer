import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[#002F34] text-white">
            <div className="w-full flex flex-col items-center gap-8 px-4 sm:px-6 lg:px-8 py-8 sm:py-10 lg:py-12">
                {/* Main Footer Content */}
                <div className="w-full max-w-[1244px]">
                    <div className="flex flex-col lg:flex-row gap-12 sm:gap-16 lg:gap-80">
                        {/* Left Section - Logo & Description */}
                        <div className="flex flex-col gap-4 sm:gap-6">
                            <div className="w-48 sm:w-60 lg:w-72 h-auto">
                                <Image
                                    src="/assets/Logo.svg"
                                    alt="Comunidade Ebenezer"
                                    width={288}
                                    height={72}
                                    className="w-full h-full brightness-0 invert"
                                />
                            </div>
                            <p className="font-montserrat text-sm sm:text-base font-normal leading-[1.4] sm:leading-[1.219]">
                                Um lugar de fé e esperança, onde<br />
                                cada passo é guiado pelo amor de Deus.
                            </p>
                            {/* Social Media Icons */}
                            <div className="flex items-center gap-2">
                                <a 
                                    href="https://www.facebook.com" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
                                    aria-label="Facebook"
                                >
                                    <FaFacebookF className="w-4 h-4 text-white" />
                                </a>
                                <a 
                                    href="https://www.instagram.com" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="w-4 h-4 text-white" />
                                </a>
                                <a 
                                    href="https://wa.me/5547933763625" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-6 h-6 flex items-center justify-center hover:opacity-80 transition-opacity"
                                    aria-label="WhatsApp"
                                >
                                    <FaWhatsapp className="w-4 h-4 text-white" />
                                </a>
                            </div>
                        </div>

                        {/* Right Section - Links & Contact */}
                        <div className="flex flex-col sm:flex-row gap-8 sm:gap-10 lg:gap-40 flex-1">
                            {/* Links úteis */}
                            <div className="flex flex-col gap-4 sm:gap-6 w-28">
                                <h3 className="font-montserrat text-lg sm:text-xl font-semibold leading-[1.219]">
                                    Links úteis
                                </h3>
                                <div className="flex flex-col gap-3 sm:gap-4">
                                    <Link href="/" className="font-montserrat text-sm sm:text-base font-normal leading-[1.219] hover:opacity-80 transition-opacity">
                                        Home
                                    </Link>
                                    <Link href="/about" className="font-montserrat text-sm sm:text-base font-normal leading-[1.219] hover:opacity-80 transition-opacity">
                                        Sobre nós
                                    </Link>
                                    <Link href="/events" className="font-montserrat text-sm sm:text-base font-normal leading-[1.219] hover:opacity-80 transition-opacity">
                                        Eventos
                                    </Link>
                                    <Link href="/blog" className="font-montserrat text-sm sm:text-base font-normal leading-[1.219] hover:opacity-80 transition-opacity">
                                        Blog
                                    </Link>
                                </div>
                            </div>

                            {/* Contato */}
                            <div className="flex flex-col gap-4 sm:gap-6 flex-1">
                                <h3 className="font-montserrat text-lg sm:text-xl font-semibold leading-[1.219]">
                                    Contato
                                </h3>
                                <div className="flex flex-col gap-3 sm:gap-4">
                                    <p className="font-montserrat text-sm sm:text-base font-normal leading-[1.219]">
                                        contato@ielb.com.br
                                    </p>
                                    <p className="font-montserrat text-sm sm:text-base font-normal leading-[1.219]">
                                        +55 (47) 3376-3625
                                    </p>
                                    <p className="font-montserrat text-sm sm:text-base font-normal leading-[1.219]">
                                        R. Concórdia, 105 - Barra do Rio Cerro,<br />
                                        Jaraguá do Sul - SC
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="w-full max-w-[1244px] py-2.5">
                    <div className="w-full h-0 border-t-2 border-white/25"></div>
                </div>

                {/* Bottom Section - Copyright */}
                <div className="w-full max-w-[1244px]">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-90">
                        <p className="font-montserrat text-xs sm:text-sm lg:text-base font-medium leading-[1.4] sm:leading-[1.219]">
                            © IELB, Comunidade Ebenézer - CNPJ 83.784.260/0001-00 | Todos os direitos reservados
                        </p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 lg:gap-14">
                            <Link href="/terms" className="font-montserrat text-xs sm:text-sm lg:text-base font-medium leading-[1.219] hover:opacity-80 transition-opacity">
                                Termos e Condições
                            </Link>
                            <Link href="/privacy" className="font-montserrat text-xs sm:text-sm lg:text-base font-medium leading-[1.219] hover:opacity-80 transition-opacity">
                                Política de Privacidade
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
