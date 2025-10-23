import { useMemo } from "react";
import Link from "next/link";
import MotionH1, { MotionArticle } from "./components/Motion";
import Accordion from "./components/Accordion";
import { Github, Linkedin, Mail, Phone, ArrowRight, Database, Server, Globe } from "lucide-react";

// ======== CONFIGURACIÓN RÁPIDA (editá estos datos) ======== //
const profile = {
  nombre: "Matías Vagliviello",
  rol: "Backend Developer",
  titular: "APIs sólidas, datos confiables y despliegues simples",
  resumen:
    "Desarrollo y escalo backends en Python (Django/FastAPI), diseño bases de datos (PostgreSQL/MySQL) y automatizo despliegues con Docker. Experiencia con Pymes y proyectos reales de negocio.",
  ubicacion: "Buenos Aires, Argentina",
  email: "vaglimatias@gmail.com", 
  telefono: "+54  11 68465477",
  whatsapp: "5491168465477", 
  linkedin: "https://www.linkedin.com/in/matias-vagliviello-07403736b/",
  github: "https://github.com/matiasvagli",
  fotoUrl: "/personal/p3.webp",
};

// Proyectos destacados (3–4 con impacto real)
import { proyectos as proyectosData, slugify } from "./data/projects";
import { notasTecnicas, slugifyNota } from "./data/notas";

const skills = {
  Backend: ["Python", "Django", "FastAPI", "REST APIs", "JWT Auth", "DRF", "WebSockets"],
  "Bases de Datos": ["PostgreSQL", "MySQL/MariaDB", "MongoDB", "SQLite", "Modelado relacional", "Índices", "JOIN", "ORM"],
  "DevOps & Deploy": ["Docker", "Docker Compose", "NGINX (básico)", "Render", "Vercel", "Railway", "Cloudflare DNS", "SSL", "Linux (Ubuntu)"],
  Frontend: ["Next.js", "React", "Tailwind CSS", "TypeScript (básico)"],
  Herramientas: ["Git", "GitHub", "Postman", "Insomnia", "pgAdmin", "MySQL Workbench", "DBeaver"],
};

// Opcional: sección con 'senior vibes' y prácticas aplicadas
const seniorVibes = [
  {
    title: "Manejo de ENTORNOS",
    items: [".env", "variables de entorno", "settings de producción"],
  },
  {
    title: "Seguridad backend",
    items: ["CORS", "CSRF", "Hash de passwords", "HTTPS"],
  },
  {
    title: "Arquitectura",
    items: ["Servicios REST", "MVC", "Limpieza de endpoints", "Serializers", "Dockerizar apps"],
  },
  {
    title: "QA",
    items: ["Pruebas manuales", "documentación con README", "endpoints probados con Postman"],
  },
];

// Usar las notas técnicas del archivo de datos
const posts = notasTecnicas.map(nota => ({
  titulo: nota.titulo,
  fecha: nota.fecha,
  resumen: nota.resumen,
  url: `/notas/${slugifyNota(nota.titulo)}`,
}));

// ======== COMPONENTE ======== //
export default function PortfolioPage() {
  const year = useMemo(() => new Date().getFullYear(), []);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="sticky top-0 z-40 backdrop-blur bg-neutral-950/70 border-b border-white/10">
        <nav className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <a href="#inicio" className="font-semibold tracking-tight">{profile.nombre}</a>
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

      {/* Hero */}
      <section id="inicio" className="mx-auto max-w-6xl px-4 pt-12 pb-10">
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
          <div>
            <MotionH1 className="text-3xl md:text-5xl font-bold tracking-tight">
              {profile.rol}
            </MotionH1>
            <p className="mt-3 text-lg text-neutral-300">{profile.titular}</p>
            <p className="mt-4 text-neutral-400 max-w-2xl">{profile.resumen}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/sobre-mi" className="inline-flex items-center gap-2 rounded-2xl bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 transition">
                Conoce más sobre mí
              </Link>
              {profile.email && (
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-2 rounded-2xl bg-white text-neutral-900 px-4 py-2 font-medium hover:bg-neutral-200 transition">
                  <Mail className="w-4 h-4"/> Escribime
                </a>
              )}
              {profile.whatsapp && (
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2 hover:bg-white/5 transition">
                  <Phone className="w-4 h-4"/> WhatsApp
                </a>
              )}
              <a href="#proyectos" className="inline-flex items-center gap-2 rounded-2xl border border-white/15 px-4 py-2 hover:bg-white/5 transition">
                Ver proyectos <ArrowRight className="w-4 h-4"/>
              </a>
            </div>
            <div className="mt-4 text-sm text-neutral-400">{profile.ubicacion}</div>
          </div>

          <div className="flex md:justify-end">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-black/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={profile.fotoUrl} alt="Foto profesional" className="w-full h-full object-cover"/>
              <div className="absolute inset-0 ring-1 ring-white/10"/>
            </div>
          </div>
        </div>

        {/* Valor / Highlights */}
        <div className="mt-10 grid sm:grid-cols-3 gap-3">
          <Highlight icon={<Server className="w-4 h-4"/>} title="APIs confiables" desc="Diseño endpoints limpios, versionados y documentados."/>
          <Highlight icon={<Database className="w-4 h-4"/>} title="Modelado de datos" desc="Esquemas sólidos, índices y consultas optimizadas."/>
          <Highlight icon={"🐳"} title="Docker & Deploy" desc="Contenedores reproducibles y despliegues simples."/>
        </div>
      </section>

      {/* Proyectos */}
      <section id="proyectos" className="mx-auto max-w-6xl px-4 py-10 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Proyectos destacados</h2>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {proyectosData.map((p, i) => (
            <MotionArticle key={i} initial={{opacity:0, y:8}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:.4, delay:i*0.05}} className="rounded-3xl border border-white/10 p-5 bg-white/[0.02] hover:bg-white/[0.04] transition">
              <h3 className="text-lg font-semibold">{p.titulo}</h3>
              <p className="mt-2 text-neutral-300">{p.descripcion}</p>
              {p.resultado && <p className="mt-2 text-sm text-neutral-400">Impacto: {p.resultado}</p>}
              <div className="mt-3 flex flex-wrap gap-2">
                {p.stack.map((s) => (
                  <span key={s} className="text-xs rounded-full bg-white/5 border border-white/10 px-2 py-1">{s}</span>
                ))}
              </div>
              <div className="mt-4 flex gap-3 text-sm">
                {p.links.demo && (
                  <a className="underline hover:opacity-80" href={p.links.demo} target="_blank" rel="noreferrer">Demo</a>
                )}
                {p.links.repo && (
                  <a className="underline hover:opacity-80" href={p.links.repo} target="_blank" rel="noreferrer">Repo</a>
                )}
                {p.links.caso && (
                  <span className="text-sm text-neutral-400">{p.links.caso}</span>
                )}
                <Link className="underline hover:opacity-80" href={`/proyectos/${slugify(p.titulo)}`}>Ver detalles</Link>
              </div>
            </MotionArticle>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="mx-auto max-w-6xl px-4 py-10 border-t border-white/10">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Habilidades</h2>
  <div className="mt-6 grid md:grid-cols-5 gap-6">
          {Object.entries(skills).map(([grupo, list]) => (
            <div key={grupo} className="rounded-3xl border border-white/10 p-5 bg-white/[0.02]">
              <h3 className="font-medium text-neutral-200">{(function(){
                if (grupo === 'Backend') return '🔧 ' + grupo;
                if (grupo === 'Bases de Datos') return '🗄️ ' + grupo;
                if (grupo === 'DevOps & Deploy') return '☁️ ' + grupo;
                if (grupo === 'Frontend') return '💻 ' + grupo;
                if (grupo === 'Herramientas') return '🛠️ ' + grupo;
                return grupo;
              })()}</h3>
              <ul className="mt-3 grid gap-1.5 text-sm text-neutral-300">
                {list.map((s) => (
                  <li key={s}>• {s}</li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Accordion debajo del grid de skills */}
        <div className="mt-6">
          <Accordion title={<>🔥 Experiencia Técnica Aplicada</>}>
            <div className="space-y-3">
              {seniorVibes.map((s) => (
                <div key={s.title}>
                  <div className="font-medium text-neutral-200">{s.title}</div>
                  <div className="text-sm text-neutral-400 mt-1">{s.items.join(' · ')}</div>
                </div>
              ))}
            </div>
          </Accordion>
        </div>
      </section>

      {/* Blog (ES) */}
      <section id="blog" className="mx-auto max-w-6xl px-4 py-10 border-t border-white/10">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Notas técnicas</h2>
          <div className="flex gap-4">
            <Link href="/sobre-mi" className="text-sm underline underline-offset-4">Sobre mí</Link>
            <Link href="/notas" className="text-sm underline underline-offset-4">Ver todas</Link>
          </div>
        </div>
        <div className="mt-6 grid md:grid-cols-2 gap-6">
          {posts.map((post, i) => (
            <article key={i} className="rounded-3xl border border-white/10 p-5 bg-white/[0.02] hover:bg-white/[0.04] transition">
              <div className="text-xs text-neutral-400">{post.fecha}</div>
              <h3 className="mt-1 text-lg font-medium">{post.titulo}</h3>
              <p className="mt-2 text-neutral-300">{post.resumen}</p>
              <div className="mt-3 text-sm">
                <Link className="inline-flex items-center gap-1 underline hover:opacity-80" href={post.url}>
                  Leer más <ArrowRight className="w-3 h-3"/>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

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

      <footer className="mx-auto max-w-6xl px-4 pb-10 text-sm text-neutral-400">
        <div className="flex flex-wrap items-center gap-2">
          <Globe className="w-4 h-4"/>
          <span>{profile.ubicacion}</span>
          <span className="opacity-50">•</span>
          <span>© {year} {profile.nombre}. Hecho con Next.js + Tailwind.</span>
        </div>
      </footer>
    </div>
  );
}

function Highlight({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/10 p-4 bg-white/[0.02]">
      <div className="flex items-center gap-2 text-neutral-200">
        <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-white/5 border border-white/10">{icon}</span>
        <span className="font-medium">{title}</span>
      </div>
      <p className="mt-2 text-sm text-neutral-400">{desc}</p>
    </div>
  );
}
