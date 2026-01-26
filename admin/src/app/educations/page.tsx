'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/ui/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { DataList } from '@/components/ui/DataList';
import { FormModal } from '@/components/ui/FormModal';
import { useEffect, useState } from 'react';
import { educationsAPI, Education } from '@/lib/api/portfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faGraduationCap } from '@fortawesome/free-solid-svg-icons';

const EDUCATION_TYPES: Education['type'][] = ['degree', 'diploma', 'certificate'];

const TYPE_LABELS: Record<Education['type'], string> = {
  degree: 'Degree',
  diploma: 'Diploma',
  certificate: 'Certificate',
};

export default function EducationsPage() {
  const [educations, setEducations] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEducation, setEditingEducation] = useState<Education | null>(null);
  const [formData, setFormData] = useState<Omit<Education, 'id'>>({
    degree: '',
    institution: '',
    period: '',
    type: 'degree',
    order: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const data = await educationsAPI.getAll();
      setEducations(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch educations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingEducation(null);
    setFormData({
      degree: '',
      institution: '',
      period: '',
      type: 'degree',
      order: educations.length,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (education: Education) => {
    setEditingEducation(education);
    setFormData({
      degree: education.degree,
      institution: education.institution,
      period: education.period,
      type: education.type,
      order: education.order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this education?')) return;
    try {
      await educationsAPI.delete(id);
      await fetchEducations();
    } catch (error) {
      console.error('Failed to delete education:', error);
      alert('Failed to delete education');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingEducation?.id) {
        await educationsAPI.update(editingEducation.id, formData);
      } else {
        await educationsAPI.create(formData);
      }
      await fetchEducations();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save education:', error);
      alert('Failed to save education');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: 'degree', label: 'Degree', type: 'text', required: true },
    { name: 'institution', label: 'Institution', type: 'text', required: true },
    { name: 'period', label: 'Period', type: 'text', required: true, placeholder: 'e.g., 2025-2026' },
    {
      name: 'type',
      label: 'Type',
      type: 'select',
      required: true,
      options: EDUCATION_TYPES.map((type) => ({ value: type, label: TYPE_LABELS[type] })),
    },
    { name: 'order', label: 'Order', type: 'number', min: 0 },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <PageHeader
            title="Education"
            description="Manage your educational background"
            icon={faGraduationCap}
            actionButton={
              <button
                onClick={handleCreate}
                className="px-3 md:px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all flex items-center gap-2 text-sm md:text-base whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                <span className="hidden sm:inline">Add Education</span>
                <span className="sm:hidden">Add</span>
              </button>
            }
          />

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <DataList
              items={educations}
              onEdit={handleEdit}
              onDelete={handleDelete}
              renderItem={(edu) => (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{edu.degree}</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mt-1">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    📅 {edu.period} • {TYPE_LABELS[edu.type]}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Order: {edu.order}</p>
                </div>
              )}
              emptyMessage="No education entries added yet. Click 'Add Education' to get started."
            />
          )}

          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingEducation ? 'Edit Education' : 'Add Education'}
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

