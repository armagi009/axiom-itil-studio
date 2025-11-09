# Axiom ITIL Studio

An AI-powered ITSM platform that reimagines the ITIL 4 framework as a programmable operating system. It uses intelligent, configurable AI agents to automate core practices like Incident, Problem, and Change Management, helping Managed Service Providers (MSPs) eliminate manual toil and translate operational efficiency into measurable revenue growth.

[cloudflarebutton]

## Table of Contents

- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Development](#development)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [License](#license)

## Key Features

- **Studio Dashboard**: A real-time command center to monitor autonomous operations, key performance metrics (Hours Saved, MTTR, ROI), and a timeline of agent activities.
- **Plugin Factory**: A gallery of configurable AI agents corresponding to ITIL practices. Customize each agent's persona, triggers, decision logic, and playbooks.
- **Savings Ledger**: The financial hub of the studio. Visualize cost savings over time, generate 'ITIL Savings Statement' PDF reports, and manage the automated pricing model.
- **Contributor Hub**: A gamified portal for human-in-the-loop data labeling to continuously improve AI accuracy.
- **Modern UI/UX**: A sophisticated dark-themed interface built with shadcn/ui, Framer Motion for smooth animations, and Recharts for data visualization.

## Technology Stack

- **Frontend**:
  - [React](https://react.dev/)
  - [Vite](https://vitejs.dev/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [shadcn/ui](https://ui.shadcn.com/)
  - [Framer Motion](https://www.framer.com/motion/)
  - [Recharts](https://recharts.org/)
  - [Zustand](https://zustand-demo.pmnd.rs/)

- **Backend**:
  - [Cloudflare Workers](https://workers.cloudflare.com/)
  - [Hono](https://hono.dev/)
  - [Durable Objects](https://developers.cloudflare.com/durable-objects/)

- **AI & Integrations**:
  - [Cloudflare AI Gateway](https://developers.cloudflare.com/ai-gateway/)
  - [OpenAI SDK](https://www.npmjs.com/package/openai)

## Getting Started

Follow these instructions to get the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [Bun](https://bun.sh/)
- [Git](https://git-scm.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd axiom-itil-studio
    ```

2.  **Install dependencies:**
    This project uses Bun for package management.
    ```bash
    bun install
    ```

### Environment Variables

The application requires Cloudflare AI Gateway credentials to function.

1.  **Create a `.dev.vars` file** in the root of the project by copying the example:
    ```bash
    cp .dev.vars.example .dev.vars
    ```

2.  **Update `.dev.vars`** with your Cloudflare credentials:
    ```ini
    # .dev.vars

    # Your Cloudflare AI Gateway URL
    # Format: https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/openai
    CF_AI_BASE_URL="your-gateway-url"

    # Your Cloudflare API Key for the AI Gateway
    CF_AI_API_KEY="your-cloudflare-api-key"
    ```

## Development

To run the application in development mode, which includes hot-reloading for the frontend and the local worker environment:

```bash
bun run dev
```

This will start the Vite development server for the React application and the Wrangler development server for the Cloudflare Worker. You can access the application at `http://localhost:3000`.

## Deployment

This project is designed for easy deployment to Cloudflare's global network.

1.  **Log in to Wrangler:**
    If you haven't already, authenticate with your Cloudflare account.
    ```bash
    npx wrangler login
    ```

2.  **Deploy the application:**
    Run the deploy script, which will build the application and deploy it to Cloudflare Pages and Workers.
    ```bash
    bun run deploy
    ```

Alternatively, you can deploy your own version of this project with a single click.

[cloudflarebutton]

## Project Structure

The codebase is organized into two main directories:

-   `src/`: Contains all the frontend code, including React components, pages, hooks, and styles.
-   `worker/`: Contains the backend Cloudflare Worker code, including the Hono API routes, Durable Object classes, and AI agent logic.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.