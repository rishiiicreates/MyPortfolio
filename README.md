<div align="center">
  <h1>🚀 MyPortfolio</h1>
  <p>A modern, full-stack personal portfolio website showcasing my engineering and design projects.</p>
</div>

---

## 📖 Overview

**MyPortfolio** is a highly interactive and visually stunning personal portfolio built by [rishiiicreates](https://github.com/rishiiicreates). It serves as a central hub for all my software development projects, technical writing, and autonomous agent research. 

This project uses a modern web stack, featuring a responsive masonry layout, parallax scroll effects, and dynamic data rendering.

## 🛠 Tech Stack

### Frontend
- **React.js** & **Vite**: For lightning-fast rendering and build times.
- **Tailwind CSS**: For utility-first styling and fluid, responsive layouts.
- **Framer Motion** (or similar animation libraries): To drive parallax effects and smooth transitions.

### Backend & Data
- **Node.js** & **Express**: Serving API routes securely and efficiently.
- **Drizzle ORM**: Type-safe database queries and schema management.
- **TypeScript**: End-to-end type safety across the `client/`, `server/`, and `shared/` directories.

## 💻 Featured Projects

The portfolio natively links to several of my flagship projects, including:

1. **RAWFY**: A universal web perception skill for AI agents.
2. **DOUBT SOLVER**: A local Retrieval-Augmented Generation (RAG) pipeline academic assistant.
3. **EMAIL TRIAGE AGENT**: An OpenEnv-compliant benchmarking API for evaluating LLM agents.
4. **3D SOLAR SYSTEM**: An interactive 3D WebGL experience featuring planetary orbits and realistic textures.
5. And more...

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18+ recommended)
- `npm` or `yarn` installed

### Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rishiiicreates/MyPortfolio.git
   cd MyPortfolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   - Create a `.env` file in the root directory.
   - Refer to the database and server configuration requirements needed for Drizzle ORM and your local server setup.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The app will typically be available at `http://localhost:5000` or whatever port is configured in Vite/Express.

## 🚢 Deployment

This project contains a `dist` build output, meaning it can be easily containerized or hosted on platforms like Vercel, Netlify, or Render. Build the production output by running:
```bash
npm run build
```

## 🤝 Contributing
Contributions, issues, and feature requests are always welcome! Feel free to check the [issues page](https://github.com/rishiiicreates/MyPortfolio/issues).

## 📜 License
This project is licensed under the MIT License.
