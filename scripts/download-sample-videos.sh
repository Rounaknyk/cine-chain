#!/bin/bash

# Script to download sample videos for the LogiVision project
# Run this script to get sample videos for testing

echo "🎬 Downloading sample videos for LogiVision..."

# Create videos directory if it doesn't exist
mkdir -p public/videos

# Download sample videos (these are shorter, optimized videos)
echo "📥 Downloading primary video..."
curl -o public/videos/hero-background.mp4 "https://videos.pexels.com/video-files/3195391/3195391-uhd_2560_1440_25fps.mp4"

echo "📥 Downloading secondary video..."
curl -o public/videos/hero-background-2.mp4 "https://videos.pexels.com/video-files/3195392/3195392-uhd_2560_1440_25fps.mp4"

echo "📥 Downloading fallback image..."
curl -o public/videos/fallback-image.jpg "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"

echo "✅ Sample videos downloaded successfully!"
echo "📁 Videos are now in: public/videos/"
echo ""
echo "🎯 To use your own videos:"
echo "1. Replace hero-background.mp4 with your main video"
echo "2. Replace hero-background-2.mp4 with your backup video (optional)"
echo "3. Replace fallback-image.jpg with your fallback image (optional)"
echo ""
echo "💡 Recommended video specs:"
echo "   - Duration: 10-30 seconds (for looping)"
echo "   - Resolution: 1920x1080 or higher"
echo "   - Format: MP4"
echo "   - File size: Under 10MB"



