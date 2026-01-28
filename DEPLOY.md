# Deployment Instructions

Your portfolio uses a Node.js + Express server with a React client (Vite).

## 1. Prerequisites
- Node.js (v20+ recommended)
- NPM

## 2. Installation
To install all dependencies, run:
```bash
npm install
```

## 3. Build for Production
To create the optimized production build for both client and server:
```bash
npm run build
```
*This command compiles the React client to `dist/public` and the Node server to `dist/index.js`.*

## 4. Run Locally (Production Mode)
To test the production build locally:
```bash
npm start
```

## 5. Environment Variables
Ensure you have a `.env` file in the root directory with your API keys:
```
GEMINI_API_KEY=your_key_here
```

## 6. Going Live (e.g., Vercel, Render, Railway)
Since this is a full-stack app (not just static), you need a host that supports Node.js.
**Recommended: Railway or Render**

1. Push your code to GitHub.
2. Connect your repository to Railway/Render.
3. Use the following settings:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:** Add your `GEMINI_API_KEY`.
