export type Project = {
  titulo: string;
  descripcion: string;
  descripcionExtensa?: string;
  stack: string[];
  resultado?: string | null;
  links: { demo: string | null; repo: string | null; caso: string | null };
  imagenes?: string[];
};

export const proyectos: Project[] = [
    {
      titulo: "CRUDfull – Generador modular de APIs con FastAPI",
      descripcion: "Mini framework CLI en Python que permite crear APIs completas en segundos con FastAPI, generando módulos, recursos CRUD, modelos, servicios, rutas, tests e infraestructura Docker. Arquitectura modular, soporte JWT y compatibilidad con PostgreSQL, MongoDB e in-memory.",
      descripcionExtensa: `
        <h3>Descripción</h3>
        <p>Mini framework/herramienta CLI desarrollada en Python que revoluciona la creación de APIs con FastAPI. Permite generar proyectos y recursos CRUD completos en segundos, automatizando la creación de módulos, modelos, esquemas, servicios, rutas, tests e infraestructura opcional con Docker. Compatible con PostgreSQL, MongoDB y modo in-memory, con arquitectura modular y soporte para autenticación JWT. Pensado para acelerar proyectos reales manteniendo buenas prácticas (Clean Architecture y organización por capas).</p>
        <h3>Características Principales</h3>
        <ul>
          <li>Generación automática de APIs CRUD completas</li>
          <li>Soporte para múltiples bases de datos (PostgreSQL, MongoDB, in-memory)</li>
          <li>Autenticación JWT integrada</li>
          <li>Arquitectura modular y escalable</li>
          <li>Generación de tests automáticos</li>
          <li>Dockerización automática de proyectos</li>
          <li>Organización por capas (Clean Architecture)</li>
          <li>CLI intuitiva y fácil de usar</li>
        </ul>
        <h3>Impacto</h3>
        <p>Acelera el desarrollo backend, reduce errores repetitivos y estandariza la estructura de proyectos profesionales. Proyecto en evolución activa orientado a la comunidad.</p>
      `,
      stack: ["Python", "FastAPI", "SQLAlchemy", "Beanie/MongoDB", "PostgreSQL", "Pytest", "Docker", "CLI (Typer)", "Pydantic", "MkDocs"],
      resultado: "Acelera el desarrollo backend, reduce errores repetitivos y estandariza la estructura de proyectos profesionales.",
      links: { demo: null, repo: "https://github.com/matiasvagli/crudfull", caso: null },
      imagenes: [],
    },
  {
    titulo: "Sistema de Control de Ventas (Distribuidora Avícola)",
    descripcion:
        "Ecosistema completo de gestión empresarial desarrollado en Django + React Native para una distribuidora avícola. Incluye sistema web con módulos de inventario, ventas, caja por turnos, finanzas y empleados, complementado con app móvil para ventas en campo, entrada de productos por QR, gestión de tareas y envío automático de tickets por WhatsApp. Solución integral que digitaliza completamente el negocio.",
    descripcionExtensa: `
      <h3>Desafío del Proyecto</h3>
      <p>La empresa distribuidora avícola enfrentaba problemas críticos de gestión: datos dispersos en planillas Excel, falta de control en tiempo real del inventario, dificultades para rastrear ventas, empleados trabajando con información desactualizada, gastos excesivos en papel para boletas, y falta de coordinación entre equipos de campo y oficina. Esto generaba errores operativos, pérdidas de stock, falta de visibilidad del negocio y procesos ineficientes.</p>
      
      <h3>Solución Implementada</h3>
      <p>Desarrollé un ecosistema completo que incluye sistema web y aplicación móvil, centralizando todas las operaciones empresariales:</p>
      
      <h4>🏢 Sistema Web Principal</h4>
      <ul>
        <li><strong>Módulo de Inventario:</strong> Gestión completa de productos, proveedores, stock inteligente con alertas automáticas de bajo stock, movimientos históricos y control por granja y categoría</li>
        <li><strong>Sistema de Ventas:</strong> Catálogo interactivo, pedidos con múltiples métodos de pago, comprobantes PDF automáticos, historial de clientes y integración con venta móvil</li>
        <li><strong>Control de Caja:</strong> Administración fluida por turnos de caja, arqueos automáticos, registro de gastos y retiros con control operativo completo</li>
        <li><strong>Módulo Financiero:</strong> Dashboard financiero con métricas clave, análisis de rentabilidad, precios históricos y reportes exportables</li>
        <li><strong>Gestión de Empleados:</strong> Control de personal, liquidaciones y comisiones automatizadas, manejo de sueldos y seguimiento de productividad</li>
        <li><strong>Módulo Especializado:</strong> Gestión específica para huevos con control por granja, categoría y conversiones de unidades</li>
      </ul>
      
      <h4>📱 Aplicación Móvil Complementaria</h4>
      <ul>
        <li><strong>Ventas Móviles:</strong> Realización de ventas desde cualquier ubicación con sincronización en tiempo real</li>
        <li><strong>Entrada de Productos:</strong> Sistema de ingreso mediante código QR para control preciso de inventario</li>
        <li><strong>Gestión de Tareas:</strong> Asignación y seguimiento de tareas individuales con alertas personalizadas</li>
        <li><strong>Lista de Clientes:</strong> Acceso completo a base de datos de clientes desde campo</li>
        <li><strong>Manejo de Proveedores:</strong> Gestión de proveedores y pedidos desde la aplicación móvil</li>
      </ul>
      
      <h4>🔄 Integraciones Automáticas</h4>
      <ul>
        <li><strong>WhatsApp API:</strong> Envío automático de tickets y comprobantes por WhatsApp</li>
        <li><strong>Sistema de Impresión:</strong> Solución completa para impresión digital, eliminando gastos de papel</li>
        <li><strong>Pedidos Online:</strong> Todos los pedidos se realizan mediante las aplicaciones, eliminando procesos manuales</li>
        <li><strong>Alertas Inteligentes:</strong> Notificaciones automáticas de bajo stock, tareas pendientes y eventos importantes</li>
      </ul>
      
      <h3>Arquitectura Técnica</h3>
      <p>El ecosistema utiliza una arquitectura robusta y escalable:</p>
      <ul>
        <li><strong>Backend:</strong> Django con arquitectura MVC, modelos relacionales optimizados y APIs REST</li>
        <li><strong>Base de Datos:</strong> PostgreSQL con índices estratégicos para consultas rápidas</li>
        <li><strong>Frontend Web:</strong> HTML/Tailwind CSS para interfaz responsive y moderna</li>
        <li><strong>Aplicación Móvil:</strong> React Native con sincronización bidireccional</li>
        <li><strong>Containerización:</strong> Docker completo con Docker Compose para desarrollo y producción</li>
        <li><strong>Infraestructura:</strong> Servidor local dockerizado con túnel Cloudflare para acceso externo seguro</li>
        <li><strong>Conectividad:</strong> Túnel Cloudflare configurado para permitir conexiones desde fuera del servidor</li>
        <li><strong>Integraciones:</strong> WhatsApp API para notificaciones automáticas</li>
        <li><strong>Seguridad:</strong> Autenticación robusta, permisos por roles y validación de datos</li>
      </ul>
      
      <h3>Infraestructura y Despliegue</h3>
      <p>Implementé una solución completa de infraestructura:</p>
      <ul>
        <li><strong>Servidor Dockerizado:</strong> Todo el sistema ejecutándose en contenedores Docker para máxima portabilidad</li>
        <li><strong>Túnel Cloudflare:</strong> Configuración de túnel para acceso seguro desde internet sin exponer puertos del servidor</li>
        <li><strong>Acceso Remoto:</strong> El cliente puede acceder al sistema desde cualquier ubicación de forma segura</li>
        <li><strong>Mantenimiento Simplificado:</strong> Actualizaciones y backups automatizados mediante Docker</li>
        <li><strong>Escalabilidad:</strong> Arquitectura preparada para crecimiento futuro del negocio</li>
      </ul>
      
      <h3>Impacto y Resultados</h3>
      <p>La implementación del ecosistema transformó completamente la operación de la empresa:</p>
      <ul>
        <li><strong>Digitalización Completa:</strong> Eliminación total de procesos manuales y planillas en papel</li>
        <li><strong>Control Financiero:</strong> Gestión en tiempo real de caja, gastos y flujo de efectivo</li>
        <li><strong>Trazabilidad Operativa:</strong> Seguimiento completo de inventario, ventas y empleados</li>
        <li><strong>Reducción de Costos:</strong> Eliminación de gastos en papel y procesos ineficientes</li>
        <li><strong>Mejora en Productividad:</strong> Coordinación perfecta entre equipos de campo y oficina</li>
        <li><strong>Alertas Inteligentes:</strong> Prevención proactiva de problemas operativos</li>
        <li><strong>Sistema en Producción:</strong> Actualmente en uso por cliente real con excelentes resultados</li>
      </ul>
    `,
    stack: ["Django", "PostgreSQL", "Docker", "React Native", "WhatsApp API", "QR Scanner", "HTML/Tailwind", "Cloudflare Tunnel"],
    resultado: "Digitalización completa del negocio, reducción de errores manuales, control financiero en tiempo real y mejora en trazabilidad operativa. Sistema en producción con cliente real.",
    links: { demo: null, repo: null, caso: "Código privado por ética profesional - Sistema en producción" },
    imagenes: ["/proyectos/sistema/s1.png", "/proyectos/sistema/s2.png", "/proyectos/sistema/s3.png", "/proyectos/sistema/s4.png", "/proyectos/sistema/s5.png", "/proyectos/sistema/s6.png", "/proyectos/sistema/s7.png", "/proyectos/sistema/s8.png", "/proyectos/sistema/s9.png", "/proyectos/sistema/s10.png" , "/proyectos/sistema/s11.png", "/proyectos/sistema/s12.png",  "/proyectos/sistema/s16.png", "/proyectos/sistema/s17.png", "/proyectos/sistema/s18.png", "/proyectos/sistema/s19.png", "/proyectos/sistema/s20.png" ,"/proyectos/sistema/s21.png", "/proyectos/sistema/s22.png", "/proyectos/sistema/s23.png"]
  },
  {
    titulo: "Coruja Casas Serranas – Sitio de alquiler Vacacional",
    descripcion:
      "Coruja Casas Serranas es una plataforma web para el alquiler de cabañas en las sierras de Córdoba/Traslasierra. El proyecto incluye un sitio rápido y responsive, optimizado para SEO y conversión. Permite gestionar propiedades, mostrar fichas visuales de cada cabaña, integrar mapas y recibir consultas desde la web mediante formularios conectados a email y WhatsApp.",
    descripcionExtensa: `
      <h3>Desafío del Proyecto</h3>
      <p>Coruja Casas Serranas necesitaba una presencia digital profesional para competir en el mercado de alquileres vacacionales. El desafío era crear un sitio web que no solo mostrara las propiedades de manera atractiva, sino que también optimizara la conversión de visitantes en consultas reales y reservas.</p>
      
      <h3>Solución Implementada</h3>
      <p>Desarrollé una plataforma web moderna y optimizada con las siguientes características:</p>
      <ul>
        <li><strong>Diseño Responsive:</strong> Experiencia perfecta en desktop, tablet y móvil</li>
        <li><strong>Galería de Imágenes:</strong> Presentación visual impactante de cada cabaña con navegación intuitiva</li>
        <li><strong>Sistema de Filtros:</strong> Búsqueda avanzada por capacidad, precio, ubicación y servicios</li>
        <li><strong>Integración de Mapas:</strong> Ubicación precisa de cada propiedad con Google Maps</li>
        <li><strong>Formularios de Contacto:</strong> Múltiples puntos de conversión conectados a email y WhatsApp</li>
        <li><strong>SEO Optimizado:</strong> Meta tags, estructura semántica y contenido optimizado para motores de búsqueda</li>
        <li><strong>Velocidad de Carga:</strong> Optimización de imágenes y código para tiempos de carga mínimos</li>
      </ul>
      
      <h3>Arquitectura Técnica</h3>
      <p>El sitio utiliza tecnologías modernas para garantizar rendimiento y escalabilidad:</p>
      <ul>
        <li><strong>Frontend:</strong> Next.js con React para renderizado del lado del servidor (SSR)</li>
        <li><strong>Estilos:</strong> Tailwind CSS para diseño responsive y mantenimiento eficiente</li>
        <li><strong>Despliegue:</strong> Vercel para hosting optimizado con CDN global</li>
        <li><strong>Optimización:</strong> Compresión de imágenes automática y lazy loading</li>
        <li><strong>Analytics:</strong> Integración con Google Analytics para seguimiento de conversiones</li>
      </ul>
      
      <h3>Impacto y Resultados</h3>
      <p>La implementación del sitio web transformó la presencia digital del negocio:</p>
      <ul>
        <li>Aumento del 300% en consultas online vs. métodos tradicionales</li>
        <li>Mejora significativa en el ranking de búsquedas locales</li>
        <li>Reducción del 60% en tiempo de respuesta a consultas</li>
        <li>Mayor profesionalismo percibido por los clientes</li>
        <li>Facilidad para actualizar contenido y agregar nuevas propiedades</li>
      </ul>
    `,
    stack: ["Next.js", "Tailwind", "Vercel"],
    resultado: "Mejor visibilidad y captación de consultas.",
    links: { demo: "https://corujacasasserranas.com.ar/", repo: null, caso: null },
    imagenes: ["/proyectos/coruja/c1.png", "/proyectos/coruja/c2.png" , "/proyectos/coruja/c3.png"]
  },
  {
    titulo: "App Móvil Huevo de Oro",
    descripcion: "Huevo de Oro es una aplicación móvil profesional desarrollada con React Native + Expo para la gestión operativa de una empresa de distribución. Centraliza ventas, inventario, despachos, empleados y tareas, permitiendo trabajar desde cualquier lugar, con sincronización en tiempo real contra un backend Django REST. Diseñada para uso productivo en el día a día del negocio, la app reemplaza procesos manuales y planillas dispersas, mejorando el control operativo y reduciendo errores.",
    descripcionExtensa: `
      <h3>Descripción del Proyecto</h3>
      <p>Aplicación móvil desarrollada para complementar el sistema de gestión de ventas de una distribuidora. Permite a los vendedores trabajar desde cualquier lugar, consultar información en tiempo real y operar incluso fuera de la oficina.</p>
      
      <p>Está conectada a una API backend propia y permite la consulta y descarga de comprobantes, gestión de clientes, ver historial de ventas y estado de cuenta, además de integración con WhatsApp para enviar facturas o recibos directamente al cliente.</p>
      
      <h3>✨ Características principales</h3>
      <ul>
        <li>✅ Login seguro con autenticación por token</li>
        <li>✅ Consulta de clientes y comprobantes desde el celular</li>
        <li>✅ Descarga de facturas/boletas en PDF</li>
        <li>✅ Filtro por fechas y búsqueda avanzada</li>
        <li>✅ Envío directo por WhatsApp</li>
        <li>✅ Pedidos online rápidos</li>
        <li>✅ Administración de stock en tiempo real</li>
        <li>✅ Alertas de tareas y stock bajo</li>
        <li>✅ Entregas por despacho mediante QR seguras</li>
        <li>✅ Ver pedidos y editarlos</li>
        <li>✅ Preparar pedidos pagados</li>
        <li>✅ Sección encargados para administrar empleados</li>
        <li>✅ Gestión de tareas y despachos</li>
        <li>✅ Interfaz simple y rápida</li>
        <li>✅ Conexión directa a API backend propia</li>
        <li>✅ Lista para usar en producción</li>
        <li>✅ Distribución por APK (Android)</li>
      </ul>
      
      <h3>🔧 Stack técnico</h3>
      <ul>
        <li><strong>Frontend móvil:</strong> React Native / Expo</li>
        <li><strong>Backend:</strong> Django REST Framework / FastAPI (según versión)</li>
        <li><strong>Autenticación:</strong> Token Auth</li>
        <li><strong>Base de datos:</strong> PostgreSQL</li>
      </ul>
      
      <h3>Funcionalidades Implementadas</h3>
      <ul>
        <li><strong>Autenticación:</strong> Sistema de login seguro con tokens de acceso</li>
        <li><strong>Consulta de Datos:</strong> Acceso completo a información de clientes y comprobantes</li>
        <li><strong>Descarga de PDFs:</strong> Generación y descarga de facturas y boletas</li>
        <li><strong>Filtros Avanzados:</strong> Búsqueda por fechas y criterios específicos</li>
        <li><strong>Integración WhatsApp:</strong> Envío directo de comprobantes a clientes</li>
        <li><strong>Pedidos Online:</strong> Creación rápida de pedidos desde cualquier ubicación</li>
        <li><strong>Gestión de Stock:</strong> Administración de inventario en tiempo real</li>
        <li><strong>Sistema de Alertas:</strong> Notificaciones automáticas de tareas y stock bajo</li>
        <li><strong>Despachos Seguros:</strong> Entregas controladas mediante códigos QR</li>
        <li><strong>Edición de Pedidos:</strong> Modificación y actualización de pedidos existentes</li>
        <li><strong>Preparación de Pedidos:</strong> Gestión de pedidos pagados y listos para entrega</li>
        <li><strong>Panel de Encargados:</strong> Administración completa de empleados y tareas</li>
        <li><strong>Gestión de Despachos:</strong> Control y seguimiento de entregas</li>
        <li><strong>Interfaz Optimizada:</strong> Diseño simple y rápido para uso móvil</li>
        <li><strong>API Propia:</strong> Conexión directa con backend desarrollado</li>
        <li><strong>Producción Ready:</strong> Aplicación lista para uso en producción</li>
        <li><strong>Distribución Android:</strong> APK para instalación en dispositivos Android</li>
      </ul>
      
      <h3>Impacto y Beneficios</h3>
      <p>La aplicación móvil revolucionó la operación de ventas:</p>
      <ul>
        <li>Acceso móvil completo a información del sistema</li>
        <li>Operación independiente de la oficina</li>
        <li>Envío inmediato de pedidos a la caja</li>
        <li>Reducción de tiempo en gestión administrativa</li>
        <li>Mejora en la experiencia del cliente</li>
        <li>Mayor eficiencia en procesos de venta</li>
        <li>Sistema de entrada seugro con palabra clave o codigo qr.</li>
      </ul>
    `,
    stack: ["React Native", "Django REST", "QR", "Expo", "Android APK"],
    resultado: "Build real con EAS + Android APK para instalación. Entrega rápida y mantenimiento simple.",
    links: { demo: null, repo: "https://github.com/matiasvagli/pagina-personal", caso: null },
    imagenes: ["/proyectos/appmovil/a1.png", "/proyectos/appmovil/a3.png", "/proyectos/appmovil/a4.png", "/proyectos/appmovil/a5.png", "/proyectos/appmovil/a6.png", "/proyectos/appmovil/a7.png", "/proyectos/appmovil/a8.png", "/proyectos/appmovil/a9.png", "/proyectos/appmovil/a10.png", "/proyectos/appmovil/a11.png", "/proyectos/appmovil/a12.png", "/proyectos/appmovil/a13.png"] 
  },
];

export function slugify(title: string) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remover acentos
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getProjectBySlug(slug: string) {
  return proyectos.find((p) => slugify(p.titulo) === slug) || null;
}
