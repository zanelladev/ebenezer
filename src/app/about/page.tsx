"use client"

import { AboutResources } from "@/lib/resources"
import { motion } from "framer-motion"
import { ArrowUpRight, Heart, Shield, Sun, Users } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const iconMap = [Heart, Users, Sun, Shield]

  return (
    <div className="pt-24">
      {/* Hero Section */}
      <section className="bg-background py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 max-w-4xl"
          >
            <div className="flex items-center gap-3">
              <div className="h-1 w-12 bg-primary rounded-full"></div>
              <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Sobre Nós</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              {AboutResources.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{AboutResources.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1438232992991-995b7058bbb3?w=700&h=500&fit=crop"
                alt="Nossa história"
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-primary rounded-full"></div>
                  <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                    Nossa Jornada
                  </p>
                </div>
                <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  {AboutResources.history.title}
                </h2>
              </div>
              <div className="flex flex-col gap-5 text-lg text-muted-foreground leading-relaxed">
                <p>{AboutResources.history.description}</p>
                <p>
                  Ao longo dos anos, crescemos como uma comunidade vibrante que celebra a diversidade, abraça a
                  compaixão e busca causar um impacto positivo em nosso mundo.
                </p>
                <p>
                  Hoje, Ebenézer se destaca como um farol de esperança e luz, comprometido em servir nossa comunidade
                  com amor, graça e humildade.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-16"
          >
            <div className="flex flex-col gap-4 text-center max-w-3xl mx-auto">
              <div className="flex items-center gap-3 justify-center">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                  Nossos Valores
                </p>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                {AboutResources.mission.title}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {AboutResources.values.items.map((value, index) => {
                const Icon = iconMap[index]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card border border-border p-8 rounded-2xl flex flex-col gap-5 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center">
                      <Icon className="w-7 h-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground">{value.title}</h3>
                    <p className="text-base text-muted-foreground leading-relaxed">{value.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 lg:py-24 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center flex flex-col gap-8 items-center"
          >
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground max-w-3xl leading-tight">
              Faça parte da nossa jornada
            </h2>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Venha conhecer a nossa comunidade e descobrir como você pode crescer espiritualmente e fazer a diferença
              na vida de outras pessoas.
            </p>
            <Link
              href="/events"
              className="group inline-flex items-center gap-3 px-8 py-4 bg-primary rounded-xl font-display text-base font-semibold text-primary-foreground hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Conheça nossos eventos
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
