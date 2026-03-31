import "./index.css"      // ✅ same here
import "./App.css"        // ✅ same here
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App'

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>
  )
}