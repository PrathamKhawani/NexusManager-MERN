# 🚀 NexusManager - Full Stack MERN Application

A premium, modern SaaS Dashboard built with the **MERN Stack** (MongoDB, Express, React, Node.js). 

This project features a completely responsive, dark-mode glassmorphism design system, secure JWT Authentication, realtime metrics, robust search capabilities, and native Excel exporting!

![NexusManager Dashboard](https://i.imgur.com/placeholders.png)

## ✨ Features

- **🔐 Secure Authentication**: JWT-based login and registration system. Only authenticated admins can manage the directory.
- **🎨 Premium UI/UX**: Dark mode by default, custom CSS glassmorphism, fluid animations, and micro-interactions.
- **📊 Realtime Metrics**: Dashboard instantly calculates and displays user statistics.
- **🔍 Advanced Search**: Filter your entire user directory dynamically by Name or Email.
- **📤 Export to Excel**: Convert your user directory into a native `.xlsx` workbook with a single click.
- **🛠️ Fallback System**: Automatically handles missing database connections via an elegant mock data fallback system to keep the UI active during demonstrations.

## 💻 Tech Stack

- **Frontend**: React.js, React Router, Axios, React Hot Toast, SheetJS (xlsx)
- **Backend**: Node.js, Express.js, Mongoose, JSON Web Tokens (JWT), BcryptJS
- **Styling**: Vanilla CSS (Custom Design System)
- **Deployment Ready**: Fully configured for Vercel serverless deployment!

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js and MongoDB installed (or a MongoDB Atlas URI).

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PrathamKhawani/NexusManager-MERN.git
   cd NexusManager-MERN
   ```

2. Install Backend Dependencies:
   ```bash
   cd server
   npm install
   ```

3. Install Frontend Dependencies:
   ```bash
   cd ../client
   npm install
   ```

### Configuration
1. Inside the `server` folder, create a `.env` file:
   ```env
   PORT=8000
   MONGO_URL=your_mongodb_atlas_connection_string
   JWT_SECRET=super_secret_key_for_nexus_manager
   NODE_ENV=development
   ```

### Running Locally
1. Start the Backend (from the `server` folder):
   ```bash
   npm run dev
   ```
2. Start the Frontend (from the `client` folder):
   ```bash
   npm start
   ```
3. Open your browser to `http://localhost:3000`.

## ☁️ Deploying to Vercel

This application is configured as a Monorepo for Vercel deployment.
1. Connect this repository to your Vercel account.
2. Vercel will automatically read the `vercel.json` and deploy both the React frontend and the Express serverless backend!
3. Don't forget to add your `.env` variables in the Vercel dashboard.
