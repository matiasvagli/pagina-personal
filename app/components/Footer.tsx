'use client'
import { Github, Globe } from 'lucide-react'
import { motion } from 'framer-motion'

interface FooterProps {
  githubUrl?: string
  liveUrl?: string
}

export default function Footer({ githubUrl, liveUrl }: FooterProps) {
  return (
    <footer className="w-full py-20">
      <div className="max-w-[1100px] mx-auto flex flex-col gap-4">
        <h2 className="font-semibold">¡Contáctame!</h2>
        <p className="text-zinc-400">
          Si te interesa mi trabajo o quieres saber más sobre este proyecto, no dudes en contactarme.
        </p>
        <div className="flex gap-4 mt-2">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              <Github size={16} />
              Ver código fuente
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-300 transition-colors"
            >
              <Globe size={16} />
              Ver proyecto en vivo
            </a>
          )}
        </div>
      </div>
    </footer>
  )
}