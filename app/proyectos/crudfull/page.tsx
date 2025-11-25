'use client';

export default function CrudfullPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 px-4 py-8 max-w-4xl mx-auto">
      {/* Logo del proyecto */}
      <div className="flex justify-center mb-8">
        <img
          src="/proyectos/crudfull/crudfull-logo.jpeg"
          alt="Logo CRUDfull"
          className="w-60 h-60 object-contain drop-shadow-lg rounded-2xl"
          onError={(e) => {
            console.error('Error cargando imagen:', e);
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      <a href="/proyectos" className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors mb-6 inline-block">← Volver a proyectos</a>

      <h1 className="text-3xl md:text-4xl font-bold mb-4">CRUDfull – Generador modular de APIs con FastAPI</h1>
      
      <p className="text-lg text-neutral-300 mb-6">
        Librería Python que permite crear APIs completas en segundos mediante CLI, generando módulos, recursos CRUD, modelos, esquemas, servicios, rutas, tests e infraestructura opcional con Docker. Compatible con PostgreSQL, MongoDB e in-memory, con arquitectura modular y soporte para autenticación JWT.
      </p>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Descripción</h2>
        <p className="text-neutral-300 mb-4">
          Pensado para acelerar proyectos reales manteniendo buenas prácticas (Clean Architecture y organización por capas).
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Tecnologías</h2>
        <div className="flex flex-wrap gap-2">
          {['Python', 'FastAPI', 'SQLAlchemy', 'Beanie/MongoDB', 'PostgreSQL', 'Pytest', 'Docker', 'CLI (Typer)', 'Pydantic', 'MkDocs'].map(tech => (
            <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Impacto</h2>
        <p className="text-neutral-300">
          Acelera el desarrollo backend, reduce errores repetitivos y estandariza la estructura de proyectos profesionales. Proyecto en evolución activa orientado a la comunidad.
        </p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Repositorio</h2>
        <a href="https://github.com/matiasvagli/crudfull" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">
          github.com/matiasvagli/crudfull
        </a>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Galería</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[1,2,3].map(i => (
            <div key={i} className="aspect-video bg-neutral-800 border border-white/10 rounded-lg flex items-center justify-center text-neutral-500">
              Imagen {i} (placeholder)
            </div>
          ))}
        </div>
        <p className="text-sm text-neutral-500 mt-2">Agrega tus imágenes en esta sección.</p>
      </div>
    </div>
  );
}
