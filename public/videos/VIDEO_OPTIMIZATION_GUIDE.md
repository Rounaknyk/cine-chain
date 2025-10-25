# Video Optimization Guide

## 🎬 How to Optimize Your Videos for Web

### 1. **Video Length**
- **Recommended**: 10-30 seconds
- **Why**: Shorter videos loop better and load faster
- **Tip**: Use video editing software to trim longer videos

### 2. **File Size**
- **Target**: Under 10MB per video
- **Why**: Faster loading, better user experience
- **Tools**: Use HandBrake, FFmpeg, or online compressors

### 3. **Resolution**
- **Recommended**: 1920x1080 (Full HD)
- **Minimum**: 1280x720 (HD)
- **Maximum**: 4K (if file size allows)

### 4. **Format & Codec**
- **Format**: MP4
- **Codec**: H.264
- **Why**: Best browser compatibility

## 🛠️ Quick Optimization Commands

### Using FFmpeg (if installed):
```bash
# Compress video (reduce file size)
ffmpeg -i input.mp4 -vcodec h264 -acodec mp2 -crf 28 output.mp4

# Trim video to 30 seconds
ffmpeg -i input.mp4 -t 30 -c copy output.mp4

# Resize to 1920x1080
ffmpeg -i input.mp4 -vf scale=1920:1080 output.mp4
```

### Using HandBrake (GUI):
1. Open HandBrake
2. Select your video
3. Choose "Web" preset
4. Set duration to 30 seconds max
5. Start encoding

## 📁 File Structure
```
public/videos/
├── hero-background.mp4      # Main video (required)
├── hero-background-2.mp4    # Backup video (optional)
├── fallback-image.jpg       # Fallback image (optional)
└── README.md               # This guide
```

## 🚀 Performance Tips
- Use multiple video sources for better compatibility
- Always include a fallback image
- Test on different devices and browsers
- Consider using WebP format for images

## 🔧 Troubleshooting
- **Video not playing**: Check file format (use MP4)
- **Slow loading**: Compress the video file
- **Poor quality**: Increase bitrate or resolution
- **Not looping**: Ensure video is short (under 30 seconds)
