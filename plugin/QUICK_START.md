# Quick Start - 3 Minutes to Integration

## ⚡ Fastest Way to Integrate (Copy & Paste)

### Step 1: Add to your HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website</title>

  <!-- Add Chat Widget CSS -->
  <link rel="stylesheet" href="path/to/vinfotech-chat-widget.css">
</head>
<body>

  <!-- Your website content -->
  <h1>Welcome to my website!</h1>

  <!-- Add Chat Widget JS - Before closing body tag -->
  <script src="path/to/vinfotech-chat-widget.umd.js"></script>
  <script>
    window.vinfotechChatConfig = {
      apiUrl: 'https://ai-api.vinfotech.com/api',
      userId: 'demo_user',
      teamId: 'demo_team'
    };
  </script>
</body>
</html>
```

### Step 2: That's it! 🎉

The chat widget will appear in the bottom-right corner of your website.

## 🎨 Customize in 30 Seconds

Add these options to customize the look and feel:

```javascript
window.vinfotechChatConfig = {
  apiUrl: 'https://ai-api.vinfotech.com/api',
  userId: 'demo_user',
  teamId: 'demo_team',

  // Change the color
  theme: {
    primaryColor: '#FF6B6B' // Your brand color
  },

  // Change the name and logo
  branding: {
    companyName: 'My Support Bot',
    botAvatarUrl: '/my-bot-avatar.png'
  },

  // Auto-open the chat
  behavior: {
    autoOpen: true
  }
};
```

## 📂 Where to Put the Files

### Option A: In your project's public folder

```
your-project/
├── public/
│   ├── vinfotech-chat-widget.css
│   ├── vinfotech-chat-widget.umd.js
│   └── index.html
```

Then reference as:
```html
<link rel="stylesheet" href="/vinfotech-chat-widget.css">
<script src="/vinfotech-chat-widget.umd.js"></script>
```

### Option B: On a CDN

Upload to your CDN and use full URLs:
```html
<link rel="stylesheet" href="https://cdn.yoursite.com/vinfotech-chat-widget.css">
<script src="https://cdn.yoursite.com/vinfotech-chat-widget.umd.js"></script>
```

### Option C: Local testing (right now!)

```bash
cd plugin
npx serve .
```

Open `http://localhost:3000/examples/basic-example.html` in your browser.

## 🧪 Test It Works

1. Open your website in a browser
2. Look for the chat button in bottom-right corner
3. Click it to open the chat
4. Type a message and press Enter
5. You should see AI responses

## 🐛 Quick Troubleshooting

**Don't see the chat button?**
- Open browser console (F12) and check for errors
- Verify the CSS and JS files loaded (Network tab)
- Make sure `apiUrl` is correct

**Button appears but won't connect?**
- Check your API endpoint is accessible
- Verify `userId` and `teamId` are valid
- Check browser console for API errors

## 📝 Common Configurations

### Minimal (Just works)
```javascript
window.vinfotechChatConfig = {
  apiUrl: 'https://ai-api.vinfotech.com/api'
};
```

### Branded (Your colors and logo)
```javascript
window.vinfotechChatConfig = {
  apiUrl: 'https://ai-api.vinfotech.com/api',
  theme: { primaryColor: '#00B46A' },
  branding: {
    companyName: 'Acme Support',
    botAvatarUrl: '/acme-bot.png'
  }
};
```

### Auto-open (Greet users immediately)
```javascript
window.vinfotechChatConfig = {
  apiUrl: 'https://ai-api.vinfotech.com/api',
  behavior: { autoOpen: true },
  messages: {
    welcomeMessage: 'Hi! I\'m here to help! What can I do for you?'
  }
};
```

### With analytics (Track usage)
```javascript
window.vinfotechChatConfig = {
  apiUrl: 'https://ai-api.vinfotech.com/api',
  callbacks: {
    onMessage: (msg) => {
      // Send to Google Analytics
      gtag('event', 'chat_message', { message: msg });
    }
  }
};
```

## 🎯 Next Steps

1. ✅ **Working?** Customize the colors and branding
2. ✅ **Styled?** Add analytics tracking
3. ✅ **Tracked?** Deploy to production
4. ✅ **Live?** Monitor and optimize

## 📚 Need More?

- **Full Configuration**: See `README.md`
- **Advanced Examples**: See `examples/advanced-example.html`
- **Deployment**: See `DEPLOYMENT_GUIDE.md`
- **Technical Details**: See `PLUGIN_IMPLEMENTATION_SUMMARY.md`

## 💡 Pro Tips

1. **Test on mobile** - The widget is fully responsive
2. **Try dark mode** - Set `theme.mode: 'dark'`
3. **Use callbacks** - Track when users interact
4. **Check console** - Useful debug info is logged
5. **Read the docs** - Full configuration options in README.md

---

**You're done! The chat widget should now be working on your website! 🚀**

**Questions?** Check the troubleshooting section in `README.md`
