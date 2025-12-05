import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
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


