# 🚀 Vinfotech Chat Widget - START HERE

## ✅ Your Plugin Files Are Ready!

The production files are located in the **`built-files/`** folder.

This folder is **VISIBLE in your IDE** and contains everything you need to deploy the chat widget.

## 📦 What's in `built-files/`?

```
plugin/built-files/
├── vinfotech-chat-widget.umd.js   (311 KB) ← Use this for <script> tags
├── vinfotech-chat-widget.es.js    (613 KB) ← Use this for bundlers
├── vinfotech-chat-widget.css      (13 KB)  ← Styles (required!)
├── *.map files                             ← Debug files (optional)
└── README.md                               ← Detailed usage guide
```

## 🎯 Quick Start (3 Steps)

### Step 1: Copy Files

```bash
# Copy the 2 files you need
cp plugin/built-files/vinfotech-chat-widget.umd.js your-website/public/
cp plugin/built-files/vinfotech-chat-widget.css your-website/public/
```

### Step 2: Add to Your HTML

```html
<!-- In your <head> -->
<link rel="stylesheet" href="/vinfotech-chat-widget.css">

<!-- Before closing </body> -->
<script src="/vinfotech-chat-widget.umd.js"></script>
<script>
  window.vinfotechChatConfig = {
    apiUrl: 'https://ai-api.vinfotech.com/api',
    userId: 'your_user_id',
    teamId: 'your_team_id'
  };
</script>
```

### Step 3: Done! 🎉

The chat widget will appear in the bottom-right corner of your page.

## 🧪 Test It Now

Open the test page to see the widget in action:

```bash
# Option 1: Open directly in browser
open plugin/TEST-WIDGET.html

# Option 2: Use a local server
cd plugin
npx serve .
# Then visit: http://localhost:3000/TEST-WIDGET.html
```

## 📂 Folder Structure

```
plugin/
├── built-files/              ← ✅ YOUR DISTRIBUTION FILES (USE THESE!)
│   ├── *.umd.js
│   ├── *.es.js
│   └── *.css
│
├── examples/                 ← Working examples
│   ├── basic-example.html
│   └── advanced-example.html
│
├── src/                      ← Source code
│
├── TEST-WIDGET.html          ← Quick test page
├── update-built-files.sh     ← Rebuild script
│
└── Documentation:
    ├── START-HERE.md         ← This file
    ├── README.md             ← Complete docs
    ├── QUICK_START.md        ← Integration guide
    └── built-files/README.md ← Deployment guide
```

## 🔄 Updating the Plugin

If you make changes to the source code (`src/` folder):

```bash
cd plugin
./update-built-files.sh
```

This will:
1. Rebuild the plugin
2. Update all files in `built-files/`

## 💡 Common Use Cases

### Use Case 1: Static Website

```html
<link rel="stylesheet" href="vinfotech-chat-widget.css">
<script src="vinfotech-chat-widget.umd.js"></script>
<script>
  window.vinfotechChatConfig = { /* config */ };
</script>
```

### Use Case 2: React App

```javascript
// In App.js
useEffect(() => {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = '/vinfotech-chat-widget.css';
  document.head.appendChild(link);

  const script = document.createElement('script');
  script.src = '/vinfotech-chat-widget.umd.js';
  script.onload = () => {
    window.vinfotechChatConfig = {
      apiUrl: 'https://ai-api.vinfotech.com/api',
      userId: 'user123',
      teamId: 'team456'
    };
  };
  document.body.appendChild(script);
}, []);
```

### Use Case 3: CDN Hosting

1. Upload files to your CDN
2. Get the URLs
3. Reference them:

```html
<link rel="stylesheet" href="https://cdn.yoursite.com/vinfotech-chat-widget.css">
<script src="https://cdn.yoursite.com/vinfotech-chat-widget.umd.js"></script>
```

## 📚 More Information

- **`built-files/README.md`** - Detailed deployment guide
- **`README.md`** - Complete plugin documentation
- **`QUICK_START.md`** - 3-minute integration tutorial
- **`INTEGRATION_GUIDE.md`** - Framework-specific examples
- **`DEPLOYMENT_GUIDE.md`** - Production deployment tips
- **`examples/`** - Working code examples

## ❓ FAQ

### Q: Where are the files I need?

**A:** In the `built-files/` folder! This folder is visible in your IDE.

### Q: Which files do I deploy?

**A:** Just 2 files:
- `vinfotech-chat-widget.umd.js`
- `vinfotech-chat-widget.css`

### Q: Why don't I see the `dist/` folder?

**A:** It's hidden by `.gitignore`. Use `built-files/` instead - same files, but visible!

### Q: How do I update the files?

**A:** Run `./update-built-files.sh` after making changes to source code.

### Q: Can I use this in React/Vue/Angular?

**A:** Yes! See `INTEGRATION_GUIDE.md` for framework-specific examples.

### Q: How big are the files?

**A:** ~337 KB total (~104 KB gzipped). The UMD bundle is 311 KB.

## ✅ Checklist

Before deploying, make sure you have:

- [ ] Copied `vinfotech-chat-widget.umd.js` to your website
- [ ] Copied `vinfotech-chat-widget.css` to your website
- [ ] Added CSS `<link>` tag to your HTML
- [ ] Added JS `<script>` tag to your HTML
- [ ] Configured `window.vinfotechChatConfig` with your settings
- [ ] Tested in a browser

## 🎉 You're All Set!

Your plugin files are ready to use. The `built-files/` folder contains everything you need.

**Next steps:**
1. Test using `TEST-WIDGET.html`
2. Copy files to your website
3. Add the HTML snippet
4. Deploy!

---

**Need help?** Check the other documentation files or review the examples in `examples/`.

Happy integrating! 🚀
