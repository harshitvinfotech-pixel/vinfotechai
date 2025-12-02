# Vinfotech Chat Widget

A fully embeddable, customizable AI chat widget that can be integrated into any website with just a few lines of code.

## Features

- 🚀 **Easy Integration** - Add to any website with a single script tag
- 🎨 **Fully Customizable** - Brand colors, logos, messages, and styling
- 📱 **Mobile Responsive** - Perfect experience on all devices
- 🌓 **Dark Mode** - Automatic theme detection with manual override
- 💬 **AI-Powered** - Intelligent responses with contextual suggestions
- 🔒 **Privacy Focused** - Configurable storage and session management
- ⚡ **Lightweight** - Optimized bundle size with lazy loading
- 🎯 **Event Callbacks** - Full programmatic control
- 🌍 **Framework Agnostic** - Works with any tech stack

## Quick Start

### CDN Installation (Recommended)

Add these lines before the closing `</body>` tag:

```html
<!-- Load CSS -->
<link rel="stylesheet" href="https://cdn.vinfotech.com/chat-widget/1.0.0/vinfotech-chat-widget.css">

<!-- Load JavaScript -->
<script src="https://cdn.vinfotech.com/chat-widget/1.0.0/vinfotech-chat-widget.umd.js"></script>

<!-- Initialize -->
<script>
  window.vinfotechChatConfig = {
    apiUrl: 'https://your-api-endpoint.com/api',
    userId: 'your_user_id',
    teamId: 'your_team_id'
  };
</script>
```

### NPM Installation

```bash
npm install @vinfotech/chat-widget
```

```javascript
import '@vinfotech/chat-widget/dist/vinfotech-chat-widget.css';
import VinfotechChatWidget from '@vinfotech/chat-widget';

const widget = new VinfotechChatWidget();
widget.init({
  apiUrl: 'https://your-api-endpoint.com/api',
  userId: 'your_user_id',
  teamId: 'your_team_id'
});
```

## Configuration Options

### Basic Configuration

```javascript
{
  // Required
  apiUrl: string,              // Your chat API endpoint

  // Optional
  userId: string,              // User identifier (default: 'default_user')
  teamId: string,              // Team identifier (default: 'default_team')
}
```

### Theme Configuration

```javascript
theme: {
  primaryColor: '#00B46A',     // Main brand color
  mode: 'auto'                 // 'light' | 'dark' | 'auto'
}
```

### Branding Configuration

```javascript
branding: {
  companyName: 'AI Assistant',      // Display name
  logoUrl: '/logo.png',             // Company logo URL
  botAvatarUrl: '/bot-avatar.png',  // Bot avatar image
  poweredByText: 'Powered by AI',   // Footer text
  showPoweredBy: true               // Show/hide footer
}
```

### Behavior Configuration

```javascript
behavior: {
  autoOpen: false,              // Auto-open on page load
  defaultState: 'collapsed',    // 'collapsed' | 'preview' | 'full'
  position: 'bottom-right',     // Widget position
  mobileFullscreen: true,       // Full screen on mobile
  enableSound: false            // Enable sound notifications
}
```

### Messages Configuration

```javascript
messages: {
  welcomeMessage: 'How can I help you today?',
  placeholderText: 'Ask a question...',
  errorMessage: 'Something went wrong. Please try again.',
  offlineMessage: 'You appear to be offline.'
}
```

### Suggestions Configuration

```javascript
suggestions: {
  enabled: true,                          // Enable suggestions
  fallbackQuestions: [                    // Fallback questions if API fails
    'What services do you offer?',
    'How can you help my business?'
  ]
}
```

### Privacy Configuration

```javascript
privacy: {
  enableLocalStorage: true,     // Use localStorage for persistence
  sessionTtlMinutes: 60,        // Session timeout in minutes
  enableCookies: false          // Use cookies (default: false)
}
```

### Customization

```javascript
customization: {
  css: '.custom-class { color: red; }',  // Inject custom CSS
  className: 'my-custom-widget'          // Add class to root element
}
```

### Callbacks

```javascript
callbacks: {
  onOpen: () => console.log('Widget opened'),
  onClose: () => console.log('Widget closed'),
  onMessage: (message) => console.log('User sent:', message),
  onError: (error) => console.error('Error:', error)
}
```

### Analytics

```javascript
analytics: {
  enabled: false,               // Enable analytics
  trackEvents: false            // Track user events
}
```

## API Methods

### init(config)

Initialize the widget with configuration.

```javascript
window.VinfotechChatWidget.init({
  apiUrl: 'https://api.example.com',
  userId: 'user123'
});
```

### destroy()

Remove the widget from the page.

```javascript
window.VinfotechChatWidget.destroy();
```

### updateConfig(updates)

Update widget configuration dynamically.

```javascript
window.VinfotechChatWidget.updateConfig({
  theme: {
    primaryColor: '#ff0000'
  }
});
```

### open()

Open the widget programmatically.

```javascript
window.VinfotechChatWidget.open();
```

### close()

Close the widget programmatically.

```javascript
window.VinfotechChatWidget.close();
```

### isReady()

Check if widget is initialized.

```javascript
const ready = window.VinfotechChatWidget.isReady();
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Website with Chat Widget</title>
  <link rel="stylesheet" href="https://cdn.vinfotech.com/chat-widget/1.0.0/vinfotech-chat-widget.css">
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>Your content here...</p>

  <script src="https://cdn.vinfotech.com/chat-widget/1.0.0/vinfotech-chat-widget.umd.js"></script>
  <script>
    window.vinfotechChatConfig = {
      // Required
      apiUrl: 'https://ai-api.vinfotech.com/api',
      userId: 'demo_user',
      teamId: 'demo_team',

      // Theme
      theme: {
        primaryColor: '#00B46A',
        mode: 'auto'
      },

      // Branding
      branding: {
        companyName: 'My Company',
        botAvatarUrl: '/my-bot-avatar.png',
        showPoweredBy: true
      },

      // Behavior
      behavior: {
        autoOpen: false,
        defaultState: 'collapsed'
      },

      // Messages
      messages: {
        welcomeMessage: 'Hi! How can I assist you today?',
        placeholderText: 'Type your question here...'
      },

      // Suggestions
      suggestions: {
        enabled: true,
        fallbackQuestions: [
          'What services do you offer?',
          'How can AI help my business?',
          'Tell me about pricing'
        ]
      },

      // Callbacks
      callbacks: {
        onOpen: () => console.log('Chat opened'),
        onClose: () => console.log('Chat closed'),
        onMessage: (msg) => {
          console.log('User message:', msg);
          // Send to your analytics
          if (window.gtag) {
            gtag('event', 'chat_message', { message: msg });
          }
        }
      }
    };
  </script>
</body>
</html>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Troubleshooting

### Widget not appearing

1. Check that both CSS and JS files are loaded
2. Verify the `apiUrl` is correct
3. Check browser console for errors
4. Ensure the widget container has proper z-index

### API connection issues

1. Verify your API endpoint is accessible
2. Check CORS settings on your API
3. Ensure `userId` and `teamId` are valid
4. Check network tab for failed requests

### Styling conflicts

1. Use the `customization.className` option
2. Add `!important` to your custom CSS if needed
3. Check for CSS conflicts with your site's styles
4. Use browser DevTools to inspect styles

## License

MIT License - See LICENSE file for details

## Support

- Documentation: https://docs.vinfotech.com/chat-widget
- Email: support@vinfotech.com
- GitHub Issues: https://github.com/vinfotech/chat-widget/issues

## Changelog

### Version 1.0.0 (2024-12-02)

- Initial release
- AI-powered chat functionality
- Full customization options
- Mobile responsive design
- Dark mode support
- Event callbacks
- Local storage persistence
