// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import preact from '@astrojs/preact';
import tailwindcss from '@tailwindcss/vite';

// Web estática, sin servidor. Pensada para usarse en local (npm run preview) o en un hosting estático.
// En GitHub Pages el sitio cuelga de /IAMedica---Learning-path/; en local, npm run preview lo sirve igual.
export default defineConfig({
  site: 'https://ialbertogpt.github.io',
  base: '/IAMedica---Learning-path/',
  trailingSlash: 'always',
  // Astro 7 cambió el valor por defecto a 'jsx', que puede comerse espacios entre elementos en línea.
  compressHTML: true,
  build: { format: 'directory' },
  devToolbar: { enabled: false },
  integrations: [mdx(), preact()],
  vite: {
    plugins: [tailwindcss()],
    // El tokenizador real (~2,4 MB) solo se descarga si el alumno lo pide en el interactivo de 1.5.
    build: { chunkSizeWarningLimit: 3000 },
  },
});
