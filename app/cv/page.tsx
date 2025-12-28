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
            <h2 className="text-xl text-blue-600 mb-2">Backend Developer | Python · TypeScript · AI Explorer</h2>
            <p className="text-gray-600 mb-4">Buenos Aires, Argentina</p>

            {/* Información de contacto */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p><strong>Email:</strong> vaglimatias@gmail.com</p>
                <p><strong>Teléfono:</strong> +54 9 11 6846-5477</p>
              </div>
              <div>
                <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/matias-vagliviello-07403736b" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LinkedIn</a></p>
                <p><strong>GitHub:</strong> <a href="https://github.com/matiasvagli" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub</a></p>
              </div>
            </div>
          </div>
        </div>

        {/* Perfil Profesional */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">PERFIL PROFESIONAL</h3>
          <p className="text-gray-700 leading-relaxed">
            Desarrollador Backend especializado en el ecosistema Python (FastAPI, Django) y TypeScript (NestJS). Mi enfoque principal es la creación de APIs robustas y escalables bajo principios SOLID, Clean Architecture y DDD.<br /><br />
            Actualmente, estoy integrando herramientas de Inteligencia Artificial (LLMs) en flujos de backend para optimizar la toma de decisiones y la experiencia de usuario. Soy el creador de <strong>CRUDfull</strong>, una herramienta CLI open source diseñada para estandarizar y acelerar el desarrollo de microservicios con calidad de producción.
          </p>
        </section>

        {/* Experiencia Relevante */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">EXPERIENCIA RELEVANTE</h3>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Desarrollador Backend (Freelance)</h4>
            <p className="text-blue-600 font-medium mb-2">2025 – Actualidad</p>
            <p className="text-gray-700 font-medium mb-2">Sistema de Control de Ventas e Inventario Inteligente</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Diseñé y desarrollé el núcleo del sistema utilizando Django y PostgreSQL.</li>
              <li><strong>Integración de IA:</strong> Implementé un asistente inteligente con LangChain que permite a los usuarios consultar estadísticas de ventas y stock mediante lenguaje natural (Text-to-SQL).</li>
              <li><strong>Performance y Seguridad:</strong> Aseguré la integridad de los datos aplicando el Principio de Menor Privilegio (RBAC), configurando usuarios de base de datos de "solo lectura" para el motor de IA.</li>
              <li><strong>Arquitectura:</strong> Diseñé un backend modular utilizando Django y PostgreSQL, priorizando la separación de lógica de negocio de las vistas para mejorar la mantenibilidad. Implementé una capa de servicios personalizada para centralizar reglas de negocio, facilitando la integración con el sistema de reportes y la IA.</li>
            </ul>

          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Creador de CRUDfull (Proyecto Open Source)</h4>
            <p className="text-blue-600 font-medium mb-2">2025</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Desarrollé una herramienta CLI en Python que automatiza la generación de boilerplate para proyectos FastAPI (Modelos, Schemas, Repositorios, Tests y Docker).</li>
              <li>Enfocado en la estandarización de código y aceleración de tiempos de desarrollo (Time-to-Market) para otros desarrolladores.</li>
            </ul>
          </div>

          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900">Automatización de Trading (Proyecto Personal)</h4>
            <p className="text-blue-600 font-medium mb-2">2023</p>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Construí un bot de ejecución de órdenes mediante REST APIs.</li>
              <li>Enfoque en manejo de datos en tiempo real y gestión de errores críticos en entornos financieros.</li>
            </ul>
          </div>
        </section>

        {/* Tecnologías */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">TECNOLOGÍAS</h3>
          <ul className="space-y-2 text-gray-700">
            <li><strong>Lenguajes:</strong> Python, TypeScript, JavaScript (Explorando Go).</li>
            <li><strong>Backend:</strong> FastAPI, Django, NestJS, Node.js.</li>
            <li><strong>IA & Data:</strong> LangChain, OpenAI API, Prompt Engineering, Text-to-SQL.</li>
            <li><strong>Bases de Datos:</strong> PostgreSQL (Modelado y permisos), MySQL, Redis (Caching), SQLite.</li>
            <li><strong>Infraestructura:</strong> Docker, Docker Compose, Git, Linux.</li>
          </ul>
        </section>

        {/* Educación y Formación */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">EDUCACIÓN Y FORMACIÓN</h3>
          <ul className="space-y-2 text-gray-700">
            <li>• <strong>Arquitectura Hexagonal</strong> – Codely (2025)</li>
            <li>• <strong>SQL y Gestión de Datos</strong> – Udemy (2025)</li>
            <li>• <strong>Docker y DevOps para Backend</strong> – Udemy (2024)</li>
            <li>• <strong>Python Backend Profesional</strong> – Coderhouse (2023)</li>
          </ul>
        </section>

        {/* Habilidades & Idiomas */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-blue-600 pb-2">HABILIDADES & IDIOMAS</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Soft Skills</h4>
              <p className="text-gray-700">Resolución de problemas complejos, mentalidad de arquitecto, aprendizaje autodidacta constante.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Inglés</h4>
              <p className="text-gray-700">Intermedio técnico (lectura de documentación y escritura técnica).</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
