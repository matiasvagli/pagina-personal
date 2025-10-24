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
    titulo: "El Error Que Siempre Cometemos: Modelando Relaciones Muchos-a-Muchos con Atributos (Pedido + Producto)",
    fecha: "Oct 2025",
    resumen: "En bases de datos y ORMs como Django, las relaciones Muchos-a-Muchos con datos extra (como cantidad o precio) no se resuelven con la configuración por defecto. La solución es siempre crear una tabla intermedia que actúe como 'rompe-relaciones' y guarde esos atributos clave, garantizando consultas limpias y performance optimizada.",
    contenido: `
      <h2>🤦‍♀️ El Problema Real: Pedidos con Productos y el Factor "Cantidad"</h2>
      <p>Si estás construyendo una aplicación de e-commerce, un sistema de gestión o cualquier cosa que implique transacciones, tarde o temprano te encuentras con la relación Muchos-a-Muchos con atributos.</p>
      
      <p>El caso más común es la relación entre Pedido y Producto. Un pedido puede tener muchos productos, y un producto puede estar en muchos pedidos. ¡Fácil! Pero el negocio exige detalles:</p>
      
      <ul>
        <li>✅ ¿Cuánta Cantidad de ese producto se pidió?</li>
        <li>✅ ¿Cuál era el Precio Unitario en ese momento del pedido (pueden cambiar)?</li>
        <li>✅ Necesidad de calcular el Subtotal y el Total</li>
      </ul>

      <h3>🎯 El Objetivo de la Consulta (Lo que el negocio pide)</h3>
      <p>Queremos pedirle a la base de datos una factura completa y detallada, algo así como:</p>
      <blockquote>"Dame el Pedido 1056 con cada producto, su cantidad, el precio de venta y el subtotal de esa línea."</blockquote>
      
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
            <td>$1200</td>
            <td>$6000</td>
          </tr>
          <tr>
            <td>Cajón 15kg</td>
            <td>2</td>
            <td>$9500</td>
            <td>$19000</td>
          </tr>
          <tr>
            <td>Bandeja</td>
            <td>10</td>
            <td>$300</td>
            <td>$3000</td>
          </tr>
        </tbody>
      </table>

      <h3>❌ El Modelo Incorrecto: El "Anti-Patrón" de la Lista de IDs</h3>
      <p>El error clásico, especialmente en la fase inicial, es intentar almacenar una lista de IDs en una columna del Pedido, pensando en la simplicidad:</p>
      
      <pre><code>CREATE TABLE pedidos (
  id SERIAL PRIMARY KEY,
  fecha TIMESTAMP,
  productos TEXT  -- ❌ ¡Grave error! Ejemplo: "1,5,7"
);</code></pre>

      <table>
        <thead>
          <tr>
            <th>Problema</th>
            <th>Motivo por el que esto rompe el proyecto</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>No hay atributos</td>
            <td>No puedo saber cuántos productos se vendieron (Cantidad) ni a qué precio.</td>
          </tr>
          <tr>
            <td>Imposible hacer JOIN</td>
            <td>La base de datos no puede cruzar TEXT con IDs de otras tablas.</td>
          </tr>
          <tr>
            <td>Consulta inútil</td>
            <td>Tienes que parsear strings y hacer lógica de negocio en la aplicación, no en la DB.</td>
          </tr>
          <tr>
            <td>Anti patrón</td>
            <td>No es escalable, no tiene integridad referencial y es imposible de auditar.</td>
          </tr>
        </tbody>
      </table>

      <h3>✅ El Modelo Correcto: La Tabla Intermedia (El Detalle)</h3>
      <p>La solución profesional, que respeta el principio de bases de datos relacionales, es introducir una tabla intermedia, la cual se convierte en la dueña de los atributos que dependen de ambas entidades. En este caso, la llamamos detalle_pedido.</p>

      <h4>SQL Puro: Rompiendo la Relación Muchos-a-Muchos</h4>
      <p>Esta tabla es la que lleva la carga de los atributos (cantidad y precio_unitario).</p>

      <pre><code>CREATE TABLE detalle_pedido (
  id SERIAL PRIMARY KEY,
  -- Foreign Keys (Llaves foráneas que rompen la relación)
  pedido_id INT REFERENCES pedidos(id),
  producto_id INT REFERENCES productos(id),
  -- Atributos de la relación
  cantidad INT NOT NULL,
  precio_unitario NUMERIC(10,2) NOT NULL
);

-- ✨ Opcional pero recomendado: Garantizar que un producto no se repita
-- ALTER TABLE detalle_pedido ADD CONSTRAINT detalle_unico 
-- UNIQUE (pedido_id, producto_id);</code></pre>

      <p>Ahora, la consulta es limpia, performante y se resuelve completamente en la base de datos (DB):</p>
      <pre><code>SELECT p.nombre, d.cantidad, d.precio_unitario,
       -- ¡Cálculo en la DB!
       (d.cantidad * d.precio_unitario) AS subtotal
FROM detalle_pedido d
JOIN productos p ON d.producto_id = p.id
WHERE d.pedido_id = 1056;</code></pre>

      <h3>🐍 Traducción a Django ORM: Usando through</h3>
      <p>El error más común en Django es usar el ManyToManyField directamente, que no permite almacenar la cantidad ni el precio:</p>

      <pre><code>class Pedido(models.Model):
    # productos = models.ManyToManyField(Producto)  # ❌ ERROR CLÁSICO
    pass</code></pre>

      <h4>El Modelo Correcto con through</h4>
      <p>La clave es definir la tabla intermedia (DetallePedido) como un modelo Django explícito, y luego indicarle al ManyToManyField que use ese modelo intermedio con el argumento through.</p>

      <pre><code>class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    precio_base = models.DecimalField(max_digits=10, decimal_places=2)

class Pedido(models.Model):
    fecha = models.DateTimeField(auto_now_add=True)
    # ✅ Le indicamos a Django que use nuestro modelo intermedio:
    productos = models.ManyToManyField(Producto, through='DetallePedido')

class DetallePedido(models.Model):
    # Foreign Keys explícitas:
    pedido = models.ForeignKey(Pedido, on_delete=models.CASCADE, related_name="detalles")
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    # Atributos de la relación:
    cantidad = models.PositiveIntegerField()
    precio_unitario = models.DecimalField(max_digits=10, decimal_places=2)

    @property
    def subtotal(self):
        # La lógica de cálculo queda encapsulada en el modelo
        return self.cantidad * self.precio_unitario</code></pre>

      <h3>🚀 Optimización de Rendimiento (prefetch_related)</h3>
      <p>Una vez modelado correctamente, hay que consultarlo bien. Si iteramos sobre los productos sin cuidado, Django podría generar la famosa N+1 query. Usamos prefetch_related para evitarla y traer toda la información con el mínimo de consultas.</p>

      <pre><code># Consulta optimizada: trae el pedido, sus detalles y los productos 
# relacionados en muy pocas queries.
pedido = Pedido.objects.prefetch_related("detalles__producto").get(id=1056)

# Iteración limpia y eficiente:
for item in pedido.detalles.all():
    # Accedemos a los atributos del Detalle (cantidad, subtotal)
    print(
        item.producto.nombre,    # Nombre del producto (relacionado)
        item.cantidad,           # Cantidad (atributo del Detalle)
        item.subtotal            # Subtotal (propiedad del Detalle)
    )</code></pre>

      <h3>🛠️ Regla de Backend Profesional</h3>
      <p>Si en una relación Muchos-a-Muchos necesitas guardar cualquier dato extra (cantidad, precio, fecha de asociación, estado), debes abandonar el ManyToMany automático y crear una tabla intermedia explícita.</p>
      
      <p>Este patrón te garantiza integridad referencial, consultas SQL limpias y la base para escalar tu aplicación.</p>

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
            <td>No se puede calcular subtotales</td>
            <td>Consultas limpias y útiles con JOIN</td>
          </tr>
          <tr>
            <td>Mal rendimiento (N+1 queries)</td>
            <td>Optimización con prefetch_related</td>
          </tr>
          <tr>
            <td>Cero escalabilidad</td>
            <td>Se pueden agregar descuentos, impuestos, etc.</td>
          </tr>
        </tbody>
      </table>

      <h3>Tech Stack</h3>
      <ul>
        <li><strong>Concepto:</strong> Bases de Datos Relacionales, Modelado</li>
        <li><strong>SQL:</strong> JOIN, REFERENCES</li>
        <li><strong>ORM:</strong> Django ManyToManyField, through, prefetch_related</li>
      </ul>
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
  },
  {
    titulo: "Caso técnico: Problema de indexación en Next.js + SEO",
    fecha: "Oct 2025",
    resumen: "Estaba padeciendo un problema de SEO frustrante (ya que lejos de ser experto) me tope con un caso de indexación fallida: Google se negaba a indexar nuestras páginas de contenido dinámico (/cabanas/[id]). El culpable era un tag canonical . Así fue como, usando la Metadata API de Next.js y un poco de investigación, logre que Google viera nuestras páginas.",
    contenido: `
      <h2>Problema</h2>
      <p>Google no estaba indexando las páginas dinámicas del sitio (ruta <code>/cabanas/[id]</code>). Tras investigar , y sabiendo del error de la consola donde se indicaba que el tag <code>canonical</code> en las páginas apuntaba a la página índice en lugar de la URL canónica individual , me di cuenta de que la configuración del tag <code>canonical</code> era incorrecta.</p>

      <h2>Resultado</h2>
      <p>Google no indexaba páginas dinámicas (<code>/cabanas/[id]</code>) por canonical incorrecto.</p>

      <h2>Solución</h2>
      <ol>
        <li><strong>Implementación de metadata dinámica con la Metadata API de Next.js:</strong> añadimos <code>generateMetadata</code> en la página dinámica para devolver <code>title</code>, <code>description</code> y <code>canonical</code> basados en el parámetro <code>id</code>.</li>
        <li><strong>OpenGraph dinámico:</strong> generamos tags <code>og:title</code>, <code>og:description</code> y <code>og:url</code> para mejorar la apariencia al compartir y la indexación.</li>
        <li><strong>Corrección de la estructura SEO en App Router:</strong> evitamos renderizar un canonical global desde el layout que sobreescribía cada página.</li>
        <li><strong>Verificación en Google Search Console:</strong> solicitamos reindexación y monitorizamos cobertura — las páginas comenzaron a aparecer después del recrawl.</li>
      </ol>

      <h3>Tech</h3>
      <ul>
        <li>Next.js 14</li>
        <li>Metadata API</li>
        <li>Vercel</li>
        <li>Google Search Console</li>
      </ul>
    `,
    tags: ["Next.js", "SEO", "Metadata", "Google"],
    url: "/notas/caso-indexacion-nextjs-seo"
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
