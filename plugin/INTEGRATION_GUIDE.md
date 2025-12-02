# Quick Integration Guide

## What Was Built

The Vinfotech Chat Widget has been successfully transformed into a fully embeddable, reusable plugin system. Here's what you now have:

### 📦 Build Outputs

Located in `/plugin/dist/`:

- `vinfotech-chat-widget.umd.js` (311KB) - UMD bundle for script tag embedding
- `vinfotech-chat-widget.es.js` (613KB) - ES Module for modern bundlers
- `vinfotech-chat-widget.css` (13KB) - Styles for the widget
- Source maps for both bundles

### 🏗️ Architecture

1. **Standalone Plugin** - Works on any website without requiring React
2. **Zero Dependencies** - All dependencies bundled (React, ReactDOM, Markdown, Icons)
3. **Style Isolation** - Tailwind CSS scoped to prevent conflicts
4. **Configurable API** - Full customization through configuration object
5. **Event System** - Callbacks for open, close, message, error events

### 🚀 Quick Start Examples

#### Method 1: CDN (Script Tag)

```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="path/to/vinfotech-chat-widget.css">
</head>
<body>
  <h1>Your Website</h1>

  <script src="path/to/vinfotech-chat-widget.umd.js"></script>
  <script>
    window.vinfotechChatConfig = {
      apiUrl: 'https://ai-api.vinfotech.com/api',
      userId: 'your_user',
      teamId: 'your_team',

      theme: {
        primaryColor: '#00B46A'
      },

      branding: {
        companyName: 'My Company'
      }
    };
  </script>
</body>
</html>
```

#### Method 2: NPM Package

```bash
npm install @vinfotech/chat-widget
```

```javascript
import '@vinfotech/chat-widget/dist/vinfotech-chat-widget.css';
import VinfotechChatWidget from '@vinfotech/chat-widget';

window.VinfotechChatWidget.init({
  apiUrl: 'https://ai-api.vinfotech.com/api',
  userId: 'user123',
  teamId: 'team456'
});
```

#### Method 3: Programmatic Control

```html
<script src="path/to/vinfotech-chat-widget.umd.js"></script>
<script>
  // Initialize
  window.VinfotechChatWidget.init({
    apiUrl: 'https://ai-api.vinfotech.com/api',
    userId: 'demo',
    teamId: 'demo',

    callbacks: {
      onOpen: () => console.log('Widget opened'),
      onMessage: (msg) => analytics.track('chat', { message: msg })
    }
  });

  // Control programmatically
  document.getElementById('help-btn').onclick = () => {
    window.VinfotechChatWidget.open();
  };
</script>
```

### 🎨 Full Configuration Example

```javascript
{
  // Required
  apiUrl: 'https://your-api.com/api',

  // Optional
  userId: 'user_123',
  teamId: 'team_456',

  // Theme
  theme: {
    primaryColor: '#00B46A',      // Your brand color
    mode: 'auto'                  // 'light' | 'dark' | 'auto'
  },

  // Branding
  branding: {
    companyName: 'My Company',
    logoUrl: '/logo.png',
    botAvatarUrl: '/bot.png',
    showPoweredBy: true,
    poweredByText: 'Powered by My AI'
  },

  // Behavior
  behavior: {
    autoOpen: false,
    defaultState: 'collapsed',    // 'collapsed' | 'preview' | 'full'
    position: 'bottom-right',
    mobileFullscreen: true
  },

  // Messages
  messages: {
    welcomeMessage: 'Hi! How can I help?',
    placeholderText: 'Type here...',
    errorMessage: 'Connection error'
  },

  // Suggestions
  suggestions: {
    enabled: true,
    fallbackQuestions: [
      'What do you offer?',
      'How does it work?'
    ]
  },

  // Privacy
  privacy: {
    enableLocalStorage: true,
    sessionTtlMinutes: 60
  },

  // Callbacks
  callbacks: {
    onOpen: () => {},
    onClose: () => {},
    onMessage: (message) => {},
    onError: (error) => {}
  }
}
```

### 📁 Project Structure

```
plugin/
├── dist/                           # Built files (ready to use)
│   ├── vinfotech-chat-widget.umd.js   # UMD bundle
│   ├── vinfotech-chat-widget.es.js    # ES module
│   └── vinfotech-chat-widget.css      # Styles
├── src/                            # Source code
│   ├── index.tsx                   # Entry point
│   ├── ChatWidget.tsx              # Main component
│   ├── types.ts                    # TypeScript types
│   ├── api.ts                      # API client
│   ├── storage.ts                  # Storage management
│   ├── utils.ts                    # Utilities
│   └── styles.css                  # Styles
├── examples/                       # Integration examples
│   ├── basic-example.html          # Simple integration
│   └── advanced-example.html       # Advanced features
├── package.json                    # NPM package config
├── vite.config.ts                  # Build configuration
├── tsconfig.json                   # TypeScript config
├── tailwind.config.js              # Tailwind config
├── README.md                       # Full documentation
└── INTEGRATION_GUIDE.md            # This file
```

### 🧪 Testing Integration

Open the example files in your browser:

```bash
# Navigate to plugin directory
cd /tmp/cc-agent/58745101/project/plugin

# Serve the examples (any static server works)
npx serve examples

# Visit in browser:
# http://localhost:3000/basic-example.html
# http://localhost:3000/advanced-example.html
```

### 🔄 Building From Source

```bash
# Install dependencies
npm install

# Build the plugin
npm run build

# Development mode (with hot reload)
npm run dev
```

### 📤 Distribution Options

#### Option 1: Self-Host
1. Upload `dist/` folder to your CDN
2. Reference files with full URLs:
   ```html
   <link rel="stylesheet" href="https://your-cdn.com/vinfotech-chat-widget.css">
   <script src="https://your-cdn.com/vinfotech-chat-widget.umd.js"></script>
   ```

#### Option 2: NPM Package
1. Update `package.json` with your details
2. Publish to NPM:
   ```bash
   npm publish
   ```
3. Users install via:
   ```bash
   npm install @your-org/chat-widget
   ```

#### Option 3: Direct Download
1. Share the `dist/` folder
2. Users copy files to their project
3. Reference locally:
   ```html
   <link rel="stylesheet" href="/assets/vinfotech-chat-widget.css">
   <script src="/assets/vinfotech-chat-widget.umd.js"></script>
   ```

### 🎯 Key Features

- ✅ **Framework Agnostic** - Works with any tech stack
- ✅ **Zero Config Required** - Only API URL needed minimum
- ✅ **Fully Customizable** - Colors, branding, behavior
- ✅ **Mobile Responsive** - Adapts to all screen sizes
- ✅ **Dark Mode** - Automatic theme detection
- ✅ **TypeScript Support** - Full type definitions
- ✅ **Event Callbacks** - Programmatic control
- ✅ **Local Storage** - Conversation persistence
- ✅ **Lightweight** - ~100KB gzipped
- ✅ **Modern Browsers** - Chrome, Firefox, Safari, Edge

### 🐛 Troubleshooting

**Widget not showing:**
- Verify CSS and JS files are loaded
- Check browser console for errors
- Ensure API URL is correct

**Styling conflicts:**
- Tailwind classes are scoped to widget
- Use `customization.css` to override
- Check z-index (widget uses 999999)

**API errors:**
- Verify CORS settings
- Check network tab in DevTools
- Ensure userId/teamId are valid

### 📚 Next Steps

1. **Customize** - Update config to match your brand
2. **Test** - Try the example files
3. **Deploy** - Upload to CDN or publish to NPM
4. **Integrate** - Add to your websites
5. **Monitor** - Track usage with callbacks
6. **Extend** - Add custom features as needed

### 🤝 Support

- Full docs: `/plugin/README.md`
- Examples: `/plugin/examples/`
- Source: `/plugin/src/`

---

**Congratulations!** 🎉 You now have a production-ready, embeddable chat widget that can be deployed on unlimited websites with just a few lines of code!
