# Vinfotech Chat Widget - Production Files

## 🎯 These Are Your Distribution Files!

This folder contains the **production-ready, built files** for the Vinfotech Chat Widget.

These files are **visible, tracked, and ready to deploy immediately**.

## ✅ Files Included

### Core Files (Use These!)

- **`vinfotech-chat-widget.umd.js`** (311 KB)
  - Universal Module Definition bundle
  - Works with `<script>` tags in any HTML page
  - **This is what most people need**

- **`vinfotech-chat-widget.es.js`** (613 KB)
  - ES Module bundle
  - For modern bundlers (Webpack, Vite, Rollup, etc.)
  - Use if integrating with React/Vue/Angular

- **`vinfotech-chat-widget.css`** (13 KB)
  - Widget styles
  - **Required** for proper display
  - Must be included regardless of which JS file you use

### Debug Files (Optional)

- `*.map` files - Source maps for debugging
  - Not needed for production
  - Helpful during development

## 🚀 Quick Start - Use in Any Website

### Step 1: Copy Files to Your Website

```bash
# Copy both files to your public folder
cp vinfotech-chat-widget.umd.js /path/to/your/website/public/
cp vinfotech-chat-widget.css /path/to/your/website/public/
```

### Step 2: Add to Your HTML

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Add CSS in head -->
  <link rel="stylesheet" href="/vinfotech-chat-widget.css">
</head>
<body>
  <!-- Your page content -->

  <!-- Add JavaScript before closing body tag -->
  <script src="/vinfotech-chat-widget.umd.js"></script>

  <!-- Configure the widget -->
  <script>
    window.vinfotechChatConfig = {
      apiUrl: 'https://ai-api.vinfotech.com/api',
      userId: 'your_user_id',
      teamId: 'your_team_id'
    };
  </script>
</body>
</html>
```

### Step 3: Done!

The widget will automatically appear on your page.

## 📦 Deployment Options

### Option 1: Self-Host

1. Upload files to your web server
2. Reference them in your HTML
3. No dependencies needed!

### Option 2: CDN

1. Upload to your CDN (Cloudflare, AWS S3, etc.)
2. Get the public URLs
3. Reference in HTML:

```html
<link rel="stylesheet" href="https://your-cdn.com/vinfotech-chat-widget.css">
<script src="https://your-cdn.com/vinfotech-chat-widget.umd.js"></script>
```

### Option 3: NPM Package

If publishing to NPM:
1. Users install: `npm install @vinfotech/chat-widget`
2. They import: `import VinfotechChatWidget from '@vinfotech/chat-widget'`

## 💡 Integration Examples

### Basic Integration (Plain HTML)

```html
<link rel="stylesheet" href="vinfotech-chat-widget.css">
<script src="vinfotech-chat-widget.umd.js"></script>
<script>
  window.vinfotechChatConfig = {
    apiUrl: 'https://ai-api.vinfotech.com/api',
    userId: 'demo_user',
    teamId: 'demo_team'
  };
</script>
```

### React Integration

```javascript
// In your React component
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/vinfotech-chat-widget.css';
    document.head.appendChild(link);

    // Load JS
    const script = document.createElement('script');
    script.src = '/vinfotech-chat-widget.umd.js';
    script.onload = () => {
      window.vinfotechChatConfig = {
        apiUrl: 'https://ai-api.vinfotech.com/api',
        userId: 'demo_user',
        teamId: 'demo_team'
      };
    };
    document.body.appendChild(script);
  }, []);

  return <div>Your app content</div>;
}
```

### WordPress Integration

1. Upload files to `/wp-content/uploads/chat-widget/`
2. Add to theme's `footer.php`:

```php
<link rel="stylesheet" href="<?php echo site_url(); ?>/wp-content/uploads/chat-widget/vinfotech-chat-widget.css">
<script src="<?php echo site_url(); ?>/wp-content/uploads/chat-widget/vinfotech-chat-widget.umd.js"></script>
<script>
  window.vinfotechChatConfig = {
    apiUrl: 'https://ai-api.vinfotech.com/api',
    userId: '<?php echo get_current_user_id(); ?>',
    teamId: 'your_team_id'
  };
</script>
```

## 📊 File Sizes

| File | Raw Size | Gzipped | When to Use |
|------|----------|---------|-------------|
| UMD Bundle | 311 KB | 97 KB | Script tags |
| ES Module | 613 KB | 137 KB | Bundlers |
| CSS | 13 KB | 3.5 KB | Always |
| **Total** | **~337 KB** | **~104 KB** | - |

## 🔄 Updating These Files

These files are generated from the source code. To regenerate after making changes:

```bash
# Navigate to plugin directory
cd /path/to/project/plugin

# Install dependencies (first time only)
npm install

# Build
npm run build

# Copy to built-files
cp dist/* built-files/
```

Or use the automated script:
```bash
./rebuild-and-sync.sh
```

## ✅ Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🆘 Troubleshooting

### Widget doesn't appear

1. Check browser console for errors
2. Verify both CSS and JS files are loaded
3. Ensure `vinfotechChatConfig` is set before or after script loads

### Styling looks wrong

1. Ensure CSS file is loaded
2. Check for CSS conflicts with your site's styles
3. Try loading widget CSS after your site's CSS

### API errors

1. Verify `apiUrl` is correct
2. Check `userId` and `teamId` are provided
3. Ensure API endpoint is accessible

## 📚 More Documentation

- `../README.md` - Complete plugin documentation
- `../QUICK_START.md` - 3-minute integration guide
- `../INTEGRATION_GUIDE.md` - Detailed integration examples
- `../DEPLOYMENT_GUIDE.md` - Deployment best practices

## 🎉 You're Ready!

These files are:
- ✅ Production-ready
- ✅ Minified and optimized
- ✅ Browser compatible
- ✅ Self-contained (no external dependencies)
- ✅ Ready to deploy immediately

Just copy the 2 files (UMD + CSS) and add the HTML snippet - that's it!

---

**Need help?** See the documentation files in the parent directory or check `examples/` for working demos.
