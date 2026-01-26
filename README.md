# Portfolio Project - Next.js + Flask

A modern, full-stack portfolio website featuring Next.js frontend with 3D animations, Flask backend API, and interactive avatar components.

## 🚀 Features

- **Next.js 15** - Modern React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **3D Animations** - Interactive Three.js scenes with React Three Fiber
- **Avatar System** - 3D and 2D avatar components
- **Flask Backend** - Lightweight Python API
- **Framer Motion** - Smooth animations and transitions

## 📁 Project Structure

```
.
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/          # Next.js app router pages
│   │   ├── components/   # React components
│   │   │   ├── 3d/       # 3D animation components
│   │   │   └── avatar/   # Avatar components
│   │   └── lib/          # Utility functions
│   └── public/           # Static assets
├── backend/              # Flask backend API
│   ├── app.py           # Main Flask application
│   ├── requirements.txt # Python dependencies
│   └── venv/            # Virtual environment
└── README.md            # This file
```

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Python** 3.9+
- **Git**

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Activate the virtual environment:
```bash
# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate
```

3. Install Python dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

The API will be available at `http://localhost:5001`

## 🎨 3D Components

The project includes several 3D components:

- **Scene3D** - Main 3D scene with camera controls
- **Avatar3D** - 3D avatar model (customizable)
- **Particles3D** - Animated particle system

## 👤 Avatar System

Two avatar components are available:

- **Avatar3D** - 3D rendered avatar using Three.js
- **AvatarDisplay** - 2D image avatar with hover effects

## 📦 Available Scripts

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Backend
- `python app.py` - Start Flask development server

## 🔧 Configuration

### Frontend Environment Variables

Create a `.env.local` file in the `frontend/` directory:
```
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:
```
PORT=5001
FLASK_ENV=development
```

## 🚢 Deployment

### Frontend (Render Static Site)
1. Create a new **Static Site** on Render
2. Connect your GitHub repository
3. Configure settings:
   - **Root Directory:** `frontend`
   - **Build Command:** `npm run build`
   - **Output Directory:** `out`
   - **Environment Variables:** 
     - `NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com`
4. **Custom Domain (Optional):**
   - Go to Settings → Custom Domains
   - Add your domain (e.g., `yourname.com`)
   - Follow Render's DNS instructions to point your domain
   - SSL certificate is automatically provisioned (free)

### Backend (Render/Railway/Heroku)
1. Set Python version
2. Install dependencies: `pip install -r requirements.txt`
3. **Start Command:** `gunicorn app:app --bind 0.0.0.0:$PORT` (for production) or `python app.py` (for development)

**Note:** On Render, the `PORT` environment variable is automatically set by the platform. The `gunicorn.conf.py` file ensures Gunicorn binds to the correct port. For local development, it defaults to 5001.

## 📚 Technologies Used

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS, Three.js, React Three Fiber, Framer Motion
- **Backend**: Flask, Python, Flask-CORS
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📄 License

This project is open source and available under the MIT License.
