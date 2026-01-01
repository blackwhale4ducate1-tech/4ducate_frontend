#!/bin/bash

# 🎨 Tailwind CSS Installation Script for 4ducate
# This script will install and configure Tailwind CSS with dark mode support

echo "🎨 Installing Tailwind CSS and dependencies..."
echo ""

# Navigate to frontend directory
cd "$(dirname "$0")"

# Install Tailwind CSS and dependencies
echo "📦 Installing Tailwind CSS..."
npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

# Install Tailwind plugins
echo "📦 Installing Tailwind plugins..."
npm install -D @tailwindcss/forms @tailwindcss/typography

# Install React Icons (optional but recommended)
echo "📦 Installing React Icons..."
npm install react-icons

echo ""
echo "✅ All dependencies installed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Update your src/main.jsx to include ThemeProvider"
echo "2. Import './styles/tailwind.css' in your main.jsx"
echo "3. Add theme toggle to your Navbar component"
echo "4. Start using Tailwind classes!"
echo ""
echo "📖 Read TAILWIND_SETUP.md for complete guide"
echo ""
echo "🚀 Run 'npm run dev' to start the development server"
echo ""
