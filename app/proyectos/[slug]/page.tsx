import { notFound } from "next/navigation";
import { getProjectBySlug, proyectos, slugify } from "../../data/projects";
import Link from "next/link";
import { Github, Linkedin, Mail, Phone, ArrowRight, Globe } from "lucide-react";
import ImageCarousel from "../../components/ImageCarousel";

type Props = { params: Promise<{ slug: string }> };

const profile = {
  nombre: "Matías Vagliviello",
  email: "vaglimatias@gmail.com",
  whatsapp: "5491168465477",
  linkedin: "https://www.linkedin.com/in/matias-vagliviello-07403736b/",
  github: "https://github.com/matiasvagli",
  ubicacion: "Buenos Aires, Argentina",
};

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return notFound();

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
      <main className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/proyectos" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-3 py-1.5 text-sm hover:bg-white/5 transition mb-8">
          <ArrowRight className="w-4 h-4 rotate-180"/> Volver a proyectos
        </Link>
        
        <h1 className="text-3xl md:text-4xl font-bold text-neutral-100">{project.titulo}</h1>
        <p className="mt-4 text-neutral-300 text-lg">{project.descripcion}</p>

        {/* Carrusel de imágenes */}
        {project.imagenes && project.imagenes.length > 0 && (
          <div className="mt-8">
            <h3 className="font-medium text-xl text-neutral-200 mb-4">Capturas del proyecto</h3>
            <ImageCarousel 
              images={project.imagenes} 
              alt={project.titulo}
              size={project.titulo.includes('App Móvil') ? 'small' : 'large'}
            />
          </div>
        )}

        {/* Descripción extensa */}
        {project.descripcionExtensa && (
          <div className="mt-8">
            <h3 className="font-medium text-xl text-neutral-200 mb-4">Detalles del proyecto</h3>
            <div 
              className="prose prose-invert max-w-none text-neutral-300 [&_h3]:text-neutral-100 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-6 [&_h3]:mb-3 [&_p]:text-neutral-300 [&_p]:mb-4 [&_ul]:list-disc [&_ul]:list-inside [&_ul]:space-y-2 [&_li]:text-neutral-300 [&_strong]:text-neutral-100 [&_strong]:font-medium"
              dangerouslySetInnerHTML={{ __html: project.descripcionExtensa }}
            />
          </div>
        )}

        {project.resultado && (
          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
            <h3 className="font-medium text-neutral-200">Impacto del proyecto</h3>
            <p className="mt-2 text-neutral-400">{project.resultado}</p>
          </div>
        )}

        <div className="mt-8">
          <h3 className="font-medium text-xl text-neutral-200">Stack tecnológico</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((s) => (
              <span key={s} className="text-sm rounded-full bg-white/5 border border-white/10 px-3 py-1.5">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <h3 className="font-medium text-xl text-neutral-200 mb-4">Enlaces del proyecto</h3>
          <div className="flex flex-wrap gap-3">
            {project.links.demo && (
              <a 
                href={project.links.demo} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl bg-white text-neutral-900 px-4 py-2 font-medium hover:bg-neutral-200 transition"
              >
                <Globe className="w-4 h-4"/> Ver demo
              </a>
            )}
            {project.links.repo && (
              <a 
                href={project.links.repo} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2 hover:bg-white/5 transition"
              >
                <Github className="w-4 h-4"/> Ver código
              </a>
            )}
            {project.links.caso && (
              <div className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2 bg-white/[0.02]">
                <span className="text-sm text-neutral-400">{project.links.caso}</span>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Contacto */}
      <section id="contacto" className="mx-auto max-w-4xl px-4 py-12 border-t border-white/10">
        <div className="rounded-3xl border border-white/10 p-6 md:p-8 bg-gradient-to-br from-white/[0.04] to-transparent">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">¿Construimos tu próximo proyecto?</h2>
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

export function generateStaticParams() {
  return proyectos.map((p) => ({ slug: slugify(p.titulo) }));
}
