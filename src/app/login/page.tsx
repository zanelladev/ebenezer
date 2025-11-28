"use client"

import type React from "react"

import { LoginResources } from "@/lib/resources"
import { createClient } from "@/lib/supabase/client"
import { motion } from "framer-motion"
import { Lock, Mail } from "lucide-react"
import { useState } from "react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const supabase = createClient()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    } else {
      // Wait a moment for the session to be fully established
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Use window.location for a full page reload to ensure auth state is fresh
      window.location.href = "/admin"
    }
  }

  return (
    <div className="min-h-screen pt-24 bg-background flex items-center justify-center px-4">
      <div className="max-w-7xl w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-8"
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="h-1 w-12 bg-primary rounded-full"></div>
                <p className="font-display text-sm font-semibold text-primary uppercase tracking-wider">
                  Área Administrativa
                </p>
              </div>
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                {LoginResources.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">{LoginResources.subtitle}</p>
            </div>
          </motion.div>

          {/* Right Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-card border border-border rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 rounded-xl mb-6 text-sm"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="email" className="block font-display text-sm font-semibold text-foreground mb-2">
                  {LoginResources.form.email}
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-background border-2 border-input rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder={LoginResources.form.emailPlaceholder}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block font-display text-sm font-semibold text-foreground mb-2">
                  {LoginResources.form.password}
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-background border-2 border-input rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-foreground placeholder:text-muted-foreground"
                    placeholder={LoginResources.form.passwordPlaceholder}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl hover:bg-primary/90 transition-all duration-300 font-display font-semibold disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-[1.02]"
              >
                {loading ? LoginResources.form.loggingIn : LoginResources.form.submit}
              </button>
            </form>

            <p className="text-sm text-muted-foreground text-center mt-6">{LoginResources.info}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
