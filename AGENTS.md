# YaisBio Classroom - Instrucciones para Agentes IA

## Visión General del Proyecto

YaisBio Classroom es una plataforma educativa que transforma investigaciones de biología espacial de la NASA en aventuras de aprendizaje interactivas usando Google Gemini AI. La plataforma es bilingüe (español/inglés) y democratiza el acceso a la investigación espacial.

## Principios de Desarrollo

- **Código limpio**: Semántico, minimalista y bien documentado
- **Accesibilidad**: WCAG 2.1 AA compliance
- **Performance**: Lighthouse score >90, LCP <2.2s
- **Bilingüismo nativo**: Español e inglés con igual calidad
- **Inclusión cultural**: Enfoque en comunidades latinoamericanas
- **Impacto social**: Alineado con ODS (Objetivos de Desarrollo Sostenible)

## Stack Tecnológico

- **Framework**: Next.js 15 con App Router
- **Lenguaje**: TypeScript estricto
- **Estilos**: Tailwind CSS con tema espacial oscuro
- **UI**: shadcn/ui components
- **IA**: Google Gemini 2.0 Flash
- **Base de datos**: 608 papers de NASA GeneLab

## Estructura del Proyecto

```
📁 app/                    # Next.js App Router
├── 📁 api/               # API Routes
├── 📁 missions/          # Páginas de misiones
├── 📁 dashboard/         # Dashboard del usuario
└── 📁 analytics/         # Análisis de investigación

📁 components/            # Componentes React
├── 📁 ui/               # Componentes base (shadcn/ui)
└── 📁 dashboard/        # Componentes específicos

📁 lib/                   # Utilidades y datos
├── 📁 data/             # Datos estáticos (misiones, papers, badges)
├── gemini.ts            # Integración con Gemini AI
└── utils.ts             # Utilidades generales

📁 types/                 # Definiciones TypeScript
```

## Convenciones de Código

### TypeScript
- Usar TypeScript estricto
- Interfaces para objetos, types para unions
- Naming: PascalCase para tipos, camelCase para funciones
- Path aliases: `@/*` para imports desde raíz

### React Components
- Componentes funcionales con hooks
- Props tipadas con interfaces
- Usar `React.memo()` para componentes pesados
- Lazy loading para componentes grandes

### Estilos
- Tailwind CSS con clases utilitarias
- Tema espacial oscuro (slate-900 → purple-900)
- Efectos glassmorphism con backdrop-blur
- Colores por nivel: verde (beginner), amarillo (intermediate), rojo (advanced)

### APIs
- Next.js App Router API routes
- Validación con Zod
- Manejo de errores estandarizado
- Rate limiting implementado

## Integración con Gemini AI

### Configuración
- Modelo: gemini-2.0-flash
- Temperature: 0.7 (balance creatividad/precisión)
- Max tokens: 2048 por prompt
- Cache agresivo para reducir llamadas

### Funciones Principales
- `generateNarrative()`: Narrativas inmersivas por misión
- `generateLessons()`: Lecciones educativas estructuradas
- `generateQuestions()`: Preguntas de evaluación
- `evaluateAnswer()`: Feedback automático de respuestas

### Manejo de Errores
- Retry con backoff exponencial
- Fallback a contenido pre-generado
- Mensajes amigables para usuarios

## Soporte Bilingüe

### Estructura de Datos
- Todos los objetos tienen versiones ES/EN
- Campos: `title`/`titleEs`, `description`/`descriptionEs`
- Arrays: `concepts`/`conceptsEs` con misma longitud

### Renderizado
- Hook `useLanguage()` para manejo de estado
- Componente `LanguageToggle` para cambio dinámico
- Textos de interfaz en `lib/texts.ts`

### Validación
- Verificar que ambas versiones existan
- Misma estructura de datos en ambos idiomas
- Tests que validen contenido bilingüe

## Estructuras de Datos

### Mission
```typescript
interface Mission {
  id: string
  paperId: string
  title: string
  titleEs: string
  description: string
  descriptionEs: string
  level: DifficultyLevel
  duration: number
  concepts: string[]
  conceptsEs: string[]
  researchGap: string
  researchGapEs: string
}
```

### UserProgress
```typescript
interface UserProgress {
  code: string
  completedMissions: string[]
  answers: Record<string, any>
  badges: string[]
  language: Language
  createdAt: Date
  updatedAt: Date
}
```

### Badge
```typescript
interface Badge {
  id: string
  name: string
  nameEs: string
  description: string
  descriptionEs: string
  category: BadgeCategory
  criteria: string
}
```

## Testing

### Configuración
- Jest + React Testing Library
- Coverage threshold: 80%
- Tests de componentes, hooks, APIs y utilidades
- Tests de accesibilidad con jest-axe

### Tipos de Tests
- Unit tests para funciones puras
- Component tests para UI
- Integration tests para flujos completos
- E2E tests para casos críticos

## Performance

### Objetivos
- LCP < 2.2s
- FID < 90ms
- CLS < 0.1
- Bundle size < 500KB inicial

### Optimizaciones
- Code splitting con lazy loading
- Memoización estratégica
- Cache inteligente con TTL
- Image optimization con Next.js
- Virtualización para listas largas

## Accesibilidad

### Requisitos
- WCAG 2.1 AA compliance
- Soporte para screen readers
- Navegación por teclado
- Alto contraste
- Texto alternativo para imágenes

### Implementación
- Roles ARIA apropiados
- Focus management
- Estados de loading accesibles
- Mensajes de error claros

## Seguridad y Privacidad

### Datos del Usuario
- Recolección mínima (código de progreso, idioma)
- No se almacenan datos personales
- LocalStorage para preferencias
- Cookies solo esenciales

### Contenido
- Filtros de seguridad de Gemini
- Moderación de propuestas de experimentos
- Disclaimer de IA visible
- Política de privacidad clara

## Despliegue

### Producción
- Vercel (recomendado)
- Variables de entorno: `GEMINI_API_KEY`
- Dominio personalizado
- HTTPS automático

### Monitoreo
- Vercel Analytics
- Web Vitals tracking
- Error logging
- Performance monitoring

## Contribución

### Flujo de Trabajo
1. Crear feature branch
2. Implementar cambios siguiendo convenciones
3. Escribir tests
4. Verificar accesibilidad y performance
5. Crear pull request

### Estándares de Código
- ESLint + Prettier
- Conventional commits
- Code review obligatorio
- Tests requeridos para nuevas features

## Recursos Adicionales

### Documentación
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com/)
- [Google Gemini API](https://ai.google.dev/docs)

### Herramientas
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [React DevTools](https://react.dev/learn/react-developer-tools)

---

**Nota**: Estas instrucciones deben seguirse para mantener la consistencia y calidad del proyecto YaisBio Classroom. Cualquier desviación debe ser justificada y documentada.
