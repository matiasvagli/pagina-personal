import { Download, Mail, Phone, MapPin, Github, Linkedin, Calendar } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SobreMiPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <a 
            href="/" 
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            ← Volver al inicio
          </a>
        </nav>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Matías Vagliviello
          </h1>
          <p className="text-xl text-neutral-300 max-w-2xl mx-auto">
            Backend Developer – Python & SQL
          </p>
          <p className="text-lg text-neutral-400 mt-2">
            Buenos Aires, Argentina
          </p>
        </header>

        {/* Botón de descarga CV */}
        <div className="text-center mb-12">
          <a
            href="/cv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            <Download className="w-5 h-5" />
            Descargar CV en PDF
          </a>
        </div>

        {/* Información personal */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Información Personal</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>vaglimatias@gmail.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>+54 9 11 6846-5477</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-blue-400" />
                <span>Buenos Aires, Argentina</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Github className="w-5 h-5 text-blue-400" />
                <a href="https://github.com/matiasvagli" className="hover:underline">
                  github.com/matiasvagli
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Linkedin className="w-5 h-5 text-blue-400" />
                <a href="https://www.linkedin.com/in/matias-vagliviello-07403736b/" className="hover:underline">
                  LinkedIn Profile
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-blue-400" />
                <span>Disponible para proyectos</span>
              </div>
            </div>
          </div>
        </section>

        {/* Resumen profesional */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Perfil Profesional</h2>
          <div className="prose prose-invert max-w-none">
            <p className="text-lg leading-relaxed">
              Desarrollador Backend con experiencia progresiva desde <strong>2020</strong> en Python y bases de datos. 
              Me especializo en el desarrollo de APIs, automatización de procesos, integración de servicios y 
              diseño de sistemas backend orientados al negocio.
            </p>
            <p className="text-lg leading-relaxed">
              Trabajo con <strong>Django</strong>, <strong>FastAPI</strong> y <strong>PostgreSQL</strong>, 
              priorizando calidad, escalabilidad y buenas prácticas. Experiencia real trabajando con 
              PyMEs y proyectos freelance.
            </p>
          </div>
        </section>

        {/* Experiencia destacada */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Experiencia Freelance</h2>
          <div className="space-y-6">
            <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
              <h3 className="text-xl font-semibold mb-2">Desarrollador Backend – Sistema de Control de Ventas (2024)</h3>
              <p className="text-neutral-300 mb-3">
                Diseño y desarrollo backend para sistema completo de gestión comercial: ventas, clientes, inventario, caja, estadísticas y usuarios.
              </p>
              <p className="text-sm text-blue-400 mb-3"><strong>Tecnologías:</strong> Python, Django, PostgreSQL, Docker</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-300 ml-4">
                <li>Modelado de base de datos relacional y lógica de negocio</li>
                <li>Implementación de autenticación y autorización</li>
                <li>Generación de reportes y comprobantes</li>
                <li>API REST para uso interno y aplicación móvil</li>
                <li>Contenedores con Docker y despliegue productivo</li>
              </ul>
            </div>

            <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
              <h3 className="text-xl font-semibold mb-2">Desarrollador Full Stack – Coruja Casas Serranas (2025)</h3>
              <p className="text-neutral-300 mb-3">
                Sitio web profesional para alquiler turístico con sistema de reservas y consultas.
              </p>
              <p className="text-sm text-blue-400 mb-3"><strong>Tecnologías:</strong> Next.js, React, TailwindCSS, Django REST</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-300 ml-4">
                <li>Desarrollo frontend moderno responsive</li>
                <li>Integración de backend y formularios funcionales</li>
                <li>SEO técnico para posicionamiento en Google</li>
                <li>Optimización de tiempos de carga</li>
              </ul>
            </div>

            <div className="border border-white/10 rounded-lg p-6 bg-white/[0.02]">
              <h3 className="text-xl font-semibold mb-2">Automatización Python – Bot de Trading (2023)</h3>
              <p className="text-neutral-300 mb-3">
                Automatización de ejecución de órdenes para exchange mediante API en Python.
              </p>
              <p className="text-sm text-blue-400 mb-3"><strong>Tecnologías:</strong> Python, REST APIs</p>
              <ul className="list-disc list-inside space-y-1 text-neutral-300 ml-4">
                <li>Integración con API de exchange</li>
                <li>Manejo y lectura de datos en tiempo real</li>
                <li>Control de riesgo y ejecución segura</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Habilidades técnicas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Tecnologías</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Lenguajes</h3>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {['Django', 'Django REST', 'FastAPI'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Bases de Datos</h3>
              <div className="flex flex-wrap gap-2">
                {['PostgreSQL', 'MySQL', 'SQLite', 'SQL'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">DevOps</h3>
              <div className="flex flex-wrap gap-2">
                {['Docker', 'Docker Compose', 'Nginx'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TailwindCSS'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">Herramientas</h3>
              <div className="flex flex-wrap gap-2">
                {['Git', 'GitHub', 'VS Code', 'Linux'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Educación */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Educación y Formación</h2>
          <div className="space-y-4">
            <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02]">
              <h3 className="text-lg font-semibold mb-1">SQL Avanzado y Optimización de Consultas</h3>
              <p className="text-neutral-400 text-sm">Udemy (2025)</p>
            </div>
            <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02]">
              <h3 className="text-lg font-semibold mb-1">Docker y DevOps para Desarrollo Backend</h3>
              <p className="text-neutral-400 text-sm">Udemy (2024)</p>
            </div>
            <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02]">
              <h3 className="text-lg font-semibold mb-1">Python Backend Profesional (Django / FastAPI)</h3>
              <p className="text-neutral-400 text-sm">CoderHouse (2023)</p>
            </div>
            <div className="border border-white/10 rounded-lg p-4 bg-white/[0.02]">
              <h3 className="text-lg font-semibold mb-1">Capacitación continua en arquitectura de software y bases de datos</h3>
            </div>
          </div>
        </section>

        {/* Habilidades */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Habilidades</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-neutral-300">
              <li>• Diseño y consumo de APIs REST</li>
              <li>• Modelado de datos relacionales</li>
              <li>• Optimización de consultas SQL</li>
              <li>• Integración backend + frontend</li>
            </ul>
            <ul className="space-y-2 text-neutral-300">
              <li>• Resolución de problemas técnicos</li>
              <li>• Trabajo autónomo y profesionalismo</li>
            </ul>
          </div>
        </section>

        {/* Idiomas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Idiomas</h2>
          <div className="space-y-2">
            <p className="text-neutral-300">• Español (nativo)</p>
            <p className="text-neutral-300">• Inglés (intermedio técnico)</p>
          </div>
        </section>

        {/* Contacto */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-6">¿Trabajamos juntos?</h2>
          <p className="text-lg text-neutral-300 mb-6">
            Si tenés un proyecto en mente o necesitás un desarrollador backend, no dudes en contactarme.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:vaglimatias@gmail.com"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Mail className="w-5 h-5" />
              Enviar email
            </a>
            <a
              href="https://wa.me/5491168465477"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <Phone className="w-5 h-5" />
              WhatsApp
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
