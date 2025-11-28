"use client"

import { AdminDashboardResources } from "@/lib/resources"
import Link from "next/link"
import { motion } from "framer-motion"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function AdminDashboard() {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto">
      {/* Logo and action buttons at top of page content */}
      <div className="flex items-center justify-between mb-12">
        <Link href="/admin" className="group">
          <Image
            src="/assets/Logo.svg"
            alt="Ebenezer Logo"
            width={56}
            height={56}
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-[#002F34] hover:text-[#009CA3] hover:bg-[#EFFEFD] rounded-lg transition-all font-montserrat font-medium text-sm shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
              />
            </svg>
            Visit Site
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-50 font-montserrat font-medium text-sm shadow-sm"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            {isLoggingOut ? "Logging out..." : "Logout"}
          </button>
        </div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="flex flex-col gap-3 mb-2">
          <div className="inline-flex items-center gap-2">
            <div className="h-1 w-12 bg-[#009CA3] rounded-full"></div>
            <p className="font-lato text-sm font-semibold text-[#047A81] uppercase tracking-wider">
              BEM-VINDO AO PAINEL
            </p>
          </div>
          <h1 className="font-montserrat text-4xl lg:text-5xl font-bold text-[#002F34]">
            {AdminDashboardResources.title}
          </h1>
        </div>
        <p className="text-lg text-[#002F34]/70 max-w-2xl leading-relaxed">{AdminDashboardResources.welcome}</p>
      </motion.div>

      {/* Stats Overview */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12"
      >
        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-[#EFFEFD] to-white p-6 rounded-xl border border-[#009CA3]/10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#009CA3]/10 rounded-lg flex items-center justify-center">
              <span className="text-xl">📅</span>
            </div>
            <p className="text-sm font-medium text-[#002F34]/60">Total Events</p>
          </div>
          <p className="text-3xl font-bold text-[#002F34]">--</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-[#EFFEFD] to-white p-6 rounded-xl border border-[#009CA3]/10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#009CA3]/10 rounded-lg flex items-center justify-center">
              <span className="text-xl">📝</span>
            </div>
            <p className="text-sm font-medium text-[#002F34]/60">Blog Posts</p>
          </div>
          <p className="text-3xl font-bold text-[#002F34]">--</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gradient-to-br from-[#EFFEFD] to-white p-6 rounded-xl border border-[#009CA3]/10"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-[#009CA3]/10 rounded-lg flex items-center justify-center">
              <span className="text-xl">✨</span>
            </div>
            <p className="text-sm font-medium text-[#002F34]/60">Active</p>
          </div>
          <p className="text-3xl font-bold text-[#002F34]">--</p>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="font-montserrat text-2xl font-semibold text-[#002F34] mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/admin/events"
            className="group relative bg-white p-8 rounded-2xl border-2 border-[#009CA3]/10 hover:border-[#009CA3] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#EFFEFD] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-[#009CA3]/10 rounded-xl flex items-center justify-center group-hover:bg-[#009CA3] transition-colors duration-300">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📅</span>
                </div>
                <div className="flex items-center gap-2 text-[#009CA3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold">Open</span>
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="font-montserrat text-2xl font-semibold text-[#002F34] mb-3 group-hover:text-[#009CA3] transition-colors duration-300">
                {AdminDashboardResources.cards.events.title}
              </h3>
              <p className="text-base text-[#002F34]/70 leading-relaxed">
                {AdminDashboardResources.cards.events.description}
              </p>
            </div>
          </Link>

          <Link
            href="/admin/posts"
            className="group relative bg-white p-8 rounded-2xl border-2 border-[#009CA3]/10 hover:border-[#009CA3] transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#EFFEFD] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <div className="relative z-10">
              <div className="flex items-start justify-between mb-6">
                <div className="w-14 h-14 bg-[#009CA3]/10 rounded-xl flex items-center justify-center group-hover:bg-[#009CA3] transition-colors duration-300">
                  <span className="text-3xl group-hover:scale-110 transition-transform duration-300">📝</span>
                </div>
                <div className="flex items-center gap-2 text-[#009CA3] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm font-semibold">Open</span>
                  <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M6 3L11 8L6 13"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              <h3 className="font-montserrat text-2xl font-semibold text-[#002F34] mb-3 group-hover:text-[#009CA3] transition-colors duration-300">
                {AdminDashboardResources.cards.posts.title}
              </h3>
              <p className="text-base text-[#002F34]/70 leading-relaxed">
                {AdminDashboardResources.cards.posts.description}
              </p>
            </div>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
