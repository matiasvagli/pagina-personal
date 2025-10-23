import { notasTecnicas, slugifyNota } from '../data/notas';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

const profile = {
  nombre: "Matías Vagliviello",
  rol: "Backend Developer",
  email: "vaglimatias@gmail.com",
  telefono: "+54 11 68465477",
  whatsapp: "5491168465477",
  linkedin: "https://www.linkedin.com/in/matias-vagliviello-07403736b/",
  github: "https://github.com/matiasvagli",
  ubicacion: "Buenos Aires, Argentina"
};

export default function NotasPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header profile={profile} />
      
      <main className="mx-auto max-w-6xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </nav>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Notas Técnicas
          </h1>
          <p className="text-lg text-neutral-300 max-w-2xl">
            Artículos sobre desarrollo backend, mejores prácticas y soluciones técnicas aplicadas en proyectos reales.
          </p>
        </header>

        {/* Lista de notas */}
        <div className="grid md:grid-cols-2 gap-6">
          {notasTecnicas.map((nota, index) => (
            <article 
              key={index}
              className="rounded-3xl border border-white/10 p-6 bg-white/[0.02] hover:bg-white/[0.04] transition"
            >
              <div className="text-sm text-neutral-400 mb-2">{nota.fecha}</div>
              <h2 className="text-xl font-semibold mb-3">{nota.titulo}</h2>
              <p className="text-neutral-300 mb-4">{nota.resumen}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {nota.tags.map((tag) => (
                  <span 
                    key={tag} 
                    className="text-xs rounded-full bg-white/5 border border-white/10 px-2 py-1"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              {/* Link */}
              <Link 
                href={`/notas/${slugifyNota(nota.titulo)}`}
                className="inline-flex items-center gap-2 text-sm text-neutral-200 hover:text-white transition-colors"
              >
                Leer más <ArrowRight className="w-4 h-4" />
              </Link>
            </article>
          ))}
        </div>

        {/* Sección de contacto */}
        <section className="mt-16 rounded-3xl border border-white/10 p-8 bg-gradient-to-br from-white/[0.04] to-transparent">
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">¿Tienes alguna consulta técnica?</h2>
            <p className="text-neutral-300 mb-6">
              Si necesitas ayuda con algún tema específico o tienes preguntas sobre estos artículos, no dudes en contactarme.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a 
                href={`https://wa.me/${profile.whatsapp}`} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-neutral-900 px-4 py-2 font-medium hover:bg-neutral-200 transition"
              >
                💬 WhatsApp
              </a>
              <a 
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2 hover:bg-white/5 transition"
              >
                📧 Email
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer profile={profile} />
    </div>
  );
}
