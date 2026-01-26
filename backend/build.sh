#!/bin/bash
# Build script for Render deployment

echo "🔧 Installing dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Build complete!"
echo "💡 Note: Database will be initialized on first run or via Shell command"

