# TrelloOldUI 🔄

[![Version](https://img.shields.io/badge/version-2.0-blue.svg)](https://github.com/gabrielrbarbosa/TrelloOldUI)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Tampermonkey](https://img.shields.io/badge/tampermonkey-compatible-orange.svg)](https://www.tampermonkey.net/)

> Restore the classic Trello card design layout and rollback the beta redesign to the familiar old UI

## 🎯 Overview

TrelloOldUI is a Tampermonkey userscript that restores Trello's previous card design layout, effectively rolling back the new beta redesign to the classic UI that many users prefer. This script maintains the familiar workflow and visual structure that made Trello so intuitive to use.

## ✨ Features

- **🔄 Layout Restoration**: Converts the new grid-based layout back to the classic block layout
- **📱 Responsive Design**: Maintains full-width content containers for better space utilization
- **🎨 UI Cleanup**: Removes unnecessary sticky headers and optimizes spacing
- **⚡ Dynamic Loading**: Handles Trello's SPA navigation and dynamic content loading
- **🔧 Non-Destructive**: Only applies visual changes without affecting functionality

## 🚀 Installation

### Prerequisites
- [Tampermonkey](https://www.tampermonkey.net/) browser extension
- Access to Trello.com

### Steps
1. Install the Tampermonkey browser extension
2. Click on the Tampermonkey icon and select "Create a new script"
3. Copy the entire script from [`script.js`](script.js)
4. Paste it into the Tampermonkey editor
5. Save the script (Ctrl+S)
6. Refresh any open Trello tabs

### Quick Install
```bash
# Direct install link
https://github.com/gabrielrbarbosa/TrelloOldUI/raw/main/script.js
```

## 🎨 What Changes

### Before (New Beta Design)
- Grid-based layout with sidebar
- Sticky headers taking up space
- Limited content width
- Excessive margins and padding

### After (Classic Design Restored)
- Full-width content layout
- Integrated sidebar content
- Optimized spacing
- Familiar card structure

## 🔧 Technical Details

The script works by:

1. **CSS Overrides**: Injects custom styles to reset grid layouts
2. **DOM Manipulation**: Moves aside content into the main content area
3. **Dynamic Monitoring**: Uses MutationObserver to handle content changes
4. **SPA Compatibility**: Detects navigation changes in Trello's single-page app

### Key Modifications
- Resets `display: grid` to `display: block`
- Makes content containers 100% width
- Removes grid column/row constraints
- Optimizes padding and margins
- Hides redundant UI elements

## 🛠️ Customization

You can modify the script to suit your preferences:

```javascript
// Adjust content padding
padding: 16px 20px !important;

// Change header height
min-height: 40px !important;

// Modify section spacing
margin-bottom: 10px !important;
```

## 🐛 Troubleshooting

### Script Not Working?
1. Ensure Tampermonkey is enabled
2. Check if the script is active for `trello.com/*`
3. Refresh the page after installation
4. Check browser console for errors

### Layout Issues?
1. Clear browser cache
2. Disable other Trello-related extensions temporarily
3. Update to the latest script version

## 🤝 Contributing

Contributions are welcome! Please feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Create a Pull Request

## 📝 Changelog

### v2.0
- Added section margin optimization
- Improved header padding
- Enhanced dynamic content handling
- Better SPA navigation support

### v1.0
- Initial release
- Basic layout restoration
- Grid to block conversion

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Trello team for the original classic design
- Tampermonkey community for userscript support
- Users who provided feedback and suggestions

## 📞 Support

If you encounter any issues or have suggestions:

- 🐛 [Report a bug](https://github.com/gabrielrbarbosa/TrelloOldUI/issues)
- 💡 [Request a feature](https://github.com/gabrielrbarbosa/TrelloOldUI/issues)
- 💬 [Start a discussion](https://github.com/gabrielrbarbosa/TrelloOldUI/discussions)

---

<p align="center">
  <strong>Made with ❤️ by <a href="https://github.com/gabrielrbarbosa">gabrielrbarbosa</a></strong>
</p>

<p align="center">
  <sub>⭐ Star this repo if it helped you restore the classic Trello experience!</sub>
</p>
