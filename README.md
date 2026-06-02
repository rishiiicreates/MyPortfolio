# MyPortfolio

Personal portfolio website for **Hrishikesh Yadav** featuring interactive sections, animated UI, an AI assistant, and a built-in music player. The project uses a Vite + React frontend and a lightweight Express API for contact and chatbot endpoints.

## ✨ Features
- **Multi-section portfolio**: Hero, About, Education, Skills, Experience, Projects, Contact, and Footer.
- **AI chatbot** powered by Google Gemini (optional API key).
- **Interactive UI**: smooth scrolling, theme toggle, animated components, and playful on-page effects.
- **Music player** that persists across navigation.
- **Contact form API** with validation.
- **Responsive layout** and reusable UI components.

## 🧱 Tech Stack
**Frontend**
- React 18 + TypeScript
- Vite
- Tailwind CSS + Radix UI primitives
- Framer Motion
- Wouter (routing)

**Backend**
- Node.js + Express
- Zod validation
- Google GenAI SDK (Gemini)

**Tooling**
- Vite + ESBuild
- TypeScript (tsc check)
- Drizzle (schema config in `shared/`)

## 📁 Project Structure
```
.
├── client/                 # React frontend
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # UI + section components
│       ├── data/           # Portfolio data (projects, certificates, tracks)
│       ├── pages/          # Route pages
│       └── assets/         # Images and icons
├── server/                 # Express API (chat + contact)
├── shared/                 # Shared schema/types
├── dist/                   # Production build output
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js and npm installed

### Installation
```bash
git clone https://github.com/rishiiicreates/MyPortfolio.git
cd MyPortfolio
npm install
```

### Development
```bash
npm run dev
```
Runs the API server and the Vite client in development mode.

### Build
```bash
npm run build
```
Builds the client and bundles the server into `dist/`.

### Production Start
```bash
npm run start
```

### TypeScript Check
```bash
npm run check
```

## 🔐 Environment Variables
Create a `.env` file in the project root.

```
# Optional: enables AI chatbot responses
GEMINI_API_KEY=your_api_key_here

# Required only if you use drizzle migrations
DATABASE_URL=postgres_connection_string
```

## ✍️ Customization
- **Portfolio content**: `client/src/data/portfolioData.ts`
- **Music playlist**: `client/src/data/tracks.ts`
- **Images**: `client/src/assets/images/`
- **Sections & layout**: `client/src/components/` and `client/src/pages/`

## 🧪 API Endpoints
- `POST /api/contact` — contact form submission (validated with Zod)
- `POST /api/chat` — AI chatbot response (Gemini)
- `POST /api/chatbot` — legacy redirect to `/api/chat`

## 📄 License
MIT
