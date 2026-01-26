'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/ui/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { DataList } from '@/components/ui/DataList';
import { FormModal } from '@/components/ui/FormModal';
import { useEffect, useState } from 'react';
import { certificationsAPI, Certification } from '@/lib/api/portfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faAward } from '@fortawesome/free-solid-svg-icons';

export default function CertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCertification, setEditingCertification] = useState<Certification | null>(null);
  const [formData, setFormData] = useState<Omit<Certification, 'id'>>({
    name: '',
    issuer: '',
    order: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCertifications();
  }, []);

  const fetchCertifications = async () => {
    try {
      const data = await certificationsAPI.getAll();
      setCertifications(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch certifications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingCertification(null);
    setFormData({
      name: '',
      issuer: '',
      order: certifications.length,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (certification: Certification) => {
    setEditingCertification(certification);
    setFormData({
      name: certification.name,
      issuer: certification.issuer,
      order: certification.order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;
    try {
      await certificationsAPI.delete(id);
      await fetchCertifications();
    } catch (error) {
      console.error('Failed to delete certification:', error);
      alert('Failed to delete certification');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingCertification?.id) {
        await certificationsAPI.update(editingCertification.id, formData);
      } else {
        await certificationsAPI.create(formData);
      }
      await fetchCertifications();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save certification:', error);
      alert('Failed to save certification');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: 'name', label: 'Certification Name', type: 'text', required: true },
    { name: 'issuer', label: 'Issuer', type: 'text', required: true },
    { name: 'order', label: 'Order', type: 'number', min: 0 },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <PageHeader
            title="Certifications"
            description="Manage your professional certifications"
            icon={faAward}
            actionButton={
              <button
                onClick={handleCreate}
                className="px-3 md:px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all flex items-center gap-2 text-sm md:text-base whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                <span className="hidden sm:inline">Add Certification</span>
                <span className="sm:hidden">Add</span>
              </button>
            }
          />

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <DataList
              items={certifications}
              onEdit={handleEdit}
              onDelete={handleDelete}
              renderItem={(cert) => (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{cert.name}</h3>
                  <p className="text-sm text-purple-600 dark:text-purple-400 font-semibold mt-1">
                    {cert.issuer}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">Order: {cert.order}</p>
                </div>
              )}
              emptyMessage="No certifications added yet. Click 'Add Certification' to get started."
            />
          )}

          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingCertification ? 'Edit Certification' : 'Add Certification'}
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

