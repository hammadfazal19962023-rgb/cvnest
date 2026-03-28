import fs from 'node:fs'
import path from 'node:path'
import express from 'express'

const app = express()

const distClient = path.resolve(process.cwd(), 'dist/client')
const distServer = path.resolve(process.cwd(), 'dist/server')

// serve static files
app.use(express.static(distClient, { index: false }))

app.use('*', async (req, res) => {
  try {
    const url = req.originalUrl

    // read built HTML template
    const template = fs.readFileSync(
      path.resolve(distClient, 'index.html'),
      'utf-8'
    )

    // import built server bundle
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