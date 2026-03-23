import { exec } from 'child_process';
import { promisify } from 'util';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs/promises';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function prerender() {
  console.log('📦 Building the app...');
  
  // Build the app with Vite
  await execAsync('npm run build');
  
  console.log('🌐 Starting preview server...');
  
  // Start preview server (run in background)
  const previewProcess = exec('npx serve -s dist -l 3000', {
    detached: true,
    stdio: 'pipe'
  });
  
  // Wait for server to be ready
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  console.log('🤖 Launching Chromium for pre-rendering...');
  
  // Launch lightweight Chromium
  const browser = await puppeteer.launch({
    args: [
      ...chromium.args,
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
  });
  
  const page = await browser.newPage();
  
  // Get all routes - you need to define your app's routes here
  // For a single page app, we only need to prerender index.html
  // The SPA will handle routing client-side
  const routes = ['/']; // Add other routes if you have multiple entry points
  
  for (const route of routes) {
    console.log(`📄 Pre-rendering ${route || '/'}...`);
    
    try {
      await page.goto(`http://localhost:3000${route}`, {
        waitUntil: 'networkidle0',
        timeout: 30000,
      });
      
      // Wait a bit for any dynamic content to load
      await page.waitForTimeout(2000);
      
      // Get the fully rendered HTML
      const html = await page.content();
      
      // Determine file path
      let filePath;
      if (route === '/' || route === '') {
        filePath = join(__dirname, 'dist', 'index.html');
      } else {
        // Create subdirectory for nested routes if needed
        const routePath = route.startsWith('/') ? route.slice(1) : route;
        filePath = join(__dirname, 'dist', routePath, 'index.html');
      }
      
      // Ensure directory exists
      const dir = filePath.substring(0, filePath.lastIndexOf('/'));
      await fs.mkdir(dir, { recursive: true });
      
      // Write the pre-rendered HTML
      await fs.writeFile(filePath, html);
      console.log(`✅ Saved pre-rendered HTML to ${filePath}`);
      
    } catch (error) {
      console.error(`❌ Failed to pre-render ${route}:`, error);
    }
  }
  
  await browser.close();
  
  // Kill the preview server
  if (previewProcess.pid) {
    process.kill(-previewProcess.pid);
  }
  
  console.log('✨ Pre-rendering complete!');
  
  // Verify that index.html was updated
  const indexHtml = await fs.readFile(join(__dirname, 'dist', 'index.html'), 'utf-8');
  if (indexHtml.includes('<div id="root"></div>')) {
    console.log('⚠️ Warning: Index.html still has empty root div. Pre-rendering may not have worked.');
  } else {
    console.log('🎉 Success! Root div contains content.');
  }
}

prerender().catch(console.error);