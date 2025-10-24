'use client'
import { Download } from 'lucide-react';

export default function CVPDFPage() {
  return (
    <div className="min-h-screen bg-white text-black p-8">
      {/* Estilos para impresión */}
      <style jsx>{`
        @media print {
          body { margin: 0; }
          .no-print { display: none !important; }
          .page-break { page-break-before: always; }
        }
      `}</style>

      {/* Botón de descarga */}
      <div className="no-print text-center mb-8">
        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Download className="w-5 h-5" />
          Descargar PDF
        </button>
        <p className="text-sm text-gray-600 mt-2">
          Haz clic en "Descargar PDF" y luego "Imprimir" → "Guardar como PDF"
        </p>
      </div>

      {/* CV Content */}
      <div className="max-w-4xl mx-auto">
        {/* Header con foto */}
        <div className="flex items-start gap-6 mb-8">
          <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-300">
            <img 
              src="/personal/p3.jpg" 
              alt="Matías Vagliviello" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Matías Vagliviello</h1>
            <h2 className="text-xl text-blue-600 mb-2">Backend Developer – Python & SQL</h2>
            <p className="text-gray-600 mb-4">Buenos Aires, Argentina</p>
            
            {/* Información de contacto */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Email:</strong> vaglimatias@gmail.com</p>
                <p><strong>Teléfono:</strong> +54 9 11 6846-5477</p>
              </div>
              <div>
                <p><strong>LinkedIn:</strong> linkedin.com/in/matias-vagliviello-07403736b</p>
                <p><strong>GitHub:</strong> github.com/matiasvagli</p>
              </div>
            </div>
          </div>
        </div>

        {/* Perfil Profesional */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">PERFIL PROFESIONAL</h3>
          <p className="text-gray-700 leading-relaxed">
            Desarrollador Backend con experiencia progresiva desde <strong>2020</strong> en Python y bases de datos. 
            Me especializo en el desarrollo de APIs, automatización de procesos, integración de servicios y 
            diseño de sistemas backend orientados al negocio. Trabajo con Django, FastAPI y PostgreSQL, 
            priorizando calidad, escalabilidad y buenas prácticas. Experiencia real trabajando con PyMEs y proyectos freelance.
          </p>
        </section>

        {/* Experiencia */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">EXPERIENCIA FREELANCE</h3>
          
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Desarrollador Backend – Sistema de Control de Ventas</h4>
            <p className="text-blue-600 font-medium mb-2">Proyecto Freelance – 2024</p>
            <p className="text-gray-700 mb-3">
              Diseño y desarrollo backend para sistema completo de gestión comercial: ventas, clientes, inventario, caja, estadísticas y usuarios.
            </p>
            <p className="text-sm text-gray-600 mb-2"><strong>Tecnologías:</strong> Python, Django, PostgreSQL, Docker</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Modelado de base de datos relacional y lógica de negocio</li>
              <li>Implementación de autenticación y autorización</li>
              <li>Generación de reportes y comprobantes</li>
              <li>API REST para uso interno y aplicación móvil</li>
              <li>Contenedores con Docker y despliegue productivo</li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Desarrollador Full Stack – Coruja Casas Serranas</h4>
            <p className="text-blue-600 font-medium mb-2">Proyecto Freelance – 2025</p>
            <p className="text-gray-700 mb-3">
              Sitio web profesional para alquiler turístico con sistema de reservas y consultas.
            </p>
            <p className="text-sm text-gray-600 mb-2"><strong>Tecnologías:</strong> Next.js, React, TailwindCSS, Django REST</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Desarrollo frontend moderno responsive</li>
              <li>Integración de backend y formularios funcionales</li>
              <li>SEO técnico para posicionamiento en Google</li>
              <li>Optimización de tiempos de carga</li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Automatización Python – Bot de Trading</h4>
            <p className="text-blue-600 font-medium mb-2">Proyecto Personal – 2023</p>
            <p className="text-gray-700 mb-3">
              Automatización de ejecución de órdenes para exchange mediante API en Python.
            </p>
            <p className="text-sm text-gray-600 mb-2"><strong>Tecnologías:</strong> Python, REST APIs</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Integración con API de exchange</li>
              <li>Manejo y lectura de datos en tiempo real</li>
              <li>Control de riesgo y ejecución segura</li>
            </ul>
          </div>
        </section>

        {/* Educación */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">EDUCACIÓN Y FORMACIÓN</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>SQL Avanzado y Optimización de Consultas</strong> – Udemy (2025)</li>
            <li>• <strong>Docker y DevOps para Desarrollo Backend</strong> – Udemy (2024)</li>
            <li>• <strong>Python Backend Profesional (Django / FastAPI)</strong> – CoderHouse (2023)</li>
            <li>• Capacitación continua en arquitectura de software y bases de datos</li>
          </ul>
        </section>

        {/* Tecnologías */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">TECNOLOGÍAS</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-gray-700"><strong>Lenguajes:</strong> Python, JavaScript</p>
              <p className="text-gray-700"><strong>Backend:</strong> Django, Django REST, FastAPI</p>
              <p className="text-gray-700"><strong>Bases de Datos:</strong> PostgreSQL, MySQL, SQLite, SQL</p>
            </div>
            <div>
              <p className="text-gray-700"><strong>DevOps:</strong> Docker, Docker Compose, Nginx</p>
              <p className="text-gray-700"><strong>Frontend:</strong> React, Next.js, TailwindCSS</p>
              <p className="text-gray-700"><strong>Herramientas:</strong> Git, GitHub, VS Code, Linux</p>
            </div>
          </div>
        </section>

        {/* Habilidades */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">HABILIDADES</h3>
          <div className="grid grid-cols-2 gap-4">
            <ul className="space-y-1 text-gray-700">
              <li>• Diseño y consumo de APIs REST</li>
              <li>• Modelado de datos relacionales</li>
              <li>• Optimización de consultas SQL</li>
              <li>• Integración backend + frontend</li>
            </ul>
            <ul className="space-y-1 text-gray-700">
              <li>• Resolución de problemas técnicos</li>
              <li>• Trabajo autónomo y profesionalismo</li>
            </ul>
          </div>
        </section>

        {/* Idiomas */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">IDIOMAS</h3>
          <ul className="space-y-1 text-gray-700">
            <li>• Español (nativo)</li>
            <li>• Inglés (intermedio técnico)</li>
          </ul>
        </section>

        {/* Referencias */}
        <section>
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">REFERENCIAS</h3>
          <p className="text-gray-700">Disponibles a solicitud.</p>
        </section>
      </div>
    </div>
  );
}
