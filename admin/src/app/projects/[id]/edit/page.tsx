'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/ui/Layout';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { projectsAPI, Project } from '@/lib/api/projects';
import Image from 'next/image';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = parseInt(params.id as string);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    short_description: '',
    live_link: '',
    github_link: '',
    demo_link: '',
    video_url: '',
    category: 'web',
    featured: false,
    status: 'draft',
    technologies: '',
  });
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [screenshots, setScreenshots] = useState<File[]>([]);
  const [video, setVideo] = useState<File | null>(null);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const data = await projectsAPI.getById(projectId);
      setProject(data);
      setFormData({
        title: data.title,
        description: data.description,
        short_description: data.short_description || '',
        live_link: data.live_link || '',
        github_link: data.github_link || '',
        demo_link: data.demo_link || '',
        video_url: data.video_url || '',
        category: data.category || 'web',
        featured: data.featured || false,
        status: data.status || 'draft',
        technologies: (data.technologies || []).join(', '),
      });
    } catch (error) {
      console.error('Failed to fetch project:', error);
      alert('Failed to load project');
      router.push('/projects');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const formDataToSend = new FormData();
      
      // Add text fields
      Object.entries(formData).forEach(([key, value]) => {
        if (key === 'technologies') {
          const techArray = (value as string).split(',').map((t: string) => t.trim()).filter(Boolean);
          formDataToSend.append(key, JSON.stringify(techArray));
        } else {
          formDataToSend.append(key, value.toString());
        }
      });

      // Add files only if new ones are selected
      if (thumbnail) formDataToSend.append('thumbnail', thumbnail);
      if (video) formDataToSend.append('video', video);
      screenshots.forEach((file) => {
        formDataToSend.append('screenshots', file);
      });

      await projectsAPI.update(projectId, formDataToSend);
      router.push('/projects');
    } catch (error: unknown) {
      console.error('Failed to update project:', error);
      const err = error as { response?: { data?: { error?: string } } };
      alert(err.response?.data?.error || 'Failed to update project');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="text-center py-12">Loading...</div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div className="max-w-4xl">
          <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Edit Project</h1>

          <form onSubmit={handleSubmit} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 dark:border-purple-500/20 p-8 space-y-6">
            {/* Same form fields as new project page */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Description
              </label>
              <input
                type="text"
                value={formData.short_description}
                onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Live Link
                </label>
                <input
                  type="url"
                  value={formData.live_link}
                  onChange={(e) => setFormData({ ...formData, live_link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub Link
                </label>
                <input
                  type="url"
                  value={formData.github_link}
                  onChange={(e) => setFormData({ ...formData, github_link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Demo Link
              </label>
              <input
                type="url"
                value={formData.demo_link}
                onChange={(e) => setFormData({ ...formData, demo_link: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <input
                type="url"
                value={formData.video_url}
                onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                >
                  <option value="web">Web</option>
                  <option value="mobile">Mobile</option>
                  <option value="desktop">Desktop</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' | 'archived' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="featured"
                checked={formData.featured}
                onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                className="mr-2"
              />
              <label htmlFor="featured" className="text-sm font-medium text-gray-700">
                Featured Project
              </label>
            </div>

            {project?.thumbnail_image && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Thumbnail
                </label>
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${project.thumbnail_image}`}
                  alt="Current thumbnail"
                  width={128}
                  height={128}
                  className="w-32 h-32 object-cover rounded"
                  unoptimized
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {project?.thumbnail_image ? 'Replace Thumbnail' : 'Thumbnail Image'}
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setThumbnail(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {project?.screenshots && project.screenshots.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Screenshots
                </label>
                <div className="flex gap-2 flex-wrap">
                  {project.screenshots.map((screenshot, index) => (
                    <div key={index} className="relative">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${screenshot}`}
                        alt={`Screenshot ${index + 1}`}
                        width={96}
                        height={96}
                        className="w-24 h-24 object-cover rounded"
                        unoptimized
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Add More Screenshots
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => setScreenshots(Array.from(e.target.files || []))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {project?.video_file && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Video
                </label>
                <video
                  src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${project.video_file}`}
                  controls
                  className="w-full max-w-md"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {project?.video_file ? 'Replace Video' : 'Video File'}
              </label>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => setVideo(e.target.files?.[0] || null)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isSaving}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-all shadow-lg hover:shadow-purple-500/50 disabled:opacity-50"
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

