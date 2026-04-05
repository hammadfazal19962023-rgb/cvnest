import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import { createServer as createViteServer } from 'vite'

// ✅ use NODE_ENV instead of dist folder check
const isDev = process.env.NODE_ENV !== 'production'

async function createServer() {
  const app = express()

  if (isDev) {
    const vite = await createViteServer({
      configFile: path.resolve(import.meta.dirname, 'vite.config.ts'),
      server: { middlewareMode: true },
      appType: 'custom',
    })

    app.use(vite.middlewares)

    // ✅ fix: added next as parameter
    app.get('/src/index.css', async (req, res, next) => {
      try {
        const mod = await vite.transformRequest('/src/index.css')
        if (mod) {
          res.set('Content-Type', 'text/css')
          res.end(mod.code)
        } else {
          next()
        }
      } catch (e) {
        next(e)  // ✅ now next is defined
      }
    })

    app.use(express.static(path.resolve(import.meta.dirname, 'public')))

    app.use('*', async (req, res, next) => {
      const url = req.originalUrl

      if (url.includes('.')) return next()

      try {
        let template = fs.readFileSync(
          path.resolve(import.meta.dirname, 'index.html'),
          'utf-8',
        )

        template = await vite.transformIndexHtml(url, template)

        if (!template.includes('rel="stylesheet"')) {
          template = template.replace(
            '</head>',
            '<link rel="stylesheet" href="/src/index.css"></head>'
          )
        }

        const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')

        const appHtml = await render(url)

        const html = template.replace('<!--ssr-outlet-->', appHtml)

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        vite.ssrFixStacktrace(e)
        next(e)
      }
    })

  } else {
    const distClient = path.resolve(import.meta.dirname, 'dist/client')
    const distServer = path.resolve(import.meta.dirname, 'dist/server')

    app.use('/assets', express.static(path.resolve(distClient, 'assets'), {
      maxAge: '1y',
      immutable: true,
    }))

    app.use(express.static(distClient, {
      index: false,
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.css')) {
          res.setHeader('Content-Type', 'text/css')
        }
        if (filePath.endsWith('.js')) {
          res.setHeader('Content-Type', 'application/javascript')
        }
      }
    }))

    app.use('*', async (req, res) => {
      try {
        const url = req.originalUrl

        const template = fs.readFileSync(
          path.resolve(distClient, 'index.html'),
          'utf-8'
        )

        const { render } = await import(
          path.resolve(distServer, 'entry-server.js')
        )

        const appHtml = await render(url)

        const html = template.replace('<!--ssr-outlet-->', appHtml)

        res.status(200).set({ 'Content-Type': 'text/html' }).end(html)
      } catch (e) {
        console.error(e)
        res.status(500).end(e.message)
      }
    })
  }

  app.listen(8080, () => {
    console.log(`✅ Server running at http://localhost:8080 (${isDev ? 'dev' : 'production'} mode)`)
  })
}

createServer()