'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/ui/Layout';
import { useEffect, useState } from 'react';
import { projectsAPI, Project } from '@/lib/api/projects';
import Link from 'next/link';
import Image from 'next/image';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      await projectsAPI.delete(id);
      fetchProjects();
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Projects</h1>
              <Link
                href="/projects/new"
                className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-all shadow-lg hover:shadow-purple-500/50"
              >
                + New Project
              </Link>
          </div>

          {isLoading ? (
            <div className="text-center py-12">Loading...</div>
          ) : projects.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-500 mb-4">No projects yet.</p>
              <Link href="/projects/new" className="text-blue-600 hover:underline">
                Create your first project
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 dark:border-purple-500/20 overflow-hidden hover:shadow-xl transition-shadow">
                  {project.thumbnail_image && (
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'}/${project.thumbnail_image}`}
                      alt={project.title}
                      width={400}
                      height={192}
                      className="w-full h-48 object-cover"
                      unoptimized
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {project.short_description || project.description}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`px-2 py-1 text-xs rounded-full ${
                          project.status === 'published'
                            ? 'bg-green-100 text-green-800'
                            : project.status === 'draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {project.status}
                      </span>
                      {project.featured && (
                        <span className="text-blue-600">★ Featured</span>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/projects/${project.id}/edit`}
                        className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-all shadow-lg hover:shadow-purple-500/50 text-center"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(project.id!)}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

