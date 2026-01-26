'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/ui/Layout';
import { useEffect, useState } from 'react';
import { projectsAPI, Project } from '@/lib/api/projects';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    featured: 0,
  });

  useEffect(() => {
    // Only fetch projects when authenticated
    if (isAuthenticated && !authLoading) {
      fetchProjects();
    }
  }, [isAuthenticated, authLoading]);

  const fetchProjects = async () => {
    try {
      const data = await projectsAPI.getAll();
      setProjects(data);
      
      setStats({
        total: data.length,
        published: data.filter((p) => p.status === 'published').length,
        drafts: data.filter((p) => p.status === 'draft').length,
        featured: data.filter((p) => p.featured).length,
      });
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <h1 className="font-heading text-3xl font-bold mb-8 text-gray-900 dark:text-white">Dashboard</h1>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/20 dark:border-purple-500/20 hover:shadow-xl transition-shadow">
              <h3 className="font-body text-gray-500 dark:text-gray-400 text-sm font-medium">Total Projects</h3>
              <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{stats.total}</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/20 dark:border-green-500/20 hover:shadow-xl transition-shadow">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Published</h3>
              <p className="text-3xl font-bold mt-2 text-green-600 dark:text-green-400">{stats.published}</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/20 dark:border-yellow-500/20 hover:shadow-xl transition-shadow">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Drafts</h3>
              <p className="text-3xl font-bold mt-2 text-yellow-600 dark:text-yellow-400">{stats.drafts}</p>
            </div>
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md p-6 rounded-lg shadow-lg border border-white/20 dark:border-purple-500/20 hover:shadow-xl transition-shadow">
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Featured</h3>
              <p className="text-3xl font-bold mt-2 text-purple-600 dark:text-purple-400">{stats.featured}</p>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 dark:border-purple-500/20">
            <div className="p-4 md:p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="font-heading text-lg md:text-xl font-semibold text-gray-900 dark:text-white">Recent Projects</h2>
              <Link
                href="/projects/new"
                className="font-button px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 dark:from-purple-500 dark:to-purple-600 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 dark:hover:from-purple-600 dark:hover:to-purple-700 transition-all shadow-lg hover:shadow-purple-500/50 text-sm md:text-base whitespace-nowrap"
              >
                + New Project
              </Link>
            </div>

            {isLoading ? (
              <div className="p-8 text-center">Loading...</div>
            ) : projects.length === 0 ? (
              <div className="p-8 text-center text-gray-500 text-sm md:text-base">
                No projects yet. <Link href="/projects/new" className="text-blue-600 hover:underline">Create one</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Title</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase hidden sm:table-cell">Status</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase hidden md:table-cell">Category</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase hidden lg:table-cell">Featured</th>
                      <th className="px-3 md:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {projects.slice(0, 10).map((project) => (
                      <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                        <td className="px-3 md:px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{project.title}</div>
                          <div className="sm:hidden mt-1">
                            <span
                              className={`px-2 py-1 text-xs rounded-full ${
                                project.status === 'published'
                                  ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                                  : project.status === 'draft'
                                  ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
                                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                              }`}
                            >
                              {project.status}
                            </span>
                          </div>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                          <span
                            className={`px-2 py-1 text-xs rounded-full ${
                              project.status === 'published'
                                ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300'
                                : project.status === 'draft'
                                ? 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-300'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
                            }`}
                          >
                            {project.status}
                          </span>
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 hidden md:table-cell">
                          {project.category || 'N/A'}
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                          {project.featured ? (
                            <span className="text-purple-600 dark:text-purple-400">★</span>
                          ) : (
                            <span className="text-gray-400 dark:text-gray-600">☆</span>
                          )}
                        </td>
                        <td className="px-3 md:px-6 py-4 whitespace-nowrap text-sm">
                          <Link
                            href={`/projects/${project.id}/edit`}
                            className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

