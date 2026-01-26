'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/ui/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { FormModal } from '@/components/ui/FormModal';
import { useEffect, useState } from 'react';
import { technicalSkillsAPI, TechnicalSkill } from '@/lib/api/portfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faCode, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

const CATEGORIES: TechnicalSkill['category'][] = ['core', 'frontend', 'backend', 'database', 'devops'];

const CATEGORY_LABELS: Record<TechnicalSkill['category'], string> = {
  core: 'Core Technologies',
  frontend: 'Frontend',
  backend: 'Backend',
  database: 'Database',
  devops: 'DevOps',
};

export default function TechnicalSkillsPage() {
  const [skills, setSkills] = useState<TechnicalSkill[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<TechnicalSkill | null>(null);
  const [formData, setFormData] = useState<Omit<TechnicalSkill, 'id'>>({
    name: '',
    category: 'core',
    order: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const data = await technicalSkillsAPI.getAll();
      setSkills(data);
    } catch (error) {
      console.error('Failed to fetch skills:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingSkill(null);
    setFormData({
      name: '',
      category: 'core',
      order: skills.length,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (skill: TechnicalSkill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category,
      order: skill.order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      await technicalSkillsAPI.delete(id);
      await fetchSkills();
    } catch (error) {
      console.error('Failed to delete skill:', error);
      alert('Failed to delete skill');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingSkill?.id) {
        await technicalSkillsAPI.update(editingSkill.id, formData);
      } else {
        await technicalSkillsAPI.create(formData);
      }
      await fetchSkills();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save skill:', error);
      alert('Failed to save skill');
    } finally {
      setIsSubmitting(false);
    }
  };

  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<TechnicalSkill['category'], TechnicalSkill[]>);

  const formFields = [
    { name: 'name', label: 'Skill Name', type: 'text', required: true },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      required: true,
      options: CATEGORIES.map((cat) => ({ value: cat, label: CATEGORY_LABELS[cat] })),
    },
    { name: 'order', label: 'Order', type: 'number', min: 0 },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <PageHeader
            title="Technical Skills"
            description="Manage your technical skills by category"
            icon={faCode}
            actionButton={
              <button
                onClick={handleCreate}
                className="px-3 md:px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all flex items-center gap-2 text-sm md:text-base whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                <span className="hidden sm:inline">Add Skill</span>
                <span className="sm:hidden">Add</span>
              </button>
            }
          />

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div className="space-y-4 md:space-y-6">
              {CATEGORIES.map((category) => {
                const categorySkills = skillsByCategory[category] || [];
                return (
                  <div
                    key={category}
                    className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 dark:border-purple-500/20 p-4 md:p-6"
                  >
                    <h2 className="font-heading text-lg md:text-xl font-semibold text-gray-900 dark:text-white mb-3 md:mb-4">
                      {CATEGORY_LABELS[category]}
                    </h2>
                    {categorySkills.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        No skills in this category
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                        {categorySkills
                          .sort((a, b) => a.order - b.order)
                          .map((skill) => (
                            <div
                              key={skill.id}
                              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow bg-white dark:bg-gray-700"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {skill.name}
                                  </h3>
                                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Order: {skill.order}
                                  </p>
                                </div>
                                <div className="flex gap-2 ml-4 flex-shrink-0">
                                  <button
                                    onClick={() => handleEdit(skill)}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1"
                                    title="Edit"
                                  >
                                    <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
                                  </button>
                                  <button
                                    onClick={() => skill.id && handleDelete(skill.id)}
                                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 p-1"
                                    title="Delete"
                                  >
                                    <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingSkill ? 'Edit Skill' : 'Add Skill'}
            fields={formFields}
            formData={formData}
            onFormDataChange={(name, value) => setFormData({ ...formData, [name]: value })}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        </div>
      </Layout>
    </ProtectedRoute>
  );
}
