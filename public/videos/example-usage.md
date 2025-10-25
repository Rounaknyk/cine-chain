# How to Use Local Videos

## 📁 Current Setup
Your project is now configured to use local videos from the `public/videos/` folder.

## 🎬 Required Files
Place these files in `public/videos/`:

1. **`hero-background.mp4`** - Your main background video
2. **`hero-background-2.mp4`** - Backup video (optional)
3. **`fallback-image.jpg`** - Fallback image (optional)

## 🚀 Quick Start

### Option 1: Download Sample Videos
```bash
npm run download-videos
```

### Option 2: Add Your Own Videos
1. Copy your video files to `public/videos/`
2. Rename them to match the expected names:
   - Main video → `hero-background.mp4`
   - Backup video → `hero-background-2.mp4`
   - Fallback image → `fallback-image.jpg`

## 📝 Video Requirements
- **Format**: MP4
- **Duration**: 10-30 seconds (for looping)
- **Resolution**: 1920x1080 or higher
- **File Size**: Under 10MB
- **Codec**: H.264

## 🔧 Configuration
The video paths are configured in `src/app/page.tsx`:

```javascript
const videoConfig = {
  primary: "/videos/hero-background.mp4",
  secondary: "/videos/hero-background-2.mp4", 
  fallback: "/videos/fallback-image.jpg"
};
```

## 🎯 Benefits of Local Videos
- ✅ Faster loading (no external requests)
- ✅ Better control over content
- ✅ No dependency on external services
- ✅ Better for production deployment
- ✅ Customizable and optimized

## 🛠️ Troubleshooting
- **Video not showing**: Check file path and format
- **Slow loading**: Compress the video file
- **Not looping**: Ensure video is short (under 30 seconds)
- **File too large**: Use video compression tools
