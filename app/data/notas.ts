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
    titulo: "Cómo modelar correctamente una relación muchos-a-muchos con atributos",
    fecha: "Oct 2025",
    resumen: "Caso real: pedidos y productos. Cómo evitar el error clásico del ManyToMany mal entendido.",
    contenido: `
      <h2>El problema real: pedidos con productos</h2>
      <p>En el mundo real, cuando empezamos a construir aplicaciones con bases de datos relacionales, tarde o temprano aparece esta situación: una relación muchos-a-muchos necesita información adicional.</p>
      
      <p>El ejemplo más común es un <strong>Pedido con Productos</strong>: un pedido puede tener muchos productos y cada producto puede estar en muchos pedidos. Hasta ahí parece simple. Pero la realidad del negocio agrega detalles:</p>
      
      <ul>
        <li>✅ Cada producto tiene cantidad</li>
        <li>✅ Cada producto puede tener un precio distinto para ese pedido</li>
        <li>✅ Y necesitamos calcular subtotal y total</li>
      </ul>

      <h3>🎯 Qué queremos consultar (objetivo real)</h3>
      <p>Queremos poder pedirle a la base de datos algo así:</p>
      <blockquote>"Dame el pedido 1056 con todos sus productos, cantidades y subtotales"</blockquote>
      
      <p><strong>Resultado esperado:</strong></p>
      <table>
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Maple 30 huevos</td>
            <td>5</td>
            <td>1200</td>
            <td>6000</td>
          </tr>
          <tr>
            <td>Cajón 15kg</td>
            <td>2</td>
            <td>9500</td>
            <td>19000</td>
          </tr>
          <tr>
            <td>Bandeja</td>
            <td>10</td>
            <td>300</td>
            <td>3000</td>
          </tr>
        </tbody>
      </table>

      <h3>❌ Modelo incorrecto (el error clásico)</h3>
      <p>Muchos modelan mal el pedido usando una columna lista con ids:</p>
      
      <pre><code>CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  fecha TIMESTAMP,
  productos TEXT  -- ejemplo: "1,5,7"
);</code></pre>

      <p>Y después intentan consultar así:</p>
      <pre><code>SELECT productos FROM pedidos WHERE id = 1056;</code></pre>

      <p><strong>Salida:</strong> <code>"1,5,7"</code></p>

      <h4>¿Por qué esto está mal?</h4>
      <table>
        <thead>
          <tr>
            <th>Problema</th>
            <th>Motivo</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>No hay cantidades</td>
            <td>No puedo saber cuántos productos se vendieron</td>
          </tr>
          <tr>
            <td>No hay precios</td>
            <td>No puedo calcular nada</td>
          </tr>
          <tr>
            <td>No puedo hacer JOIN</td>
            <td>No puedo unir con tabla de productos</td>
          </tr>
          <tr>
            <td>Consulta inútil</td>
            <td>Tengo que parsear strings 😵</td>
          </tr>
          <tr>
            <td>Anti patrón</td>
            <td>No sirve para producción</td>
          </tr>
        </tbody>
      </table>

      <h3>✅ Modelo correcto (relación muchos-a-muchos con atributos)</h3>
      <p>La solución profesional es crear una tabla intermedia que represente el detalle del pedido.</p>

      <pre><code>CREATE TABLE detalle_pedido (
  id SERIAL PRIMARY KEY,
  pedido_id INT REFERENCES pedidos(id),
  producto_id INT REFERENCES productos(id),
  cantidad INT NOT NULL,
  precio_unitario NUMERIC(10,2) NOT NULL
);</code></pre>

      <p>Ahora sí podemos consultar correctamente:</p>
      <pre><code>SELECT p.nombre, d.cantidad, d.precio_unitario,
       (d.cantidad * d.precio_unitario) AS subtotal
FROM detalle_pedido d
JOIN productos p ON d.producto_id = p.id
WHERE d.pedido_id = 1056;</code></pre>

      <h3>🐍 Django ORM: error típico</h3>
      <p>Muchos intentan esto al principio:</p>
      <pre><code>class Pedido(models.Model):
    productos = models.ManyToManyField(Producto)  # ❌ MAL</code></pre>

      <p><strong>Problema:</strong> no hay lugar para guardar cantidad ni precio. El proyecto después se rompe.</p>

      <h3>✅ Django ORM: modelo correcto con through</h3>
      <pre><code>class Pedido(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)

class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio_base = models.DecimalField(max_digits=10, decimal_places=2)

class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def subtotal(self):
        return self.cantidad * self.precio_unitario</code></pre>

      <h3>🚀 Consulta optimizada en Django (prefetch_related)</h3>
      <pre><code>pedido = Pedido.objects.prefetch_related("detalles__producto").get(id=1056)

for item in pedido.detalles.all():
    print(item.producto.nombre, item.cantidad, item.subtotal)</code></pre>

      <h3>✅ ¿Por qué va así?</h3>
      <ul>
        <li><strong>through:</strong> permite definir modelo intermedio con atributos</li>
        <li><strong>prefetch_related:</strong> evita N+1 queries y mejora performance</li>
      </ul>

      <h3>📊 Comparación final</h3>
      <table>
        <thead>
          <tr>
            <th>Incorrecto ❌</th>
            <th>Correcto ✅</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>ManyToManyField directo</td>
            <td>Modelo intermedio con through</td>
          </tr>
          <tr>
            <td>No se puede consultar bien</td>
            <td>Consultas limpias y útiles</td>
          </tr>
          <tr>
            <td>No escala</td>
            <td>Se puede agregar descuentos, impuestos, etc</td>
          </tr>
          <tr>
            <td>Mal rendimiento</td>
            <td>Optimización con prefetch_related</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <p><strong>🔧 Regla de backend real:</strong></p>
        <p>Si en una relación muchos-a-muchos hay datos extra, siempre usá una tabla intermedia.</p>
      </blockquote>
    `,
    tags: ["Django", "Bases de Datos", "ORM", "Modelado", "SQL"],
    url: "/notas/como-modelar-correctamente-relacion-muchos-a-muchos-con-atributos"
  },
  {
    titulo: "Docker para backenders: setup profesional con Django + Postgres",
    fecha: "Oct 2025",
    resumen: "Guía clara para containerizar backends Django con PostgreSQL usando buenas prácticas profesionales.",
    contenido: `
      <h2>El problema real: "funciona en mi máquina"</h2>
      <p>Cuando trabajamos en backend, una de las partes más difíciles no es escribir código: es hacerlo funcionar igual en todos lados. Que funcione en tu máquina está bien, pero no sirve si falla cuando lo subís al servidor o cuando lo quiere probar otro dev.</p>
      
      <p>Ahí entra <strong>Docker</strong>. Docker permite empaquetar tu backend con todas sus dependencias, para que se ejecute igual en desarrollo y producción. Es decir: <em>si corre en tu contenedor, corre en cualquier parte</em>.</p>

      <p>En esta guía vamos a ver cómo usar Docker de forma clara y profesional para un backend real con Django + Postgres, usando buenas prácticas de backend moderno.</p>

      <h3>🎯 ¿Qué vamos a construir?</h3>
      <p>Un backend real para un <strong>Sistema de Gestión de Ventas</strong> con:</p>
      <ul>
        <li>✅ Backend: Django</li>
        <li>✅ Base de datos: PostgreSQL</li>
        <li>✅ Servicios levantados con docker-compose</li>
        <li>✅ Volúmenes para persistencia de datos</li>
        <li>✅ Variables de entorno .env</li>
        <li>✅ Dockerfile para desarrollo y producción</li>
      </ul>

      <h3>1. Dockerfile básico (modo desarrollo)</h3>
      <p>El Dockerfile define cómo construir el contenedor de tu backend.</p>
      
      <h4>Opción A: Debian Slim (recomendada para desarrollo)</h4>
      <pre><code># Usar imagen oficial de Python 3.11 (versión slim para menor tamaño)
FROM python:3.11-slim

# Establecer directorio de trabajo dentro del contenedor
WORKDIR /app

# Instalar dependencias del sistema (cliente PostgreSQL)
RUN apt-get update && apt-get install -y \\
    postgresql-client \\
    && rm -rf /var/lib/apt/lists/*

# Copiar archivo de dependencias Python
COPY requirements.txt .

# Instalar dependencias Python (sin cache para reducir tamaño)
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código de la aplicación
COPY . .

# Comando por defecto: levantar servidor de desarrollo Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]</code></pre>

      <h4>Opción B: Alpine Linux (súper liviana para producción)</h4>
      <pre><code># Usar Alpine Linux (mucho más liviana)
FROM python:3.11-alpine

# Establecer directorio de trabajo
WORKDIR /app

# Alpine usa 'apk' en lugar de 'apt-get'
RUN apk add --no-cache postgresql-client

# Copiar requirements e instalar dependencias Python
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Comando por defecto
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]</code></pre>

      <h4>📊 ¿Cuál elegir?</h4>
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Tamaño</th>
            <th>Cuándo usar</th>
            <th>Pros</th>
            <th>Contras</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>python:3.11-slim</code></td>
            <td>~45MB</td>
            <td>Desarrollo y proyectos complejos</td>
            <td>✅ Compatibilidad total<br>✅ Fácil de usar<br>✅ Bash shell</td>
            <td>❌ Más pesada</td>
          </tr>
          <tr>
            <td><code>python:3.11-alpine</code></td>
            <td>~15MB</td>
            <td>Producción y microservicios</td>
            <td>✅ Súper liviana<br>✅ Más segura<br>✅ Ideal para deploy</td>
            <td>❌ Puede tener problemas con algunas librerías<br>❌ Shell 'sh' en lugar de 'bash'</td>
          </tr>
        </tbody>
      </table>

      <blockquote>
        <p><strong>💡 Regla práctica:</strong></p>
        <p>Empezá con <code>python:3.11-slim</code> para desarrollo. Si necesitás optimizar tamaño en producción y no tenés problemas con las dependencias, cambiá a <code>python:3.11-alpine</code>.</p>
      </blockquote>

      <p>Este archivo crea un entorno Python limpio con dependencias instaladas y levanta Django dentro del contenedor con tu código.</p>

      <h3>2. Dockerfile para producción (multi-stage)</h3>
      <p>En producción, el contenedor debe ser más liviano y seguro. Para eso usamos <strong>multi-stage build</strong>:</p>

      <pre><code># Etapa 1: Construcción (builder)
FROM python:3.11-slim as builder
WORKDIR /app

# Copiar requirements e instalar dependencias
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Etapa 2: Producción (imagen final más liviana)
FROM python:3.11-slim
WORKDIR /app

# Copiar solo las dependencias instaladas desde la etapa builder
COPY --from=builder /root/.local /root/.local

# Agregar dependencias al PATH
ENV PATH=/root/.local/bin:$PATH

# Copiar código de la aplicación
COPY . .

# Comando de producción: usar Gunicorn (servidor WSGI profesional)
CMD ["gunicorn", "mi_proyecto.wsgi:application", "--bind", "0.0.0.0:8000"]</code></pre>

      <h4>Beneficios del multi-stage:</h4>
      <ul>
        <li>✅ Imagen más chica</li>
        <li>✅ Más rápida de construir</li>
        <li>✅ Lista para deploy real</li>
      </ul>

      <h3>3. docker-compose.yml – Desarrollo real con Postgres</h3>
      <pre><code>version: '3.8'

services:
  # Servicio de base de datos PostgreSQL
  db:
    image: postgres:15  # Versión específica, no 'latest'
    environment:
      POSTGRES_DB: ventas_db      # Nombre de la base de datos
      POSTGRES_USER: postgres     # Usuario de la base de datos
      POSTGRES_PASSWORD: postgres # Contraseña (cambiar en producción)
    volumes:
      # Volumen persistente para que los datos no se pierdan
      - postgres_data:/var/lib/postgresql/data

  # Servicio de aplicación Django
  web:
    build: .  # Construir desde Dockerfile local
    command: python manage.py runserver 0.0.0.0:8000
    volumes:
      # Montar código local para desarrollo en tiempo real
      - .:/app
    ports:
      # Exponer puerto 8000 del contenedor al puerto 8000 del host
      - "8000:8000"
    depends_on:
      # Esperar a que la base de datos esté lista
      - db
    environment:
      - DEBUG=1
      # URL de conexión a la base de datos
      - DATABASE_URL=postgresql://postgres:postgres@db:5432/ventas_db

# Definir volúmenes persistentes
volumes:
  postgres_data:</code></pre>

      <h4>¿Por qué funciona así?</h4>
      <ul>
        <li>✅ <strong>volumes</strong> garantiza que los datos no se pierdan</li>
        <li>✅ <strong>depends_on</strong> hace que Django espere a Postgres</li>
        <li>✅ Claridad total: backend y base de datos en 2 contenedores limpios</li>
      </ul>

      <h3>4. Variables de entorno (.env)</h3>
      <p>Nunca pongas credenciales en el código. Usá <code>.env</code>:</p>

      <pre><code># Base de datos
POSTGRES_DB=ventas_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres

# Django
SECRET_KEY=tu_clave_secreta_super_segura
DEBUG=1

# URLs
DATABASE_URL=postgresql://postgres:postgres@db:5432/ventas_db</code></pre>

      <p>Y en <code>docker-compose.yml</code>:</p>
      <pre><code>services:
  web:
    # ... otras configuraciones
    env_file:
      - .env  # Cargar variables desde archivo .env</code></pre>

      <h3>5. Health check (opcional pero profesional)</h3>
      <p>Esto permite monitorear si el contenedor está vivo y respondiendo:</p>

      <pre><code># En el Dockerfile
HEALTHCHECK --interval=30s --timeout=5s --retries=3 \\
  CMD curl -f http://localhost:8000/ || exit 1</code></pre>

      <h3>✅ Buenas prácticas finales</h3>
      <table>
        <thead>
          <tr>
            <th>Práctica</th>
            <th>¿Por qué?</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Usá imágenes específicas</td>
            <td>python:3.11-slim, no latest</td>
          </tr>
          <tr>
            <td>Separá desarrollo y producción</td>
            <td>Diferentes necesidades, diferentes configuraciones</td>
          </tr>
          <tr>
            <td>Usá volúmenes para datos</td>
            <td>No perder información al reiniciar contenedores</td>
          </tr>
          <tr>
            <td>No metas secretos en el repo</td>
            <td>Usá .env y gestión de secretos</td>
          </tr>
          <tr>
            <td>Contenedores simples</td>
            <td>Proyectos mantenibles y escalables</td>
          </tr>
          <tr>
            <td>Problemas comunes con Alpine</td>
            <td>Algunas librerías necesitan dependencias de compilación</td>
          </tr>
        </tbody>
      </table>

      <h4>⚠️ Problemas comunes con Alpine Linux</h4>
      <p>Si elegiste Alpine y tenés problemas con algunas librerías Python, podés necesitar instalar dependencias de compilación:</p>
      
      <pre><code># Para librerías que necesitan compilación (ej: psycopg2, Pillow)
FROM python:3.11-alpine

RUN apk add --no-cache \\
    postgresql-client \\
    postgresql-dev \\
    gcc \\
    musl-dev \\
    libffi-dev

# Resto del Dockerfile...</code></pre>

      <p><strong>Librerías problemáticas comunes:</strong></p>
      <ul>
        <li><code>psycopg2</code> (PostgreSQL adapter)</li>
        <li><code>Pillow</code> (procesamiento de imágenes)</li>
        <li><code>cryptography</code> (encriptación)</li>
        <li><code>lxml</code> (XML processing)</li>
      </ul>

      <h3>🚀 Comandos útiles</h3>
      <pre><code># Levantar todo el entorno
docker-compose up --build

# Levantar en segundo plano
docker-compose up -d

# Ver logs
docker-compose logs -f web

# Ejecutar comandos Django
docker-compose exec web python manage.py migrate
docker-compose exec web python manage.py createsuperuser

# Parar todo
docker-compose down

# Parar y eliminar volúmenes (¡CUIDADO!)
docker-compose down -v</code></pre>

      <blockquote>
        <p><strong>🔧 Regla de Docker real:</strong></p>
        <p>Docker no es solo moda: es una herramienta clave para backenders. Te permite tener entornos consistentes, facilitar despliegues y trabajar bien con bases de datos como Postgres sin instalar nada en tu máquina.</p>
      </blockquote>

      <h3>Conclusión</h3>
      <p>Con este setup básico, ya tenés una base profesional para llevar tu backend a producción real sin dolores de cabeza. Docker te da la confianza de que si funciona en tu contenedor, va a funcionar en cualquier servidor.</p>
    `,
    tags: ["Docker", "Django", "PostgreSQL", "DevOps", "Backend"],
    url: "/notas/docker-backenders-setup-profesional-django-postgres"
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
