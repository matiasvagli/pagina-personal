export interface NotaTecnica {
  titulo: string;
  fecha: string;
  resumen: string;
  contenido: string;
  tags: string[];
  url: string;
}

export const notasTecnicas: NotaTecnica[] = [
  {
    titulo: "Cómo diseñar un modelo muchos-a-muchos con atributos",
    fecha: "Oct 2025",
    resumen: "Patrones de modelado en SQL/Django ORM para evitar joins inválidos y N+1.",
    contenido: `
      <h2>Introducción</h2>
      <p>Los modelos muchos-a-muchos con atributos adicionales son uno de los patrones más comunes pero también más complejos en el diseño de bases de datos. En este artículo exploramos las mejores prácticas para implementarlos correctamente.</p>
      
      <h3>El Problema</h3>
      <p>Cuando tienes una relación muchos-a-muchos entre dos entidades, pero necesitas almacenar información adicional sobre esa relación, necesitas crear una tabla intermedia.</p>
      
      <h3>Solución en Django</h3>
      <pre><code>class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    email = models.EmailField()

class Proyecto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.TextField()

class Participacion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)
    proyecto = models.ForeignKey(Proyecto, on_delete=models.CASCADE)
    rol = models.CharField(max_length=50)
    fecha_ingreso = models.DateField()
    activo = models.BooleanField(default=True)
    
    class Meta:
        unique_together = ['usuario', 'proyecto']</code></pre>
      
      <h3>Consultas Optimizadas</h3>
      <p>Para evitar el problema N+1, siempre usa select_related y prefetch_related:</p>
      
      <pre><code># ✅ Correcto
proyectos = Proyecto.objects.prefetch_related('participacion_set__usuario').all()

# ❌ Incorrecto - causa N+1
proyectos = Proyecto.objects.all()
for proyecto in proyectos:
    for participacion in proyecto.participacion_set.all():
        print(participacion.usuario.nombre)</code></pre>
      
      <h3>Conclusión</h3>
      <p>Los modelos intermedios son la solución estándar para relaciones muchos-a-muchos con atributos. La clave está en diseñar correctamente las consultas para mantener el rendimiento.</p>
    `,
    tags: ["Django", "SQL", "ORM", "Base de Datos"],
    url: "/notas/como-disenar-modelo-muchos-a-muchos-con-atributos"
  },
  {
    titulo: "Guía rápida de Docker para backends Django/FastAPI",
    fecha: "Oct 2025",
    resumen: "Estructura de imágenes, multi-stage, salud de contenedores y tips de producción.",
    contenido: `
      <h2>Introducción a Docker para Backends</h2>
      <p>Docker se ha convertido en el estándar para containerizar aplicaciones backend. Esta guía cubre los aspectos esenciales para proyectos Django y FastAPI.</p>
      
      <h3>Dockerfile Básico para Django</h3>
      <pre><code>FROM python:3.11-slim

WORKDIR /app

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \\
    postgresql-client \\
    && rm -rf /var/lib/apt/lists/*

# Copiar requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Comando por defecto
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]</code></pre>
      
      <h3>Multi-stage para Producción</h3>
      <pre><code># Build stage
FROM python:3.11-slim as builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user -r requirements.txt

# Production stage
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
CMD ["gunicorn", "myproject.wsgi:application"]</code></pre>
      
      <h3>Docker Compose para Desarrollo</h3>
      <pre><code>version: '3.8'
services:
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: myproject
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
  
  web:
    build: .
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/app
    ports:
      - "8000:8000"
    depends_on:
      - db
    environment:
      - DEBUG=1
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/myproject

volumes:
  postgres_data:</code></pre>
      
      <h3>Health Checks</h3>
      <pre><code># En Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:8000/health/ || exit 1</code></pre>
      
      <h3>Tips de Producción</h3>
      <ul>
        <li>Usa imágenes específicas de versión (python:3.11-slim, no python:latest)</li>
        <li>Implementa health checks para monitoreo</li>
        <li>Usa multi-stage builds para reducir tamaño</li>
        <li>No ejecutes como root en producción</li>
        <li>Usa secrets management para variables sensibles</li>
      </ul>
      
      <h3>Conclusión</h3>
      <p>Docker simplifica el deployment y garantiza consistencia entre entornos. Con estas prácticas básicas tendrás un setup robusto para tus proyectos backend.</p>
    `,
    tags: ["Docker", "Django", "FastAPI", "DevOps"],
    url: "/notas/guia-docker-backends-django-fastapi"
  }
];

export function slugifyNota(titulo: string) {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
