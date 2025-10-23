'use client'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className="w-full">
      <nav className="w-full max-w-[1100px] mx-auto">
        <Link 
          href="/proyectos"
          className="flex items-center gap-1 text-zinc-400 text-sm hover:text-zinc-300 transition-colors"
        >
          <ArrowLeft size={16} />
          Volver a proyectos
        </Link>
      </nav>
    </header>
  )
}