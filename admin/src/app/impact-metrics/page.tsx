'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Layout } from '@/components/ui/Layout';
import { useEffect, useState } from 'react';
import { impactMetricsAPI, ImpactMetric } from '@/lib/api/portfolio';

export default function ImpactMetricsPage() {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState<ImpactMetric | null>(null);
  const [formData, setFormData] = useState<Omit<ImpactMetric, 'id'>>({
    value: 0,
    suffix: '%',
    label: '',
    color: 'from-blue-400 to-cyan-400',
    order: 0,
  });

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const data = await impactMetricsAPI.getAll();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingMetric(null);
    setFormData({
      value: 0,
      suffix: '%',
      label: '',
      color: 'from-blue-400 to-cyan-400',
      order: metrics.length,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (metric: ImpactMetric) => {
    setEditingMetric(metric);
    setFormData({
      value: metric.value,
      suffix: metric.suffix,
      label: metric.label,
      color: metric.color,
      order: metric.order,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingMetric) {
        await impactMetricsAPI.update(editingMetric.id!, formData);
      } else {
        await impactMetricsAPI.create(formData);
      }
      setIsModalOpen(false);
      fetchMetrics();
      alert('Metric saved successfully!');
    } catch (error) {
      console.error('Failed to save metric:', error);
      alert('Failed to save metric');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this metric?')) return;
    try {
      await impactMetricsAPI.delete(id);
      fetchMetrics();
      alert('Metric deleted successfully!');
    } catch (error) {
      console.error('Failed to delete metric:', error);
      alert('Failed to delete metric');
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <Layout>
          <div>Loading...</div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout>
        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 md:mb-8">
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Impact Metrics</h1>
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all text-sm md:text-base whitespace-nowrap"
            >
              + Add Metric
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {metrics.map((metric) => (
              <div
                key={metric.id}
                className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-lg shadow-lg border border-white/20 dark:border-purple-500/20 p-4 md:p-6"
              >
                <div className="text-3xl font-bold mb-2">
                  {metric.value}{metric.suffix}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {metric.label}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(metric)}
                    className="text-purple-600 dark:text-purple-400 hover:underline text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(metric.id!)}
                    className="text-red-600 dark:text-red-400 hover:underline text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>

          {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
                <h2 className="font-heading text-xl md:text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                  {editingMetric ? 'Edit Metric' : 'Create Metric'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
                  <div>
                    <label className="font-body block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Value
                    </label>
                    <input
                      type="number"
                      value={formData.value}
                      onChange={(e) => setFormData({ ...formData, value: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Suffix
                    </label>
                    <input
                      type="text"
                      value={formData.suffix}
                      onChange={(e) => setFormData({ ...formData, suffix: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="%, +, etc."
                    />
                  </div>
                  <div>
                    <label className="font-body block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Label
                    </label>
                    <input
                      type="text"
                      value={formData.label}
                      onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-body block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Color (Tailwind gradient classes)
                    </label>
                    <input
                      type="text"
                      value={formData.color}
                      onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="from-blue-400 to-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="font-body block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Order
                    </label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                    <button
                      type="submit"
                      className="font-button flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all text-sm md:text-base"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="flex-1 px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-900 dark:text-white rounded-lg hover:bg-gray-400 dark:hover:bg-gray-700 transition-all text-sm md:text-base"
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

