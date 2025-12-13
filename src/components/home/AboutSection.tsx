"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="bg-secondary/30 py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                  Sobre a Comunidade
                </p>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Nossa missão é fazer a fé transformar vidas
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Acreditamos que a fé vai além das palavras e se torna uma força poderosa de mudança. Nosso propósito é
                aplicar os ensinamentos de Cristo de forma prática e relevante no dia a dia. Queremos equipar e inspirar
                você a viver o potencial que Deus lhe deu.
              </p>
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 px-8 py-4 border-2 border-primary rounded-xl font-display text-base font-semibold text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 w-fit shadow-lg hover:shadow-xl hover:scale-105"
            >
              Conheça nossa história
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/assets/about_community.jpg"
                alt="Sobre a comunidade"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
