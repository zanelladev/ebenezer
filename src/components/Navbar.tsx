"use client"

import { NavbarResources } from "@/lib/resources"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { name: "Início", href: "/" },
    { name: "Sobre nós", href: "/about" },
    { name: "Eventos", href: "/events" },
    { name: "Blog", href: "/blog" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-4"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={`rounded-2xl transition-all duration-500 ${scrolled ? "bg-card/95 backdrop-blur-lg shadow-xl border border-border" : "bg-card shadow-md"
            }`}
        >
          <div className="flex justify-between items-center gap-8 px-6 h-20">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 group">
              <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                <Image
                  src="/assets/Logo.svg"
                  alt={NavbarResources.logoAlt}
                  width={192}
                  height={48}
                  className="w-40 h-10 lg:w-48 lg:h-12 transition-opacity group-hover:opacity-80"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-4 py-2 font-display text-base font-medium rounded-lg transition-all duration-300 hover:bg-secondary ${isActive(item.href) ? "text-primary" : "text-foreground/70 hover:text-foreground"
                    }`}
                >
                  {item.name}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/donate"
                className="group relative font-display font-semibold text-base text-primary-foreground bg-primary hover:bg-primary/90 transition-all duration-300 px-6 h-11 flex items-center justify-center rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:scale-105"
              >
                <span className="relative z-10">{NavbarResources.donateButton}</span>
                <motion.div
                  className="absolute inset-0 bg-foreground/10"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-xl hover:bg-secondary transition-all duration-300 flex-shrink-0"
              aria-label={NavbarResources.toggleMenu}
            >
              <motion.svg
                className="w-6 h-6 text-foreground"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
                animate={isOpen ? "open" : "closed"}
              >
                {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </motion.svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="lg:hidden border-t border-border"
              >
                <div className="px-4 py-4 space-y-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 font-display text-base font-medium rounded-xl transition-all duration-300 ${isActive(item.href)
                            ? "text-primary bg-secondary"
                            : "text-foreground/70 hover:text-foreground hover:bg-secondary"
                          }`}
                      >
                        {item.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: navItems.length * 0.1 }}
                  >
                    <Link
                      href="/donate"
                      onClick={() => setIsOpen(false)}
                      className="block text-center mt-4 font-display font-semibold text-base text-primary-foreground bg-primary hover:bg-primary/90 px-4 py-3 rounded-xl transition-all duration-300 shadow-lg"
                    >
                      Contribua
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </nav>
  )
}
