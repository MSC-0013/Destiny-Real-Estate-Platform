# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/660b0f74-8a3a-46a6-b8b9-697d318db115

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/660b0f74-8a3a-46a6-b8b9-697d318db115) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

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

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/660b0f74-8a3a-46a6-b8b9-697d318db115) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
# Destiny-Real-Estate-Platform

## Backend (Local)

A lightweight Express backend is included for auth, orders, properties, contact and construction workflows.

Run locally:

```
npm run server
```

Run frontend and backend together:

```
npm run dev:all
```

Base URL: `http://localhost:8080`

Key endpoints:
- MongoDB setup:

Create a `.env` file in project root (see `.env.example` format below) and run Mongo locally:

```
MONGODB_URI=mongodb://127.0.0.1:27017/destiny
MONGODB_DB=destiny
JWT_SECRET=change-me
PORT=8080
VITE_API_BASE=http://localhost:8080/api
```

Then start both servers with `npm run dev:all`.

- `GET /api/properties` – list properties (query: `city`, `type`)
- `GET /api/properties/:id` – property detail
- `POST /api/auth/signup` – create user
- `POST /api/auth/login` – login user
- `GET /api/auth/me` – current user (mock token)
- `GET /api/orders` – list orders
- `POST /api/orders` – create order
- `GET /api/orders/:id` – order detail
- `GET /api/contact` – supports `service` and `model` query, e.g. `/api/contact?service=construction&model=hm-005`
- `POST /api/contact` – submit contact ticket
- `GET /api/construction/contracts` – list construction contracts
- `POST /api/construction/contracts` – create contract
- `POST /api/construction/contracts/:id/approve` – approve contract
- `POST /api/construction/contracts/:id/reject` – reject contract