# Integration Guide - CSS Scoping Fixed Version

## What's New

This version of the widget has been updated to prevent CSS conflicts with parent websites:

- ✅ All CSS is scoped to the widget container
- ✅ No global CSS resets that affect parent site
- ✅ Pixel-based units (no rem/em dependencies)
- ✅ Works on any website without conflicts

## Quick Integration

### Step 1: Include the Widget Files

```html
<!DOCTYPE html>
<html>
<head>
  <!-- Include widget CSS -->
  <link rel="stylesheet" href="path/to/vinfotech-chat-widget.css">
</head>
<body>
  <!-- Your website content -->
  <button>Your Button</button> <!-- ✅ This won't be affected -->

  <!-- Include widget JS before closing body -->
  <script src="path/to/vinfotech-chat-widget.umd.js"></script>
  <script>
    window.vinfotechChatConfig = {
      apiUrl: 'YOUR_API_URL',
      theme: {
        mode: 'light',
        primaryColor: '#10b981'
      }
    };
  </script>
</body>
</html>
```

### Step 2: That's It!

The widget is now completely isolated from your website's CSS. No additional configuration needed.

## What's Protected

### Your Website's Styles Are Safe

```html
<!-- Before the fix, plugin CSS could break these -->
<button class="my-button">Your Button</button>      ✅ Safe
<a href="#" class="my-link">Your Link</a>            ✅ Safe
<h1 class="my-heading">Your Heading</h1>             ✅ Safe
<input type="text" class="my-input">                 ✅ Safe
<ul class="my-list"><li>Item</li></ul>               ✅ Safe

<!-- The widget container is isolated -->
<div id="vinfotech-chat-widget-root">
  <!-- Widget renders here, isolated from parent CSS -->
</div>
```

## Technical Details

### CSS Structure

All widget styles are scoped to `#vinfotech-chat-widget-root`:

```css
/* ✅ Widget utility classes */
#vinfotech-chat-widget-root .vw-p-2 { padding: 8px; }
#vinfotech-chat-widget-root .vw-flex { display: flex; }

/* ✅ Widget reset styles */
#vinfotech-chat-widget-root * {
  box-sizing: border-box;
  /* Only affects elements inside widget */
}

#vinfotech-chat-widget-root button {
  cursor: pointer;
  /* Only affects buttons inside widget */
}
```

### No Global Styles

The following selectors are **NOT** present (they would break parent sites):

```css
/* ❌ These DON'T exist in the new version */
* { box-sizing: border-box; }
body { margin: 0; }
a { color: inherit; }
button { cursor: pointer; }
```

## Compatibility

### Works With

- ✅ Any CSS framework (Bootstrap, Tailwind, Material UI, etc.)
- ✅ Custom CSS resets (normalize.css, reset.css, etc.)
- ✅ Any base font size (12px, 14px, 16px, 20px)
- ✅ Heavily styled websites
- ✅ WordPress, Shopify, Wix, and all CMS platforms

### No Conflicts With

- ✅ Global `* { box-sizing: content-box; }`
- ✅ Custom button/form styling
- ✅ Parent website's Tailwind CSS
- ✅ Parent website's CSS-in-JS
- ✅ Any CSS methodology (BEM, OOCSS, SMACSS, etc.)

## Customization

You can still customize the widget theme:

```javascript
window.vinfotechChatConfig = {
  apiUrl: 'YOUR_API_URL',
  theme: {
    mode: 'light',              // or 'dark' or 'auto'
    primaryColor: '#10b981',    // Your brand color
  },
  customization: {
    css: `
      /* Add custom styles scoped to widget */
      #vinfotech-chat-widget-root .vw-p-2 {
        padding: 10px !important;
      }
    `
  }
};
```

## Troubleshooting

### Widget Styles Not Applied

If widget styles aren't applied, check:

1. CSS file is loaded: `<link rel="stylesheet" href="vinfotech-chat-widget.css">`
2. Container exists: Look for `<div id="vinfotech-chat-widget-root">` in DOM
3. No parent CSS using `!important` on the container

### Parent Site Styles Still Affected

This should NOT happen with the new version. If it does:

1. Verify you're using the latest built files
2. Check for global `!important` rules in parent CSS
3. Ensure CSS file is from the `built-files/` directory

### Widget Looks Different on Different Sites

This should NOT happen with the new version because:
- Pixel-based units prevent font-size inheritance
- Scoped reset prevents parent CSS leakage
- All styles are absolute and predictable

If widget appearance varies:
1. Check browser console for errors
2. Verify all widget files are loaded
3. Check for JavaScript errors

## Migration from Old Version

If you're migrating from the old version (with global CSS):

### What Changed
1. CSS is now fully scoped to widget container
2. No global resets applied
3. Parent site won't be affected

### What You Need to Do
**Nothing!** Just replace the old CSS/JS files with new ones.

The widget works the same way, but now it's safer and more reliable.

## Support

For issues or questions:
- Check `CSS_SCOPING_FIX.md` for technical details
- Check `BEFORE_AFTER_COMPARISON.md` for change details
- Report issues to your development team

## Version Info

This guide applies to the widget version with CSS scoping fixes (December 2024+).
