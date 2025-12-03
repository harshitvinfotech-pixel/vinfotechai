#!/bin/bash

# Vinfotech Chat Widget - Update Built Files Script
# Rebuilds the plugin and updates the built-files folder

set -e

echo "══════════════════════════════════════════════════════"
echo "  Vinfotech Chat Widget - Update Built Files"
echo "══════════════════════════════════════════════════════"
echo ""

# Check if we're in the plugin directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found"
    echo "Please run this script from the plugin/ directory"
    exit 1
fi

echo "📦 Step 1: Installing/updating dependencies..."
npm install --silent

echo ""
echo "🔨 Step 2: Building plugin..."
npm run build

echo ""
echo "📋 Step 3: Updating built-files folder..."
mkdir -p built-files
cp -v dist/vinfotech-chat-widget.* built-files/

echo ""
echo "✅ Build complete!"
echo ""
echo "📊 Files in built-files/:"
ls -lh built-files/ | grep -v "^total" | grep -v "^d"

echo ""
echo "📂 File locations:"
echo "   dist/         - Build output (may be hidden by .gitignore)"
echo "   built-files/  - Visible copy for deployment"
echo ""
echo "🚀 Test the widget:"
echo "   Open TEST-WIDGET.html in your browser"
echo "   Or run: npx serve . and visit http://localhost:3000/TEST-WIDGET.html"
echo ""
echo "══════════════════════════════════════════════════════"
echo "  ✅ built-files/ folder updated and ready to use!"
echo "══════════════════════════════════════════════════════"
