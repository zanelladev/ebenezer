import Image from "next/image"
import Link from "next/link"
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background">
      <div className="w-full flex flex-col items-center gap-12 px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left Section - Logo & Description */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="w-56 h-auto">
                <Image
                  src="/assets/Logo.svg"
                  alt="Congregação Ebenézer"
                  width={224}
                  height={56}
                  className="w-full h-full brightness-0 invert"
                />
              </div>
              <p className="font-sans text-base leading-relaxed text-background/80 max-w-md">
                Um lugar de fé e esperança, onde cada passo é guiado pelo amor de Deus.
              </p>
              {/* Social Media Icons */}
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  aria-label="Facebook"
                >
                  <FaFacebookF className="w-4 h-4 text-background" />
                </a>
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  aria-label="Instagram"
                >
                  <FaInstagram className="w-4 h-4 text-background" />
                </a>
                <a
                  href="https://wa.me/5547933763625"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-background/10 hover:bg-background/20 backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  aria-label="WhatsApp"
                >
                  <FaWhatsapp className="w-4 h-4 text-background" />
                </a>
              </div>
            </div>

            {/* Right Section - Links & Contact */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-12">
              {/* Links úteis */}
              <div className="flex flex-col gap-6">
                <h3 className="font-display text-xl font-semibold text-background">Links úteis</h3>
                <div className="flex flex-col gap-3">
                  <Link
                    href="/"
                    className="font-sans text-base text-background/80 hover:text-background transition-colors duration-300 w-fit"
                  >
                    Home
                  </Link>
                  <Link
                    href="/about"
                    className="font-sans text-base text-background/80 hover:text-background transition-colors duration-300 w-fit"
                  >
                    Sobre nós
                  </Link>
                  <Link
                    href="/events"
                    className="font-sans text-base text-background/80 hover:text-background transition-colors duration-300 w-fit"
                  >
                    Eventos
                  </Link>
                  <Link
                    href="/blog"
                    className="font-sans text-base text-background/80 hover:text-background transition-colors duration-300 w-fit"
                  >
                    Blog
                  </Link>
                </div>
              </div>

              {/* Contato */}
              <div className="flex flex-col gap-6">
                <h3 className="font-display text-xl font-semibold text-background">Contato</h3>
                <div className="flex flex-col gap-3">
                  <a
                    href="mailto:contato@ielb.com.br"
                    className="font-sans text-base text-background/80 hover:text-background transition-colors duration-300 w-fit"
                  >
                    contato@ielb.com.br
                  </a>
                  <a
                    href="tel:+554733763625"
                    className="font-sans text-base text-background/80 hover:text-background transition-colors duration-300 w-fit"
                  >
                    +55 (47) 3376-3625
                  </a>
                  <p className="font-sans text-base text-background/80 leading-relaxed">
                    R. Concórdia, 105 - Barra do Rio Cerro,
                    <br />
                    Jaraguá do Sul - SC
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full max-w-7xl">
          <div className="w-full h-px bg-background/20"></div>
        </div>

        {/* Bottom Section - Copyright */}
        <div className="w-full max-w-7xl">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <p className="font-sans text-sm text-background/70 leading-relaxed">
              © {currentYear} IELB, Congregação Ebenézer - CNPJ 83.784.260/0001-00 | Todos os direitos reservados
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
              <Link
                href="/terms"
                className="font-sans text-sm text-background/70 hover:text-background transition-colors duration-300"
              >
                Termos e Condições
              </Link>
              <Link
                href="/privacy"
                className="font-sans text-sm text-background/70 hover:text-background transition-colors duration-300"
              >
                Política de Privacidade
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
