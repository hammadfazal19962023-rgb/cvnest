import fs from 'node:fs'
import path from 'node:path'
import express from 'express'
import { createServer as createViteServer } from 'vite'

async function createServer() {
  const app = express()

  const vite = await createViteServer({
    configFile: path.resolve(import.meta.dirname, 'vite.config.ts'), // ✅ key fix
    server: { middlewareMode: true },
    appType: 'custom',
  })

  app.use(vite.middlewares)

  app.get('/src/index.css', async (req, res) => {
    try {
      const mod = await vite.transformRequest('/src/index.css')
      if (mod) {
        res.set('Content-Type', 'text/css')
        res.end(mod.code)
      }
    } catch (e) {
      next(e)
    }
  })
  app.use(express.static(path.resolve(import.meta.dirname, 'public')))

  app.use('*all', async (req, res, next) => {
    const url = req.originalUrl

    // Skip non-page requests
    if (url.includes('.')) return next()

    try {
      let template = fs.readFileSync(
        path.resolve(import.meta.dirname, 'index.html'),
        'utf-8',
      )

      template = await vite.transformIndexHtml(url, template)

      // After transformIndexHtml, manually inject CSS link if missing
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


  app.listen(8080, () => {
    console.log('✅ Server running at http://localhost:8080')
  })
}

createServer()