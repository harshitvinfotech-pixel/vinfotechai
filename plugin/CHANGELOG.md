# Vinfotech Chat Widget Plugin - Changelog

## Version 1.0.0 - December 4, 2024

### Major Updates

#### 1. Version Control System
- Added `version` property to ChatWidgetConfig
- Default version: `1.0.0`
- Version is now logged during initialization
- Added `getVersion()` method to retrieve current plugin version

#### 2. Configuration Cleanup
- **Removed**: `updateConfig()` method - configuration updates no longer supported after initialization
- **Removed**: `privacy` configuration object (enableLocalStorage, sessionTtlMinutes, enableCookies)
- **Removed**: `analytics` configuration object (enabled, trackEvents)
- **Simplified Callbacks**: Only `onOpen` and `onClose` callbacks are now supported
  - Removed: `onMessage` and `onError` callbacks

#### 3. Branding Configuration Updates
- **Removed**: `logoUrl` property
- **Removed**: `botAvatarUrl` property (now uses hardcoded `/ai-bot.png`)
- **Kept**: `companyName`, `showPoweredBy`, `poweredByText`

#### 4. New UI Features

##### Robot Icon with Loader
- Added robot icon (ai-bot.png) that appears in:
  - Collapsed state button
  - Chat header
  - Assistant message avatars
  - Loading state with animated spinner ring

##### Loading States with Dynamic Messages
- Cycling loading messages that change every 2 seconds:
  1. "Thinking"
  2. "Processing"
  3. "Gathering information..."
  4. "Just a sec.."
- Robot icon with animated spinner during loading
- Three bouncing dots animation in loading state

##### Suggested Questions from API
- **Initial Questions**: Fetched from API on widget mount
- **Dynamic Questions**: Displayed after AI responses
- **Fallback Questions**: Used when API fails
- **Click Tracking**: Questions disappear after being clicked
- Features:
  - Smooth animations
  - Sparkle icons for each suggestion
  - Gradient backgrounds for dynamic suggestions
  - "You can also ask:" label for dynamic suggestions

##### Mobile Responsiveness
- **Desktop** (≥768px):
  - Fixed position bottom-right
  - Width: 450px (normal) / 800px (expanded)
  - Height: 700px
  - Rounded corners (24px)
  - Maximize/Minimize button available

- **Mobile** (<768px):
  - Full screen with top margin (80px from top)
  - No rounded corners
  - No maximize/minimize button
  - Optimized touch interactions
  - Smaller collapsed button icon with question mark indicator

#### 5. Enhanced Features
- Feedback system (thumbs up/down) for assistant messages
- Message persistence using localStorage
- Smooth scroll animations
- Theme detection (light/dark/auto)
- Streaming response support
- Contact form handling (from API)

### Configuration Example

```javascript
window.VinfotechChatWidget.init({
  version: '1.0.0', // Optional - version tracking
  apiUrl: 'https://your-api-url.com',
  userId: 'user_123',
  teamId: 'team_456',

  theme: {
    primaryColor: '#00B46A',
    mode: 'auto' // 'light' | 'dark' | 'auto'
  },

  branding: {
    companyName: 'Your Company',
    showPoweredBy: true,
    poweredByText: 'Powered by Your Brand'
  },

  behavior: {
    autoOpen: false,
    defaultState: 'collapsed',
    position: 'bottom-right',
    mobileFullscreen: true
  },

  messages: {
    welcomeMessage: 'How can I help you today?',
    placeholderText: 'Ask a question...',
    errorMessage: 'Connection error. Please try again.'
  },

  suggestions: {
    enabled: true,
    fallbackQuestions: [
      'What services do you offer?',
      'How can you help my business?'
    ]
  },

  callbacks: {
    onOpen: () => console.log('Widget opened'),
    onClose: () => console.log('Widget closed')
  }
});
```

### Migration Guide

#### From Previous Version

1. **Remove Privacy Config**:
   ```javascript
   // ❌ Remove this
   privacy: {
     enableLocalStorage: true,
     sessionTtlMinutes: 60
   }
   ```

2. **Remove Analytics Config**:
   ```javascript
   // ❌ Remove this
   analytics: {
     enabled: false
   }
   ```

3. **Update Branding**:
   ```javascript
   // ❌ Remove these
   branding: {
     logoUrl: '/logo.png',
     botAvatarUrl: '/avatar.png'
   }

   // ✅ Use this instead
   branding: {
     companyName: 'Your Company',
     showPoweredBy: true
   }
   ```

4. **Update Callbacks**:
   ```javascript
   // ❌ Remove these
   callbacks: {
     onMessage: (msg) => {},
     onError: (err) => {}
   }

   // ✅ Use only these
   callbacks: {
     onOpen: () => {},
     onClose: () => {}
   }
   ```

5. **Remove updateConfig Calls**:
   ```javascript
   // ❌ This method no longer exists
   widget.updateConfig({ theme: { primaryColor: '#000' } });

   // ✅ Initialize with all config upfront
   widget.init({
     theme: { primaryColor: '#000' }
   });
   ```

### Assets Required

The plugin now requires the following asset to be available:
- `/ai-bot.png` - Robot avatar icon used throughout the interface

Make sure this file is accessible from your domain's root directory.

### API Integration

The widget expects the following API endpoints:

1. **Initial Suggestions**: `GET {apiUrl}/chat/suggested-questions`
   - Query params: `userId`, `teamId`
   - Returns: Array of question strings

2. **Stream Query**: `POST {apiUrl}/chat/stream-query`
   - Supports Server-Sent Events (SSE)
   - Returns: Streaming response with suggested questions

3. **Feedback**: `POST {apiUrl}/chat/feedback`
   - Body: `{ session_id, feedback }`

### Breaking Changes

- `updateConfig()` method removed
- `privacy` configuration removed
- `analytics` configuration removed
- `logoUrl` and `botAvatarUrl` removed from branding
- `onMessage` and `onError` callbacks removed
- Configuration can only be set during `init()` call

### Bug Fixes

- Fixed mobile responsiveness issues
- Fixed loading state not showing properly
- Fixed suggested questions not appearing after responses
- Fixed theme detection for auto mode
