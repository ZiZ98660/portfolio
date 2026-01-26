# Admin Panel - Portfolio Management

Admin dashboard for managing portfolio projects, uploading images, videos, and screenshots.

## 🚀 Features

- ✅ **Authentication** - Secure JWT-based login
- ✅ **Dashboard** - Overview of all projects with statistics
- ✅ **Project Management** - Create, edit, delete projects
- ✅ **File Uploads** - Upload thumbnails, screenshots, and videos
- ✅ **Project Status** - Draft, Published, Archived
- ✅ **Featured Projects** - Mark projects as featured
- ✅ **Real-time Updates** - Changes reflect immediately on frontend

## 📋 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

### 3. Run Development Server

```bash
npm run dev
```

The admin panel will be available at `http://localhost:3001` (or next available port)

## 🔐 Default Login

- **Username:** `admin`
- **Password:** `admin123`

⚠️ **Change these credentials in production!**

## 📁 Project Structure

```
admin/
├── src/
│   ├── app/              # Next.js app router
│   │   ├── login/       # Login page
│   │   ├── dashboard/   # Dashboard
│   │   └── projects/    # Project management
│   ├── components/      # React components
│   │   ├── auth/        # Authentication components
│   │   ├── projects/    # Project components
│   │   └── ui/          # UI components
│   ├── contexts/        # React contexts
│   └── lib/             # Utilities
│       └── api/         # API client and services
```

## 🎯 Usage

### Creating a Project

1. Navigate to "New Project"
2. Fill in project details
3. Upload thumbnail image
4. Upload screenshots (multiple)
5. Optionally upload video file or add video URL
6. Add live links (GitHub, demo, etc.)
7. Set status (Draft/Published/Archived)
8. Mark as featured if desired
9. Click "Create Project"

### Editing a Project

1. Go to Projects page
2. Click "Edit" on any project
3. Modify fields as needed
4. Upload new files to replace existing ones
5. Click "Save Changes"

### Project Status

- **Draft** - Not visible on public frontend
- **Published** - Visible on public frontend
- **Archived** - Hidden from public view

## 🔗 Integration with Frontend

All changes made in the admin panel automatically reflect on the main frontend when projects are set to "Published" status. The frontend fetches data from:

- `GET /api/projects` - All published projects
- `GET /api/projects/featured` - Featured projects
- `GET /api/projects/<id>` - Single project

## 🛠️ Development

### Build for Production

```bash
npm run build
npm start
```

### Environment Variables

- `NEXT_PUBLIC_API_URL` - Backend API URL (required)

## 📝 Notes

- File uploads are handled via multipart/form-data
- Images are automatically optimized on the backend
- Videos can be uploaded as files or linked via URL (YouTube, Vimeo, etc.)
- All API calls include JWT authentication automatically
