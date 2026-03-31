import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import express from 'express'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const app = express()

const distClient = path.resolve(__dirname, '../dist/client')
const distServer = path.resolve(__dirname, '../dist/server')

app.use(express.static(distClient, { index: false }))

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