#!/bin/bash

# Sylhet Advocates Directory - Quick Setup Script
# This script helps automate the initial setup process

set -e

echo "🚀 Setting up Sylhet Advocates Directory..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"
echo ""

# Check for .env file
if [ ! -f .env ]; then
    echo "⚠️  .env file not found. Creating from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env file with your actual database credentials before continuing."
    echo ""
    echo "To get a free Neon Postgres database:"
    echo "1. Visit https://neon.tech"
    echo "2. Sign up for a free account"
    echo "3. Create a new project"
    echo "4. Copy the connection string"
    echo "5. Update DATABASE_URL in .env file"
    echo ""
    read -p "Press Enter after updating .env file, or Ctrl+C to exit..."
fi

echo "📦 Installing dependencies..."
npm install

echo ""
echo "🗄️  Setting up database..."

# Generate Prisma Client
echo "Generating Prisma Client..."
npm run db:generate

# Push schema to database
echo "Pushing schema to database..."
npm run db:push

# Seed database
echo "Seeding database with sample data..."
npm run db:seed

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server, run:"
echo "  npm run dev"
echo ""
echo "Then open http://localhost:3000 in your browser."
echo ""
echo "📚 For more information, see README.md and SETUP_GUIDE.md"
