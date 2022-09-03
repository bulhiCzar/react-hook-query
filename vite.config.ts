import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import eslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const isProd = configEnv.mode === 'production'
  const isDev = configEnv.mode === 'development'

  if (isDev) {
    return {
      plugins: [
        react(),
        eslint(),
      ],
    }
  }

  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        formats: ['umd'],
        name: 'query',
        fileName: (format) => `lib.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-router-dom'],
        output: {
          globals: {
            react: 'React',
            'react-router-dom': 'ReactRouterDom',
          },
        },
      },
    }
  }
})
