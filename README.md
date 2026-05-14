# 🚀 NexusManager - Full Stack MERN Application

[![Vercel Deployment](https://img.shields.io/badge/Deployment-Live-success?style=for-the-badge&logo=vercel)](https://nexus-manager-mern.vercel.app/)
[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/mern-stack)

A premium, modern SaaS Dashboard built with the **MERN Stack** (MongoDB, Express, React, Node.js). 

**🔗 Live Demo:** [https://nexus-manager-mern.vercel.app/](https://nexus-manager-mern.vercel.app/)

---

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
- **Deployment**: Configured for Vercel Serverless (Monorepo setup)

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

## ☁️ Deployment

This application is optimized for Vercel. 
1. Connect this repository to your Vercel account.
2. The `vercel.json` at the root handles the monorepo routing.
3. Set your `MONGO_URL` and `JWT_SECRET` in the Vercel Project Settings -> Environment Variables.

---

Built with ❤️ by [Pratham](https://github.com/PrathamKhawani)
