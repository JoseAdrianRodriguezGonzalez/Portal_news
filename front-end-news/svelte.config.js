import adapter from '@sveltejs/adapter-vercel';
import preprocess from 'svelte-preprocess';
import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [preprocess(), vitePreprocess()],
  kit: {
    adapter: adapter(),
    vite: {
      server: {
        proxy: {
          '/api': {
            target: 'https://portalnews-production.up.railway.app',
            changeOrigin: true,
            secure: true,
            rewrite: path => path.replace(/^\/api/, '/api')
          }
        }
      }
    }
  }
};
export default config;


/** @type {import('@sveltejs/kit').Config} */


