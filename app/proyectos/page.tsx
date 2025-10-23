import Link from "next/link";
import { proyectos as proyectosData, slugify } from "../data/projects";
import { Github, Linkedin, Mail, Phone, ArrowRight } from "lucide-react";

const profile = {
  nombre: "Matías Vagliviello",
  email: "vaglimatias@gmail.com",
  whatsapp: "5491168465477",
  linkedin: "https://www.linkedin.com/in/matias-vagliviello-07403736b/",
  github: "https://github.com/matiasvagli",
  ubicacion: "Buenos Aires, Argentina",
};

export default function ProjectsIndex() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-b border-white/10">
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href="/" className="font-semibold tracking-tight">{profile.nombre}</Link>
          <div className="flex items-center gap-3">
            <a href="#contacto" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5 transition">
              <Mail className="w-4 h-4"/> Contacto
            </a>
            <a href={profile.linkedin} target="_blank" className="p-2 rounded-xl border border-white/15 hover:bg-white/5" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4"/>
            </a>
            <a href={profile.github} target="_blank" className="p-2 rounded-xl border border-white/15 hover:bg-white/5" rel="noreferrer" aria-label="GitHub">
              <Github className="w-4 h-4"/>
            </a>
          </div>
        </nav>
      </header>

      {/* Contenido */}
      <main className="mx-auto max-w-6xl px-4 py-12">
        <Link href="/" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5 transition mb-8">
          <ArrowRight className="w-4 h-4 rotate-180"/> Volver al inicio
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-100">Proyectos</h1>
        <p className="mt-2 text-neutral-300 text-lg">Algunos proyectos seleccionados con descripción y stack tecnológico.</p>

        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {proyectosData.map((p) => (
            <div key={p.titulo} className="rounded-3xl border border-white/10 p-5 bg-white/[0.02] hover:bg-white/[0.04] transition">
              <h3 className="font-semibold text-lg text-neutral-100">{p.titulo}</h3>
              <p className="mt-2 text-neutral-300 text-sm">{p.descripcion}</p>
              {p.resultado && <p className="mt-2 text-xs text-neutral-400">Impacto: {p.resultado}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="text-xs rounded-full bg-white/5 border border-white/10 px-2 py-1">{s}</span>
                ))}
              </div>
              <div className="mt-4">
                <Link href={`/proyectos/${slugify(p.titulo)}`} className="inline-flex items-center gap-2 text-sm underline hover:opacity-80">
                  Ver detalles <ArrowRight className="w-3 h-3"/>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-6xl px-4 py-12 border-t border-white/10">
        <div className="rounded-3xl border border-white/10 p-6 md:p-8 bg-gradient-to-br from-white/[0.04] to-transparent">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">¿Trabajamos en tu próximo proyecto?</h2>
              <p className="mt-2 text-neutral-300">Consultas, presupuestos y colaboraciones. Respondo rápido.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile.whatsapp && (
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl bg-white text-neutral-900 px-4 py-2 font-medium hover:bg-neutral-200 transition">
                  <Phone className="w-4 h-4"/> WhatsApp
                </a>
              )}
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2 hover:bg-white/5 transition">
                  <Mail className="w-4 h-4"/> Email
                </a>
              )}
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2 hover:bg-white/5 transition">
                <Linkedin className="w-4 h-4"/> LinkedIn
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
