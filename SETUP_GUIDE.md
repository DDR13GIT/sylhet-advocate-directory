# Complete Setup Guide - Sylhet Advocates Directory

This guide will walk you through setting up the Sylhet Advocates Directory from scratch, including database setup with Neon Postgres.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Setting up Neon Postgres](#setting-up-neon-postgres)
3. [Local Development Setup](#local-development-setup)
4. [Database Configuration](#database-configuration)
5. [Running the Application](#running-the-application)
6. [Deployment to Vercel](#deployment-to-vercel)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **Git**
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

- **Code Editor** (VS Code recommended)
  - Download from [code.visualstudio.com](https://code.visualstudio.com/)

## Setting up Neon Postgres

Neon is a serverless Postgres database that's perfect for this application.

### Step 1: Create a Neon Account

1. Go to [neon.tech](https://neon.tech)
2. Click "Sign Up" and create an account (you can use GitHub)
3. Verify your email address

### Step 2: Create a New Project

1. After logging in, click "Create a project" or "New Project"
2. Fill in the project details:
   - **Project Name**: `sylhet-advocates` (or any name you prefer)
   - **Region**: Choose the closest region to your users (e.g., AWS ap-south-1 for India/Bangladesh)
   - **Postgres Version**: Use the default (latest stable version)
3. Click "Create Project"

### Step 3: Get the Connection String

1. Once the project is created, you'll see the project dashboard
2. Click on "Connection Details" or find the connection string section
3. You'll see a connection string that looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```
4. **Copy this connection string** - you'll need it in the next steps
5. Make sure to select "Pooled connection" if available for better performance

### Step 4: Save Your Credentials

Store these safely (you'll need them later):
- Database URL (connection string)
- Database name (usually `neondb` by default)
- Username
- Password

## Local Development Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate to the project directory
cd sylhet-advocate-directory
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js
- Prisma
- React Hook Form
- Zod
- shadcn/ui components
- and more...

### Step 3: Create Environment File

Create a `.env` file in the root directory:

```bash
# On macOS/Linux
touch .env

# On Windows (PowerShell)
New-Item .env
```

Add the following content to `.env`:

```env
# Database Connection
DATABASE_URL="postgresql://your-username:your-password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require"

# Replace the above with your actual Neon connection string

# Optional: For production deployment
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

**Important**: Replace the `DATABASE_URL` value with your actual Neon Postgres connection string from Step 3 above.

## Database Configuration

### Step 1: Generate Prisma Client

This creates the necessary TypeScript types and database client:

```bash
npm run db:generate
```

You should see output like:
```
✔ Generated Prisma Client
```

### Step 2: Push Schema to Database

This creates all the tables in your Neon database:

```bash
npm run db:push
```

You should see:
```
Your database is now in sync with your Prisma schema.
```

### Step 3: Seed the Database

This adds sample data (practice areas, court levels, languages, locations, and sample advocates):

```bash
npm run db:seed
```

You should see:
```
🌱 Starting database seed...
📚 Seeding practice areas...
⚖️  Seeding court levels...
🗣️  Seeding languages...
📍 Seeding locations...
👨‍⚖️ Seeding sample advocates...
✅ Database seeding completed successfully!
```

### Step 4: Verify Database (Optional)

You can view your database using Prisma Studio:

```bash
npm run db:studio
```

This opens a browser window where you can see and edit your database tables.

## Running the Application

### Development Mode

```bash
npm run dev
```

The application will start on [http://localhost:3000](http://localhost:3000)

You should see:
```
  ▲ Next.js 16.0.3
  - Local:        http://localhost:3000
  - Network:      http://xxx.xxx.xxx.xxx:3000

 ✓ Ready in 2.5s
```

### Test the Application

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the homepage with the search bar
3. Try searching for "Rahman" or "Criminal Law"
4. Test the filters on the search results page
5. Click on an advocate to view their profile

### Production Build (Local Testing)

To test the production build locally:

```bash
# Build the application
npm run build

# Start the production server
npm start
```

## Deployment to Vercel

### Step 1: Push Code to GitHub

1. Create a new repository on GitHub
2. Initialize git in your project (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Add the remote and push:
   ```bash
   git remote add origin https://github.com/your-username/your-repo.git
   git branch -M main
   git push -u origin main
   ```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login (you can use GitHub)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Configure the project:
   - **Framework Preset**: Next.js (should auto-detect)
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

### Step 3: Add Environment Variables

Before deploying, add your environment variables:

1. In the Vercel project settings, go to "Environment Variables"
2. Add the following variables:

   **DATABASE_URL**
   ```
   postgresql://your-username:your-password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
   ```

   **NEXT_PUBLIC_BASE_URL**
   ```
   https://your-project-name.vercel.app
   ```

3. Click "Deploy"

### Step 4: Run Database Setup on Vercel (First Time Only)

After the first deployment, you need to set up the database:

1. Go to your Vercel project dashboard
2. Go to Settings → General → "Project Settings"
3. In the terminal or locally, run:
   ```bash
   # Make sure you have the production DATABASE_URL in your .env
   npm run db:push
   npm run db:seed
   ```

Alternatively, you can run these commands in Vercel's deployment logs if needed.

### Step 5: Access Your Deployed Application

Your application will be available at:
```
https://your-project-name.vercel.app
```

## Troubleshooting

### Common Issues and Solutions

#### 1. "Error: P1001: Can't reach database server"

**Solution**:
- Check your DATABASE_URL is correct
- Ensure your Neon database is active (not paused)
- Check your internet connection
- Verify the connection string includes `?sslmode=require`

#### 2. "Prisma Client not generated"

**Solution**:
```bash
npm run db:generate
```

#### 3. "Module not found" errors

**Solution**:
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

#### 4. Seed script fails

**Solution**:
- Make sure the database schema is pushed: `npm run db:push`
- Check if tables already exist: `npm run db:studio`
- Clear existing data if needed and re-run seed

#### 5. Port 3000 already in use

**Solution**:
```bash
# Find and kill the process using port 3000
# On macOS/Linux:
lsof -ti:3000 | xargs kill -9

# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use a different port:
PORT=3001 npm run dev
```

#### 6. Build fails on Vercel

**Solution**:
- Check build logs for specific errors
- Ensure all dependencies are in `dependencies` (not `devDependencies`)
- Make sure environment variables are set correctly
- Try running `npm run build` locally first

#### 7. Database connection works locally but not in production

**Solution**:
- Verify the DATABASE_URL in Vercel environment variables
- Check Neon database is not paused
- Ensure SSL mode is enabled in the connection string
- Check Neon IP allowlist if configured

### Getting Help

If you encounter issues not listed here:

1. Check the [Next.js Documentation](https://nextjs.org/docs)
2. Check the [Prisma Documentation](https://www.prisma.io/docs)
3. Check the [Neon Documentation](https://neon.tech/docs)
4. Open an issue on the GitHub repository

## Next Steps

After successful setup:

1. **Customize the application**:
   - Update branding in `app/page.tsx`
   - Modify color scheme in `app/globals.css`
   - Add more practice areas in `prisma/seed.ts`

2. **Add real data**:
   - Replace sample advocates with real data
   - Update contact information
   - Add real advocate photos

3. **Enhance features**:
   - Add authentication for advocates
   - Implement reviews and ratings
   - Add appointment booking system
   - Integrate email notifications

4. **Monitor and optimize**:
   - Set up analytics (Vercel Analytics, Google Analytics)
   - Monitor database usage in Neon dashboard
   - Check application performance with Lighthouse

## Security Checklist

Before going to production:

- [ ] All sensitive data is in environment variables
- [ ] `.env` file is in `.gitignore`
- [ ] Database connection uses SSL (`sslmode=require`)
- [ ] Input validation is implemented (Zod schemas)
- [ ] Rate limiting is configured
- [ ] CORS is properly configured
- [ ] Environment variables are set in Vercel
- [ ] Regular database backups are enabled in Neon

---

**Congratulations!** 🎉 You now have a fully functional advocate directory application!
