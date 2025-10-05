# Documento de Especificaciones para Sitio Web
## YaisBio Classroom - Plataforma Educativa de Biología Espacial
## (CONTINUACIÓN)

---

## 8. BACKEND Y DATOS (CONTINUACIÓN)

### 8.1 Base de Datos (Continuación)

**generated_modules (cache):**
- id, mission_id, parameters_hash (nivel + idioma + personalizaciones)
- narrative_content, lessons_content (JSON), questions_content (JSON)
- gap_content, generated_at, access_count

**feedback:**
- id, mission_id, user_code (opcional)
- rating (1-5), comment, language, timestamp

**experiment_proposals:**
- id, user_code, mission_id, title, description
- ai_feedback, created_at

---

### 8.2 APIs Necesarias

**Autenticación/Progreso:**
- POST /api/progress/save (genera código, guarda estado)
- GET /api/progress/:code (recupera estado)
- PUT /api/progress/:code (actualiza al avanzar en módulo)

**Contenido:**
- GET /api/missions (filtros: nivel, idioma, keywords)
- GET /api/missions/:id
- GET /api/papers (lista de 10 con resúmenes)
- GET /api/papers/:id (detalles completos)

**Generación IA:**
- POST /api/generate/module (body: mission_id, level, language, personalizations)
  - Verifica cache primero
  - Si no existe: Llama a Gemini API con prompts secuenciales
  - Guarda resultado en cache
  - Retorna contenido generado
- POST /api/evaluate/answer (body: answer_text, expected_facts, language, level)
  - Llama a Gemini API
  - Retorna feedback + clasificación

**Recursos:**
- GET /api/glossary?term=X&lang=es (términos bilingües)
- GET /api/suggestions?completed_mission=X&lang=es (sugerencias de misiones)

**Badges:**
- GET /api/badges/:code (badges obtenidos por código)
- POST /api/badges/check (verifica si usuario desbloqueó nuevo badge)

**Feedback:**
- POST /api/feedback (guarda opiniones de usuarios)

**Propuestas:**
- POST /api/proposals (guarda idea de experimento)
- POST /api/proposals/evaluate (envía a Gemini para feedback)

---

### 8.3 Integración con Gemini API

**Configuración:**
- Modelo: gemini-1.5-pro (para generación de narrativas complejas)
- Temperature: 0.7 (balance creatividad/precisión)
- Max tokens: 2048 por prompt
- Safety settings: Block only HIGH harmful content (STEM educativo)

**Rate Limiting:**
- 60 requests/minuto por IP
- Cache agresivo para reducir llamadas repetitivas

**Error Handling:**
- Si Gemini falla: Mensaje amigable "Gemini está ocupado, intenta en 30 segundos"
- Retry automático 2 veces con backoff exponencial
- Fallback: Contenido pre-generado genérico (solo para MVP)

---

### 8.4 Almacenamiento de Archivos

**Ilustraciones:**
- Cloud Storage (AWS S3 / Google Cloud Storage)
- Estructura: /missions/[mission-id]/[language]/[image-name].webp
- CDN para distribución global

**PDFs de Resúmenes:**
- Generados on-demand con library (jsPDF o similar)
- No almacenados (se regeneran cada vez)

**Badges:**
- SVG pre-diseñados: /badges/[badge-id].svg
- Optimizados y comprimidos

---

## 9. SEGURIDAD Y PRIVACIDAD

### 9.1 Datos del Usuario

**Recolección Mínima (MVP sin login):**
- Código de progreso (no contiene info personal)
- Idioma preferido (cookie)
- Respuestas en módulos (asociadas a código, no a identidad)

**No se recolecta:**
- Nombres reales
- Emails (excepto si usuario envía resumen por email, voluntario)
- Ubicación geográfica precisa

### 9.2 Protección de Datos

**LocalStorage:**
- Uso: Guardar preferencias (idioma, modo oscuro futuro)
- Encriptación: No necesaria (datos no sensibles)
- Clear on logout: N/A para MVP

**Cookies:**
- Esenciales: Idioma, código de sesión temporal (24h)
- Analytics: Opt-in via banner (como YAIS Lab)
- No third-party tracking cookies

### 9.3 Contenido Seguro para Menores

**Filtros:**
- Todo contenido generado por Gemini revisado por safety filters
- Papers NASA son académicos (inherentemente seguros)
- Moderación de propuestas de experimentos (revisión manual en v2)

**Disclaimer para Padres/Educadores:**
- Página "Para Educadores" con:
  - Explicación de cómo funciona la IA
  - Qué datos se recolectan (ninguno personal)
  - Recomendaciones de uso en aula
  - Contacto para feedback

---

## 10. CONTENIDO INICIAL (MVP)

### 10.1 10 Misiones Base (Una por Paper)

**Listado Completo con Detalles:**

**Misión 1: "Entrenamiento Espacial de Ratones"**
- Paper: Mice in Bion-M 1 Space Mission
- Nivel recomendado: Principiante
- Duración: 10 min
- Narrativa: Usuario es entrenador de animales preparando ratones para Bion-M 1
- Conceptos: Adaptación biológica, experimentos con modelos animales
- Brecha: Falta data sobre efectos psicológicos del entrenamiento

**Misión 2: "Crisis Ósea en Microgravedad"**
- Paper: Microgravity Induces Pelvic Bone Loss
- Nivel recomendado: Intermedio
- Duración: 12 min
- Narrativa: Usuario es médico en ISS investigando pérdida ósea de astronautas
- Conceptos: Osteoclastos, osteocitos, ciclo celular CDKN1a/p21
- Brecha: Tratamientos para prevenir pérdida ósea a largo plazo

**Misión 3: "Regeneración Estelar"**
- Paper: Stem Cell Health and Tissue Regeneration in Microgravity
- Nivel recomendado: Intermedio
- Duración: 15 min
- Narrativa: Usuario es biólogo regenerativo estudiando células madre en ISS
- Conceptos: Pluripotencia, diferenciación celular, señalización mecánica
- Brecha: Efectos a largo plazo (>6 meses), reversibilidad

**Misión 4: "Células Embrionarias en el Espacio"**
- Paper: Microgravity Reduces Differentiation of Embryonic Stem Cells
- Nivel recomendado: Avanzado
- Duración: 15 min
- Narrativa: Usuario es investigador de desarrollo embrionario en órbita
- Conceptos: Oct4, Sox2, vías de señalización, expresión génica
- Brecha: Mecanismos moleculares exactos, gravedad marciana

**Misión 5: "ARN en Órbita"**
- Paper: RNA Isolation and qPCR on ISS
- Nivel recomendado: Avanzado
- Duración: 12 min
- Narrativa: Usuario es genetista validando tecnología de análisis genético en ISS
- Conceptos: RT-PCR, expresión génica, validación de sistemas
- Brecha: Aplicación a largo plazo, automatización completa

**Misión 6: "Corazón Bajo Estrés"**
- Paper: Oxidative Stress in Heart During Spaceflight
- Nivel recomendado: Intermedio
- Duración: 13 min
- Narrativa: Usuario es cardiólogo espacial analizando salud cardiovascular
- Conceptos: Estrés oxidativo, ciclo celular, expresión génica cardíaca
- Brecha: Ejercicio como contramedida, efectos acumulativos

**Misión 7: "Radiación y Esqueleto"**
- Paper: Dose-Dependent Oxidative Stress in Skeletal System
- Nivel recomendado: Avanzado
- Duración: 14 min
- Narrativa: Usuario es radioproteccionista estudiando efectos de radiación iónica
- Conceptos: Dosis de radiación, estrés oxidativo óseo, protección
- Brecha: Diferencias por tipo de ion, dosis acumulativas en viajes largos

**Misión 8: "De la Ciencia a Marte"**
- Paper: From Bench to Exploration Medicine
- Nivel recomendado: Principiante-Intermedio
- Duración: 11 min
- Narrativa: Usuario es planificador de misiones traduciendo investigación a aplicaciones
- Conceptos: Investigación traslacional, medicina de exploración, aplicaciones terrestres
- Brecha: Priorización de investigaciones para Artemis/Mars

**Misión 9: "Pruebas de Resistencia Ósea"**
- Paper: High-Precision Cyclic Loading Method
- Nivel recomendado: Avanzado
- Duración: 13 min
- Narrativa: Usuario es ingeniero biomédico desarrollando métodos de prueba
- Conceptos: Carga cíclica, calidad ósea, metodologías de evaluación
- Brecha: Aplicación en microgravedad real, validación con humanos

**Misión 10: "Gravedad Marciana"**
- Paper: Mars Gravity vs Normal Gravity on Pre-Osteoblasts
- Nivel recomendado: Intermedio-Avanzado
- Duración: 14 min
- Narrativa: Usuario es científico preparando colonización de Marte
- Conceptos: Gravedad simulada, diferenciación de pre-osteoblastos, 0.38g
- Brecha: Datos en gravedad marciana real, efectos generacionales

---

### 10.2 Badges Iniciales (20 para MVP)

**Categoría: Primeros Pasos**
1. **Despegue Exitoso** - "Completaste tu primera misión"
2. **Políglota Espacial** - "Completaste una misión en ambos idiomas"
3. **Explorador Completo** - "Viste todas las 10 misiones"

**Categoría: Especialistas Temáticos**
4. **Guardián de Huesos** - "Domina pérdida ósea en microgravedad"
5. **Maestro de Células Madre** - "Completa 2 misiones sobre células madre"
6. **Protector Cardiovascular** - "Entiende estrés oxidativo en corazón"
7. **Genetista Orbital** - "Domina análisis genético en ISS"
8. **Radioprotector** - "Comprende efectos de radiación"

**Categoría: Niveles de Dificultad**
9. **Principiante Estelar** - "Completa 3 misiones en nivel principiante"
10. **Científico Intermedio** - "Completa 5 misiones en intermedio"
11. **Experto Espacial** - "Completa 3 misiones en avanzado"

**Categoría: Conocimiento**
12. **Respondedor Perfecto** - "100% correctas en 3 misiones"
13. **Aprendiz Persistente** - "Repite una misión para mejorar"
14. **Preguntón** - "Responde 50 preguntas en total"

**Categoría: Comunidad e Impacto**
15. **Compartidor** - "Comparte 3 badges en redes"
16. **Archivista** - "Descarga 5 resúmenes"
17. **Visionario** - "Propone 1 experimento"
18. **Crítico Constructivo** - "Deja feedback en 3 misiones"

**Categoría: Especiales**
19. **Pionero YAIS Bio** - "Registrado en primer mes de lanzamiento"
20. **Completista** - "Completa las 10 misiones base"

---

### 10.3 Glosario Inicial (50 Términos Bilingües)

Ejemplos:
- **Microgravedad / Microgravity**: Condición de gravedad extremadamente débil (10^-6 g) experimentada en órbita.
- **Osteoclasto / Osteoclast**: Célula que descompone tejido óseo, activa en pérdida ósea espacial.
- **Célula Madre / Stem Cell**: Célula no especializada capaz de diferenciarse en tipos celulares específicos.
- **Diferenciación / Differentiation**: Proceso por el cual una célula se especializa en un tipo celular específico.
- **Estrés Oxidativo / Oxidative Stress**: Daño celular por desequilibrio entre radicales libres y antioxidantes.
- **ISS / ISS**: International Space Station, estación espacial internacional.
- **RT-PCR**: Reacción en cadena de polimerasa en tiempo real, técnica de análisis genético.
- [... 43 términos más]

---

## 11. ROADMAP POST-MVP

### Fase 2 (3-6 meses post-lanzamiento)

**Contenido:**
- Expandir a 100 papers (de los 608 disponibles)
- 30+ misiones nuevas
- Series temáticas: "Camino a Marte", "Biología de Plantas Espaciales"
- Integración de datos OSDR: Imágenes reales de experimentos

**Funcionalidades:**
- **Login completo**: Cuentas permanentes (email/OAuth)
- **Modo Colaborativo**: Grupos de clase pueden completar misiones juntos
- **Leaderboards**: Rankings por escuela/país (opt-in)
- **Creador de Misiones Custom**: Usuarios suben papers para generar módulos
- **Audio Narrativo**: Narración de historias con voces IA (español/inglés)

**Comunidad:**
- Foro por misión para discusiones
- "Spotlight Científico": Entrevistas con investigadores de papers
- Competencias mensuales: "Mejor propuesta de experimento"

---

### Fase 3 (6-12 meses)

**Expansión de Contenido:**
- Todos los 608 papers disponibles
- Series especializadas: Microbios, Plantas, Humanos, Animales
- Módulos VR/AR (experimentales)

**Idiomas:**
- Portugués (Brasil)
- Francés
- Mandarín (China)

**Educación Formal:**
- Certificaciones para educadores
- Planes de clase descargables
- Integración con LMS (Moodle, Canvas)

**Gamificación Avanzada:**
- Avatares personalizables
- "Nave espacial" que se mejora con badges
- Eventos en vivo: "Misiones comunitarias" sincronizadas

---

## 12. MÉTRICAS DE ÉXITO

### KPIs Primarios (Primeros 6 meses)

**Adopción:**
- 3,000+ códigos de progreso únicos generados
- 1,000+ usuarios activos mensuales
- 50+ educadores registrados (via contacto)

**Engagement:**
- 8,000+ misiones completadas
- Tasa de completitud de misiones: >65%
- Tiempo promedio por misión: 12-15 min (según diseñado)

**Aprendizaje:**
- Puntuación promedio en preguntas: >75%
- 500+ badges "Respondedor Perfecto" otorgados
- 2,000+ resúmenes descargados

**Comunidad:**
- 100+ propuestas de experimentos enviadas
- 500+ shares en redes sociales
- 20+ escuelas usando la plataforma (tracked via feedback)

**Bilingüismo:**
- 50/50 uso español/inglés
- <5% de usuarios cambian idioma mid-mission (indica buena traducción)

---

### KPIs Secundarios

**Calidad:**
- Rating promedio de misiones: >4.3/5
- Tasa de abandono mid-mission: <20%
- Feedback positivo: >80% de comentarios

**Técnicos:**
- Gemini response time: <5s en 90% de requests
- Uptime: >99.3%
- Error rate: <1.5%

**Impacto Educativo (Encuestas post-misión):**
- 70%+ usuarios reportan "Aprendí algo nuevo"
- 60%+ usuarios reportan "Más interesado en STEM"
- 40%+ usuarios completan más de 3 misiones (engagement sostenido)

---

## 13. INTEGRACIÓN CON ECOSISTEMA YAIS

### 13.1 Conexiones con YAIS Lab

**Cross-Promotion:**
- Banner en YaisBio Classroom: "¿Quieres aprender a crear la IA detrás de esta plataforma? Visita YAIS Lab"
- Banner en YAIS Lab: "Aplica IA a la Biología Espacial en YaisBio Classroom"

**Contenido Compartido:**
- Path en YAIS Lab: "IA para Ciencias de la Vida"
  - Incluye módulo sobre cómo Gemini genera narrativas educativas
  - Lab práctico: "Crea tu propio módulo educativo con Gemini"

**Usuarios Compartidos:**
- Login unificado (Fase 2): Una cuenta YAIS para ambas plataformas
- Badges cross-platform: "Maestro YAIS" (completa paths en Lab + misiones en Bio)

---

### 13.2 Conexión con IA for Good Hackathones

**Preparación para ODS 3 (Salud):**
- Path especial: "Bio Espacial para Salud Terrestre"
  - Misiones: Células madre (regeneración), corazón (estrés), huesos (osteoporosis)
  - Enfoque: Cómo investigación espacial beneficia medicina en Tierra
  - Badge: "Hacker Bio Preparado"

**Recursos para Participantes:**
- Sección "Para Hackathones":
  - Datasets de papers en formato CSV
  - Ideas de proyectos: "Usa IA para analizar papers NASA", "Crea chatbot educativo bio"
  - Templates de código para análisis de datos biológicos

**Eventos Sincronizados:**
- Pre-hackathon: "Semana de Bio Espacial" con misiones temáticas
- Durante hackathon: Módulos express (5 min) sobre papers relevantes

---

### 13.3 Branding Consistente

**Visual:**
- Logo YaisBio usa mismo typeface que YAIS Lab (Inter/Exo 2)
- Verde espacial (#00D084) complementa púrpura de YAIS Lab
- Ilustraciones mantienen estilo isométrico/futurista

**Tono de Voz:**
- Inspirador pero accesible (como YAIS Lab)
- Bilingüe desde el core (ambos productos)
- Enfoque en comunidad latina + escalabilidad global

**Footer Compartido:**
- "Parte del Ecosistema YAIS" con links:
  - YAIS Lab (Aprende IA Generativa)
  - IA for Good (Hackathones ODS)
  - YaisBio Classroom (Biología Espacial)
  - Contacto unificado: hola@yais.org

---

## 14. CONSIDERACIONES FINALES

### 14.1 Accesibilidad (Reforzada)

**Más allá de WCAG AA:**
- Transcripciones completas de narrativas (para screen readers)
- Opción "Modo Lectura Fácil": Simplifica narrativas automáticamente
- Subtítulos en futuros videos/audio
- Compatibilidad con lectores de pantalla en español e inglés
- Ajuste de velocidad de lectura (para usuarios con dislexia)

### 14.2 Inclusión Cultural (América Latina)

**Ejemplos Localizados:**
- Narrativas mencionan contextos latinos cuando relevante
  - Ej: "Como médico en Bolivia estudiando osteoporosis, entiendes la importancia de..."
- Nombres de personajes en narrativas: Diversidad latina (María, Carlos, Ana)
- Fechas/horarios: Formatos latinoamericanos (DD/MM/YYYY)

**Colaboraciones:**
- Universidades latinas para testeo beta (UTEPSA, UAGRM, UNAM, etc.)
- Traducción revisada por hablantes nativos de español latinoamericano (no España)

---

### 14.3 Sostenibilidad del Proyecto

**Costos Estimados (MVP):**
- Hosting: $150-200/mes (Vercel + Cloud Storage)
- Gemini API: $300-500/mes (5K usuarios, cache agresivo)
- Dominio + SSL: $50/año
- **Total mensual:** ~$500-700

**Con 3K usuarios:**
- Hosting: $250-350/mes
- Gemini API: $600-900/mes
- **Total:** ~$900-1,250/mes

**Estrategias de Financiamiento:**
- Google Cloud Education Grants (para Gemini API)
- Sponsors: NASA Space Apps (reconocimiento)
- Donaciones voluntarias (footer)
- v3: Tier escolar premium ($5/mes/aula, pero 80% contenido gratis)

---

### 14.4 Plan de Lanzamiento

**Pre-Lanzamiento (4 semanas antes):**
- Landing page con countdown
- Registro de early access (200 beta testers)
- Posts en redes YAIS: Teasers de misiones

**Soft Launch (2 semanas):**
- Beta con educadores seleccionados
- Recolección de feedback intensiva
- Ajustes críticos

**Lanzamiento Oficial:**
- Anuncio en NASA Space Apps Challenge 2025
- Press release: "Plataforma bilingüe convierte papers NASA en aventuras educativas"
- Demo en vivo: Misión completa en 12 minutos
- Colaboración con influencers STEM latinos

**Post-Lanzamiento (1 mes):**
- Webinar para educadores: "Cómo usar YaisBio en tu clase"
- Challenge en redes: "Completa 3 misiones y comparte tu badge"
- Reporte de impacto: Métricas iniciales

---

## 15. CHECKLIST PRE-LANZAMIENTO

### Técnico
- [ ] Dominio configurado (yaisbio.org o yais.bio)
- [ ] Backend APIs funcionando (generación, evaluación, progreso)
- [ ] Integración Gemini API testeada (100 requests)
- [ ] Cache de módulos funcionando correctamente
- [ ] Frontend responsive en 6 dispositivos (iPhone, Android, iPad, laptops)
- [ ] Cambio de idioma instantáneo sin bugs
- [ ] Todas las 10 misiones generan correctamente en ES/EN
- [ ] PDFs de resúmenes se generan sin errores
- [ ] Sistema de códigos de progreso guardando/recuperando estado
- [ ] Performance: LCP <2.2s, FID <90ms

### Contenido
- [ ] 10 papers subidos con metadata completa (ES/EN)
- [ ] Resúmenes de papers pre-generados (100 palabras c/u)
- [ ] Prompts de Gemini optimizados y testeados (narrativas, lecciones, preguntas)
- [ ] 50 términos de glosario bilingüe
- [ ] 20 badges diseñados (SVG optimizados)
- [ ] Ilustraciones de las 10 misiones (2 por misión: thumbnail + hero)
- [ ] Textos de interfaz 100% bilingües (botones, labels, mensajes)
- [ ] 3 misiones testeadas end-to-end por usuarios reales

### Legal y Ética
- [ ] Disclaimer de IA visible en cada módulo
- [ ] Citas a papers NASA correctas y verificadas
- [ ] Política de Privacidad (mínima recolección de datos)
- [ ] Términos de Uso simples (plataforma educativa gratuita)
- [ ] Cookie consent (solo esenciales por default)
- [ ] Página "Para Padres/Educadores" explicando seguridad
- [ ] Guía de uso responsable de IA para estudiantes

### Educativo
- [ ] 5 educadores han probado MVP (feedback incorporado)
- [ ] Plan de clase ejemplo para profesores (descargable)
- [ ] FAQ para educadores: "¿Cómo evaluar aprendizaje?", "¿Es preciso el contenido?"
- [ ] Validación científica: 2 biólogos/científicos revisaron misiones
- [ ] Niveles (principiante/intermedio/avanzado) apropiados para edades

### Marketing
- [ ] Landing page completa (ES/EN)
- [ ] Video demo de 2 minutos (misión completa acelerada)
- [ ] 10 posts de redes preparados (launch week)
- [ ] Email a lista YAIS anunciando YaisBio
- [ ] Materiales para NASA Space Apps (slides, one-pager)
- [ ] Press kit: Logos, screenshots, fact sheet

---

## CONCLUSIÓN

YaisBio Classroom representa la **expansión educativa del ecosistema YAIS hacia las ciencias de la vida**, aplicando IA Generativa (Gemini) para hacer accesible la investigación espacial de la NASA a audiencias latinas y globales. La plataforma innova en:

✅ **Narrativas Inmersivas:** No solo leer papers, sino "vivirlos" como misiones espaciales  
✅ **Bilingüismo Nativo:** Español e inglés con igual calidad desde el core  
✅ **IA Educativa Responsable:** Gemini como tutor, con transparencia y validación científica  
✅ **Inclusión Latina:** Diseñada para comunidades hispanohablantes subrepresentadas en STEM  
✅ **Conexión con Ecosistema YAIS:** Complementa YAIS Lab y prepara para IA for Good hackathones  

**Diferenciadores vs Plataformas Educativas:**
- Único en transformar papers científicos en narrativas gamificadas bilingües
- Uso innovador de IA generativa para personalización (nivel, tono, idioma)
- Enfoque en brechas de investigación, inspirando curiosidad científica
- Gratis y accesible, sin barreras para estudiantes latinos

**Próximos Pasos Críticos:**
1. Desarrollar MVP en 6-8 semanas (frontend + backend + Gemini integration)
2. Beta testing con 50 educadores latinos (feedback en 2 semanas)
3. Preparar las 10 misiones base con calidad AAA
4. Optimizar prompts de Gemini (testing A/B con diferentes narrativas)
5. Lanzamiento oficial en NASA Space Apps Challenge 2025 (meta: reconocimiento global)

**Visión a Largo Plazo:**  
YaisBio Classroom se convertirá en la **plataforma de referencia para educación en biología espacial en español**, alimentando vocaciones STEM en América Latina, generando propuestas de experimentos innovadoras desde estudiantes jóvenes, y conectando investigación de élite (NASA) con audiencias globales de manera accesible y culturalmente relevante.

---

**Documento preparado para:** YAIS - Young Artificial Intelligence Society  
**Proyecto:** YaisBio Classroom - Plataforma Educativa de Biología Espacial  
**Complemento de:** YAIS Lab + IA for Good  
**Versión:** 1.0  
**Fecha:** 5 de octubre de 2025