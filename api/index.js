import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

const distClient = path.resolve(__dirname, '../dist/client')
const distServer = path.resolve(__dirname, '../dist/server')

// ✅ explicitly serve assets with correct headers
app.use('/assets', express.static(path.resolve(distClient, 'assets'), {
  maxAge: '1y',
  immutable: true,
}))

// ✅ serve everything else in dist/client
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

export default app