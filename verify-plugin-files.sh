#!/bin/bash

# Vinfotech Chat Widget Plugin - File Verification Script
# Run this anytime to verify all plugin files are present

echo "═══════════════════════════════════════════════════"
echo "  VINFOTECH CHAT WIDGET - FILE VERIFICATION"
echo "═══════════════════════════════════════════════════"
echo ""

PROJECT_ROOT="/tmp/cc-agent/58745101/project"
PLUGIN_DIR="$PROJECT_ROOT/plugin"
DIST_DIR="$PLUGIN_DIR/dist"

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if plugin directory exists
if [ ! -d "$PLUGIN_DIR" ]; then
    echo -e "${RED}❌ Plugin directory not found!${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Plugin directory found: $PLUGIN_DIR${NC}"
echo ""

# Check if dist directory exists
if [ ! -d "$DIST_DIR" ]; then
    echo -e "${RED}❌ dist/ folder not found!${NC}"
    echo -e "${YELLOW}Run: cd plugin && npm run build${NC}"
    exit 1
fi

echo -e "${GREEN}✓ dist/ folder exists${NC}"
echo ""

# Check required files
echo "📦 CHECKING DISTRIBUTION FILES:"
echo "────────────────────────────────────────────────"

FILES_MISSING=0

# UMD Bundle
if [ -f "$DIST_DIR/vinfotech-chat-widget.umd.js" ]; then
    SIZE=$(du -h "$DIST_DIR/vinfotech-chat-widget.umd.js" | cut -f1)
    echo -e "${GREEN}✓${NC} vinfotech-chat-widget.umd.js ($SIZE)"
else
    echo -e "${RED}❌ vinfotech-chat-widget.umd.js MISSING!${NC}"
    FILES_MISSING=$((FILES_MISSING + 1))
fi

# ES Module
if [ -f "$DIST_DIR/vinfotech-chat-widget.es.js" ]; then
    SIZE=$(du -h "$DIST_DIR/vinfotech-chat-widget.es.js" | cut -f1)
    echo -e "${GREEN}✓${NC} vinfotech-chat-widget.es.js ($SIZE)"
else
    echo -e "${RED}❌ vinfotech-chat-widget.es.js MISSING!${NC}"
    FILES_MISSING=$((FILES_MISSING + 1))
fi

# CSS
if [ -f "$DIST_DIR/vinfotech-chat-widget.css" ]; then
    SIZE=$(du -h "$DIST_DIR/vinfotech-chat-widget.css" | cut -f1)
    echo -e "${GREEN}✓${NC} vinfotech-chat-widget.css ($SIZE)"
else
    echo -e "${RED}❌ vinfotech-chat-widget.css MISSING!${NC}"
    FILES_MISSING=$((FILES_MISSING + 1))
fi

echo ""

# Check source files
echo "📄 CHECKING SOURCE FILES:"
echo "────────────────────────────────────────────────"

[ -f "$PLUGIN_DIR/src/index.tsx" ] && echo -e "${GREEN}✓${NC} src/index.tsx" || echo -e "${RED}❌ src/index.tsx${NC}"
[ -f "$PLUGIN_DIR/src/ChatWidget.tsx" ] && echo -e "${GREEN}✓${NC} src/ChatWidget.tsx" || echo -e "${RED}❌ src/ChatWidget.tsx${NC}"
[ -f "$PLUGIN_DIR/src/api.ts" ] && echo -e "${GREEN}✓${NC} src/api.ts" || echo -e "${RED}❌ src/api.ts${NC}"
[ -f "$PLUGIN_DIR/src/storage.ts" ] && echo -e "${GREEN}✓${NC} src/storage.ts" || echo -e "${RED}❌ src/storage.ts${NC}"
[ -f "$PLUGIN_DIR/src/types.ts" ] && echo -e "${GREEN}✓${NC} src/types.ts" || echo -e "${RED}❌ src/types.ts${NC}"
[ -f "$PLUGIN_DIR/src/utils.ts" ] && echo -e "${GREEN}✓${NC} src/utils.ts" || echo -e "${RED}❌ src/utils.ts${NC}"

echo ""

# Check documentation
echo "📚 CHECKING DOCUMENTATION:"
echo "────────────────────────────────────────────────"

[ -f "$PLUGIN_DIR/README.md" ] && echo -e "${GREEN}✓${NC} README.md" || echo -e "${RED}❌ README.md${NC}"
[ -f "$PLUGIN_DIR/QUICK_START.md" ] && echo -e "${GREEN}✓${NC} QUICK_START.md" || echo -e "${RED}❌ QUICK_START.md${NC}"
[ -f "$PLUGIN_DIR/INTEGRATION_GUIDE.md" ] && echo -e "${GREEN}✓${NC} INTEGRATION_GUIDE.md" || echo -e "${RED}❌ INTEGRATION_GUIDE.md${NC}"
[ -f "$PLUGIN_DIR/DEPLOYMENT_GUIDE.md" ] && echo -e "${GREEN}✓${NC} DEPLOYMENT_GUIDE.md" || echo -e "${RED}❌ DEPLOYMENT_GUIDE.md${NC}"
[ -f "$PLUGIN_DIR/FILES_INCLUDED.md" ] && echo -e "${GREEN}✓${NC} FILES_INCLUDED.md" || echo -e "${RED}❌ FILES_INCLUDED.md${NC}"

echo ""

# Check examples
echo "🧪 CHECKING EXAMPLES:"
echo "────────────────────────────────────────────────"

[ -f "$PLUGIN_DIR/examples/basic-example.html" ] && echo -e "${GREEN}✓${NC} examples/basic-example.html" || echo -e "${RED}❌ basic-example.html${NC}"
[ -f "$PLUGIN_DIR/examples/advanced-example.html" ] && echo -e "${GREEN}✓${NC} examples/advanced-example.html" || echo -e "${RED}❌ advanced-example.html${NC}"

echo ""
echo "═══════════════════════════════════════════════════"

if [ $FILES_MISSING -eq 0 ]; then
    echo -e "${GREEN}✅ ALL PLUGIN FILES VERIFIED - READY TO USE!${NC}"
    echo ""
    echo "📦 Distribution files location:"
    echo "   $DIST_DIR/"
    echo ""
    echo "🚀 Quick Start:"
    echo "   cd plugin && npx serve ."
    echo "   Open: http://localhost:3000/examples/basic-example.html"
else
    echo -e "${RED}❌ $FILES_MISSING FILE(S) MISSING!${NC}"
    echo ""
    echo "To rebuild the plugin:"
    echo "   cd plugin"
    echo "   npm install"
    echo "   npm run build"
fi

echo "═══════════════════════════════════════════════════"
