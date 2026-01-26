'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/ui/Layout';
import { PageHeader } from '@/components/ui/PageHeader';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { DataList } from '@/components/ui/DataList';
import { FormModal } from '@/components/ui/FormModal';
import { useEffect, useState } from 'react';
import { socialLinksAPI, SocialLink } from '@/lib/api/portfolio';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faLink } from '@fortawesome/free-solid-svg-icons';

const ICON_OPTIONS = [
  { value: 'github', label: 'GitHub' },
  { value: 'linkedin', label: 'LinkedIn' },
  { value: 'twitter', label: 'Twitter' },
  { value: 'envelope', label: 'Email' },
  { value: 'globe', label: 'Website' },
  { value: 'facebook', label: 'Facebook' },
  { value: 'instagram', label: 'Instagram' },
  { value: 'youtube', label: 'YouTube' },
];

export default function SocialLinksPage() {
  const [links, setLinks] = useState<SocialLink[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<SocialLink | null>(null);
  const [formData, setFormData] = useState<Omit<SocialLink, 'id'>>({
    name: '',
    url: '',
    icon: 'github',
    order: 0,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchLinks();
  }, []);

  const fetchLinks = async () => {
    try {
      const data = await socialLinksAPI.getAll();
      setLinks(data.sort((a, b) => a.order - b.order));
    } catch (error) {
      console.error('Failed to fetch links:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingLink(null);
    setFormData({
      name: '',
      url: '',
      icon: 'github',
      order: links.length,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (link: SocialLink) => {
    setEditingLink(link);
    setFormData({
      name: link.name,
      url: link.url,
      icon: link.icon,
      order: link.order,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this social link?')) return;
    try {
      await socialLinksAPI.delete(id);
      await fetchLinks();
    } catch (error) {
      console.error('Failed to delete link:', error);
      alert('Failed to delete link');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingLink?.id) {
        await socialLinksAPI.update(editingLink.id, formData);
      } else {
        await socialLinksAPI.create(formData);
      }
      await fetchLinks();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to save link:', error);
      alert('Failed to save link');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'url', label: 'URL', type: 'text', required: true, placeholder: 'https://...' },
    {
      name: 'icon',
      label: 'Icon',
      type: 'select',
      required: true,
      options: ICON_OPTIONS,
    },
    { name: 'order', label: 'Order', type: 'number', min: 0 },
  ];

  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <PageHeader
            title="Social Links"
            description="Manage your social media and contact links"
            icon={faLink}
            actionButton={
              <button
                onClick={handleCreate}
                className="px-3 md:px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all flex items-center gap-2 text-sm md:text-base whitespace-nowrap"
              >
                <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                <span className="hidden sm:inline">Add Link</span>
                <span className="sm:hidden">Add</span>
              </button>
            }
          />

          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <DataList
              items={links}
              onEdit={handleEdit}
              onDelete={handleDelete}
              renderItem={(link) => (
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{link.name}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 break-all">
                    {link.url}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    Icon: {link.icon} • Order: {link.order}
                  </p>
                </div>
              )}
              emptyMessage="No social links added yet. Click 'Add Link' to get started."
            />
          )}

          <FormModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={editingLink ? 'Edit Social Link' : 'Add Social Link'}
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

