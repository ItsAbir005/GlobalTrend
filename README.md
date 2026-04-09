# Task Manager Application

A simple full-stack Task Manager application built with Node.js, Express, and React.

Live Demo: [https://global-trend-two.vercel.app](https://global-trend-two.vercel.app)


## Prerequisites

Before running the application, ensure you have the following installed:
- Node.js (v14.x or higher)
- npm (Node Package Manager)

## Project Structure

- /server: Express.js backend API
- /client: React.js frontend application (Vite)

## Backend Setup

1. Navigate to the server directory:
   cd server

2. Install dependencies:
   npm install

3. Start the server:
   npm start
   Note: The server will run on http://localhost:5000.

## Frontend Setup

1. Navigate to the client directory:
   cd client

2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev
   Note: The application will be accessible at http://localhost:5173.

## Features

- View a list of tasks fetched from the backend.
- Create new tasks.
- Toggle task completion status.
- Delete tasks.
- Responsive, modern UI with a focus on premium aesthetics.

## Technical Details

- Backend: Node.js, Express, CORS.
- Frontend: React, Vite, Axios, Lucide-React.
- Styling: Vanilla CSS with HSL variables and glassmorphism.
- Storage: In-memory task management (restarts when the server stops).

## Deployment on Vercel

To deploy this application on Vercel, follow these steps:

### Backend (Server)

1. Connect your GitHub repository to Vercel.
2. In the Vercel project settings, set the "Root Directory" to `server`.
3. Vercel will automatically detect the Node.js environment. 
4. Ensure your server is configured to export the app for serverless functions (e.g., in a `vercel.json` configuration).

### Frontend (Client)

1. Create a separate project on Vercel or use a monorepo setup.
2. Set the "Root Directory" to `client`.
3. The build command should be `npm run build` and the output directory should be `dist`.
4. Add an environment variable `VITE_API_URL` pointing to your deployed backend URL.
5. In your `client/src/api.js`, ensure it uses the environment variable:
   `const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/tasks';`

