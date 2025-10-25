#!/bin/bash

# Script to compress the hero background video for web optimization
# This will reduce file size while maintaining good quality

echo "🎬 Compressing hero-background.mp4 for web optimization..."

# Check if FFmpeg is installed
if ! command -v ffmpeg &> /dev/null; then
    echo "❌ FFmpeg is not installed. Please install it first:"
    echo "   - macOS: brew install ffmpeg"
    echo "   - Ubuntu: sudo apt install ffmpeg"
    echo "   - Windows: Download from https://ffmpeg.org/"
    exit 1
fi

# Create backup of original
if [ -f "public/videos/hero-background.mp4" ]; then
    echo "📦 Creating backup of original video..."
    cp public/videos/hero-background.mp4 public/videos/hero-background-original.mp4
fi

# Compress video for web
echo "⚙️ Compressing video..."
ffmpeg -i public/videos/hero-background.mp4 \
    -vcodec h264 \
    -acodec aac \
    -crf 28 \
    -preset fast \
    -movflags +faststart \
    -t 30 \
    -y \
    public/videos/hero-background-compressed.mp4

# Replace original with compressed version
if [ -f "public/videos/hero-background-compressed.mp4" ]; then
    echo "✅ Compression successful!"
    echo "📊 File sizes:"
    echo "   Original: $(du -h public/videos/hero-background-original.mp4 | cut -f1)"
    echo "   Compressed: $(du -h public/videos/hero-background-compressed.mp4 | cut -f1)"
    
    # Replace original
    mv public/videos/hero-background-compressed.mp4 public/videos/hero-background.mp4
    echo "🔄 Replaced original with compressed version"
else
    echo "❌ Compression failed"
    exit 1
fi

echo "✅ Video optimization complete!"
echo "🎯 Your video should now load much faster in the browser"
