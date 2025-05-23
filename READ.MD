# MMA Social Media Site

A full-stack web application built with ASP.NET Core, PostgreSQL, and React for managing and browsing MMA-related articles and content.

---

## 🛠 Requirements

Make sure you have the following installed on your machine:

- [.NET SDK 8.0.101](https://dotnet.microsoft.com/en-us/download)
- [Node.js (v18+)](https://nodejs.org/en/download/)
- npm (v10.7.0+)
- [PostgreSQL](https://www.postgresql.org/download/) (v13 or higher)
- Git

---

## ⚙️ Environment Setup

### 1. Clone the Repository

```bash
git clone https://github.com/hchdhry/MMA-social-media-site.git
cd MMA-social-media-site
### set up database
CREATE DATABASE "MMA";

### RUN BACKEND
cd api
dotnet restore
dotnet ef database update
dotnet run


### Run Frontend (React)
### In a separate terminal:
cd front-end
npm install
npm run dev

