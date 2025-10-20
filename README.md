# 📬 Real-Time AI Email Onebox

**Live Demo:** 🌐 [https://real-time-ai-email-onebox.netlify.app/](https://real-time-ai-email-onebox.netlify.app/)

A next-generation intelligent email assistant that performs **real-time synchronization, AI-powered categorization, semantic search, and automated reply generation** — all in one unified inbox.


## 🚀 Phase 0: Project Setup & Architecture Overview

### 🧱 Core Components
- **IMAP Sync Service** — Real-time email synchronization via IMAP `IDLE`.
- **Persistence Layer** — Combination of Elasticsearch (for search) and a Vector Database (for RAG).
- **API & Web Integration Layer** — Built using Node.js and TypeScript.

### ⚙️ Initializing the Project

```bash
# 1. Create Project Directory
mkdir reachinbox-onebox
cd reachinbox-onebox

# 2. Initialize Project
npm init -y

# 3. Add TypeScript
npm install typescript @types/node ts-node --save-dev
npx tsc --init

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

