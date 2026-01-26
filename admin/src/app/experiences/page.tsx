'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/ui/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { DataList } from '@/components/ui/DataList';
import { FormModal } from '@/components/ui/FormModal';
import { useEffect, useState } from 'react';
import { experiencesAPI, Experience } from '@/lib/api/portfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faBriefcase } from '@fortawesome/free-solid-svg-icons';

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const [formData, setFormData] = useState<Omit<Experience, 'id'>>({
    company: '',
    location: '',
    role: '',
    period: '',
    achievements: [],
    order: 0,
  });
  const [achievementsText, setAchievementsText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const data = await experiencesAPI.getAll();
      setExperiences(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingExperience(null);
    setFormData({
      company: '',
      location: '',
      role: '',
      period: '',
      achievements: [],
      order: experiences.length,
    });
    setAchievementsText('');
    setIsModalOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setFormData({
      company: experience.company,
      location: experience.location,
      role: experience.role,
      period: experience.period,
      achievements: experience.achievements || [],
      order: experience.order,
    });
    setAchievementsText((experience.achievements || []).join('\n'));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      await experiencesAPI.delete(id);
      await fetchExperiences();
    } catch (error) {
      console.error('Failed to delete experience:', error);
      alert('Failed to delete experience');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const achievements = achievementsText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);

      const dataToSubmit = {
        ...formData,
        achievements,
      };

      if (editingExperience?.id) {
        await experiencesAPI.update(editingExperience.id, dataToSubmit);
      } else {
        await experiencesAPI.create(dataToSubmit);
      }
      await fetchExperiences();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save experience:', error);
      alert('Failed to save experience');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: 'company', label: 'Company', type: 'text', required: true },
    { name: 'location', label: 'Location', type: 'text', required: true },
    { name: 'role', label: 'Role/Position', type: 'text', required: true },
    { name: 'period', label: 'Period', type: 'text', required: true, placeholder: 'e.g., 2025-Present' },
    { name: 'order', label: 'Order', type: 'number', min: 0 },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <PageHeader
            title="Work Experience"
            description="Manage your professional work experience"
            icon={faBriefcase}
            actionButton={
              <button
                onClick={handleCreate}
                className="px-3 md:px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all flex items-center gap-2 text-sm md:text-base whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                <span className="hidden sm:inline">Add Experience</span>
                <span className="sm:hidden">Add</span>
              </button>
            }
          />

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <DataList
              items={experiences}
              onEdit={handleEdit}
              onDelete={handleDelete}
              renderItem={(exp) => (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{exp.role}</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mt-1">
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    📍 {exp.location} • 📅 {exp.period}
                  </p>
                  {exp.achievements && exp.achievements.length > 0 && (
                    <ul className="text-xs text-gray-400 dark:text-gray-500 mt-2 list-disc list-inside">
                      {exp.achievements.slice(0, 2).map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                      {exp.achievements.length > 2 && (
                        <li>+{exp.achievements.length - 2} more...</li>
                      )}
                    </ul>
                  )}
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Order: {exp.order}</p>
                </div>
              )}
              emptyMessage="No work experience added yet. Click 'Add Experience' to get started."
            />
          )}

          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="font-heading text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {editingExperience ? 'Edit Experience' : 'Add Experience'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  {formFields.map((field) => (
                    <div key={field.name}>
                      <label className="font-body block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        {field.label}
                      </label>
                      <input
                        type={field.type || 'text'}
                        value={formData[field.name as keyof typeof formData] as string | number}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            [field.name]: field.type === 'number' ? parseInt(e.target.value) || 0 : e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder={field.placeholder}
                        required={field.required}
                        min={field.min}
                      />
                    </div>
                  ))}
                  <div>
                    <label className="font-body block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Achievements (one per line)
                    </label>
                    <textarea
                      value={achievementsText}
                      onChange={(e) => setAchievementsText(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      rows={5}
                      placeholder="Enter achievements, one per line..."
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
                    <button
                      type="submit"
                      className="font-button flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm md:text-base"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-all text-sm md:text-base"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
}

