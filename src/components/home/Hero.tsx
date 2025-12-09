"use client"

import { motion } from "framer-motion"
import { Calendar, Clock, MapPin } from "lucide-react"

interface HeroProps {
  featuredEvent?: {
    title: string
    date: string
    time: string
    location: string
    image?: string
  } | null
}

export default function Hero({ featuredEvent }: HeroProps) {
  return (
    <section className="relative bg-background pt-32 pb-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col gap-10"
          >
            <div className="flex flex-col gap-6">
              <motion.h1
                className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Bem-vindo à Comunidade Ebenézer
              </motion.h1>
              <motion.p
                className="text-lg sm:text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Unimos fé, comunhão e amor. Encontre paz, esperança e conexão com Deus em nossos encontros. Junte-se a
                nós!
              </motion.p>
            </div>

            {/* Featured Event Card */}
            {featuredEvent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col gap-4 p-6 bg-card border border-border rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className="h-1 w-12 bg-primary rounded-full"></div>
                  <h3 className="font-display text-lg font-semibold text-foreground">Próximo evento</h3>
                </div>

                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="w-full sm:w-40 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-muted flex items-center justify-center">
                    {featuredEvent.image ? (
                      <img
                        src={featuredEvent.image || "/placeholder.svg"}
                        alt="Event preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <img src="/assets/Logo.svg" alt="Ebenézer Logo" className="w-32 h-8 object-contain opacity-50" />
                    )}
                  </div>
                  <div className="flex flex-col gap-3 flex-1">
                    <h4 className="font-display text-xl font-semibold text-foreground">{featuredEvent.title}</h4>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{featuredEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{featuredEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        <span className="text-sm">{featuredEvent.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative h-[400px] sm:h-[500px] lg:h-[600px] order-first lg:order-last"
          >
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1477414348463-c0eb7f1359b6?w=800&h=1000&fit=crop"
                alt="Igreja Ebenézer"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
