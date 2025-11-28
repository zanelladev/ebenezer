"use client"

import { DonateResources } from "@/lib/resources"
import { motion } from "framer-motion"
import { Building2, CreditCard, HandHeart, MapPin, QrCode, Users } from "lucide-react"

export default function DonatePage() {
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
              <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">Contribua</p>
            </div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance">
              {DonateResources.title}
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{DonateResources.subtitle}</p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                  Por que doar?
                </p>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                {DonateResources.introduction.title}
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                {DonateResources.introduction.description}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {DonateResources.why.items.map((item, index) => {
                const icons = [Users, HandHeart, Building2]
                const Icon = icons[index % icons.length]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-card border border-border p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-display text-xl font-semibold text-foreground mb-3">{item.title}</h4>
                    <p className="text-base text-muted-foreground leading-relaxed">{item.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Donation Methods */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-12"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                  Formas de Contribuir
                </p>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                {DonateResources.methods.title}
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-card border border-border p-8 rounded-2xl flex flex-col gap-5 shadow-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <QrCode className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display text-xl font-semibold text-foreground">
                  {DonateResources.methods.pix.title}
                </h4>
                <p className="text-base text-muted-foreground">{DonateResources.methods.pix.description}</p>
                <p className="text-primary font-mono font-bold text-sm break-all bg-primary/5 p-4 rounded-xl">
                  {DonateResources.methods.pix.key}
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-card border border-border p-8 rounded-2xl flex flex-col gap-5 shadow-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display text-xl font-semibold text-foreground">
                  {DonateResources.methods.bank.title}
                </h4>
                <div className="space-y-2 text-base text-muted-foreground">
                  <p>
                    <span className="font-semibold text-foreground">{DonateResources.methods.bank.bank}:</span> Banco do
                    Brasil
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">{DonateResources.methods.bank.agency}:</span> 1234-5
                  </p>
                  <p>
                    <span className="font-semibold text-foreground">{DonateResources.methods.bank.account}:</span>{" "}
                    67890-1
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-card border border-border p-8 rounded-2xl flex flex-col gap-5 shadow-lg"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display text-xl font-semibold text-foreground">
                  {DonateResources.methods.inPerson.title}
                </h4>
                <p className="text-base text-muted-foreground">{DonateResources.methods.inPerson.description}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact & Thank You Section */}
      <section className="py-16 lg:py-24 bg-accent/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center flex flex-col gap-10 bg-card border border-border p-12 sm:p-16 rounded-3xl shadow-2xl"
          >
            <div className="flex flex-col gap-5">
              <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
                {DonateResources.impact.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {DonateResources.impact.description}
              </p>
            </div>
            <div className="flex flex-col gap-5 pt-8 border-t border-border">
              <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                {DonateResources.thanks.title}
              </h3>
              <p className="text-lg text-muted-foreground">{DonateResources.thanks.message}</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
