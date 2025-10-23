// Test script para verificar slugs
const proyectos = [
  {
    titulo: "Sistema de Control de Ventas (Distribuidora Avícola)",
  },
  {
    titulo: "Coruja Casas Serranas – Sitio de alquiler Vacacional",
  },
  {
    titulo: "App Móvil Huevo de Oro",
  }
];

function slugify(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

console.log("=== PRUEBA DE SLUGS ===");
proyectos.forEach(proyecto => {
  const slug = slugify(proyecto.titulo);
  console.log(`Título: "${proyecto.titulo}"`);
  console.log(`Slug: "${slug}"`);
  console.log(`URL: /proyectos/${slug}`);
  console.log("---");
});
