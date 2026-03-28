import "./index.css"      // ✅ must be first
import "./App.css"        // ✅ if App.css exists (I can see it in your folder)
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'

hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter>
    <App />
  </BrowserRouter>
)