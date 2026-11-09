export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  category?: string;
  image?: string;
}

// Fuente: respuesta JSON pública de geraldinemanriquez.com/wp-json/wp/v2/posts
// consultada el 27-oct-2026. Solo contiene los campos que devolvió WordPress.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'emprender-o-sobrevivir-bienvenida-a-una-nueva-revolucion',
    title: '¿Emprender o sobrevivir? Bienvenidas y bienvenidos a una nueva revolución',
    excerpt:
      'Si quieres dejar atrás un emprendimiento que solo depende de ti para sobrevivir, y comenzar a crear uno que también te dé estabilidad, tranquilidad y crecimiento, entonces este mensaje es para ti.',
    date: '2026-05-07T00:00:00',
    url: 'https://geraldinemanriquez.com/emprender-o-sobrevivir-bienvenida-a-una-nueva-revolucion/',
  },
  {
    slug: 'el-poder-de-ser-mujer-en-el-emprendimiento',
    title: 'El poder de ser mujer en el emprendimiento',
    excerpt:
      'La mujer en el emprendimiento y el liderazgo es como una arquitecta silenciosa: con manos firmes y un corazón inquebrantable, construye, sostiene y transforma. Muchas veces, sin siquiera ser consciente de ello, su impacto trasciende lo visible, porque no emprende solo para sí misma, sino para quienes la rodean.',
    date: '2025-05-17T00:00:00',
    url: 'https://geraldinemanriquez.com/el-poder-de-ser-mujer-en-el-emprendimiento/',
  },
  {
    slug: 'fuerza-de-voluntad',
    title: 'La fuerza de voluntad: Cómo impulsarte hacia el éxito en tu emprendimiento',
    excerpt:
      '¿Te has sentido estancado en tu emprendimiento? Esa fuerza que creías perdida es una de tus herramientas más valiosas. Como la fuerza centrífuga en una lavadora, tu energía puede llevarte al éxito. En este artículo, aprenderás a identificar y usar esa fuerza, y cómo aprovecharla para transformar tu vida y negocio.',
    date: '2025-01-14T00:00:00',
    url: 'https://geraldinemanriquez.com/fuerza-de-voluntad/',
  },
];

export function latestPosts(count: number): BlogPost[] {
  return [...BLOG_POSTS]
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, count);
}
