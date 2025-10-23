import { notFound } from 'next/navigation';
import { notasTecnicas, slugifyNota } from '../../data/notas';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
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

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function NotaPage({ params }: Props) {
  const { slug } = await params;
  
  const nota = notasTecnicas.find(n => slugifyNota(n.titulo) === slug);
  
  if (!nota) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <Header />
      
      <main className="mx-auto max-w-4xl px-4 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <Link 
            href="/" 
            className="text-sm text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            ← Volver al inicio
          </Link>
        </nav>

        {/* Header de la nota */}
        <header className="mb-8">
          <div className="text-sm text-neutral-400 mb-2">{nota.fecha}</div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {nota.titulo}
          </h1>
          <p className="text-lg text-neutral-300 mb-6">{nota.resumen}</p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {nota.tags.map((tag) => (
              <span 
                key={tag} 
                className="text-sm rounded-full bg-white/5 border border-white/10 px-3 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Contenido */}
        <article 
          className="prose prose-invert prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: nota.contenido }}
        />
      </main>

      <Footer />
    </div>
  );
}
