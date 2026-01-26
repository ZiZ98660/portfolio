# Cloudinary Setup Guide

Cloudinary provides free cloud storage for images and videos, perfect for portfolio file uploads.

## 🆓 Free Tier

- **25GB storage**
- **25GB bandwidth/month**
- **Image & video transformations**
- **CDN delivery**

## 📝 Setup Steps

### 1. Create Cloudinary Account

1. Go to https://cloudinary.com/users/register/free
2. Sign up for free account
3. Verify your email

### 2. Get Your Credentials

1. Go to Dashboard: https://console.cloudinary.com/console
2. Copy your credentials:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123456`)

### 3. Configure `.env` File

Create a `.env` file in the `backend/` directory:

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
USE_CLOUDINARY=true
```

### 4. Install Cloudinary

```bash
cd backend
pip install cloudinary
```

Or if using requirements.txt:
```bash
pip install -r requirements.txt
```

### 5. Test Upload

The backend will automatically use Cloudinary when:
- `USE_CLOUDINARY=true` is set
- All Cloudinary credentials are provided
- Cloudinary package is installed

## 🔄 How It Works

- **When `USE_CLOUDINARY=true`**: Files are uploaded to Cloudinary and return Cloudinary URLs
- **When `USE_CLOUDINARY=false`**: Files are saved locally in `uploads/` folder
- **Fallback**: If Cloudinary upload fails, it automatically falls back to local storage

## 📁 File Structure in Cloudinary

Files are organized in folders:
- `portfolio/projects/` - Project thumbnails
- `portfolio/screenshots/` - Project screenshots
- `portfolio/videos/` - Project videos
- `portfolio/profile/` - Profile images

## 🎨 Image Optimization

Cloudinary automatically:
- Optimizes images for web
- Resizes large images (max 1920x1080)
- Converts to optimal format
- Delivers via CDN

## 🗑️ File Deletion

When you delete a file:
- Cloudinary URLs are automatically detected
- Files are deleted from Cloudinary
- Local files are deleted from `uploads/` folder

## ⚙️ Environment Variables

```env
# Enable/disable Cloudinary
USE_CLOUDINARY=true  # or false

# Required if USE_CLOUDINARY=true
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

## 🔒 Security

**Important:** Never commit your `.env` file to Git!

Add to `.gitignore`:
```
.env
```

## 📚 Resources

- [Cloudinary Docs](https://cloudinary.com/documentation)
- [Python SDK](https://cloudinary.com/documentation/python_integration)
- [Free Tier Limits](https://cloudinary.com/pricing)

