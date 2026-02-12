"use client";

import { useEffect, useState, useCallback } from "react";

export interface FieldConfig {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "number" | "checkbox";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface AdminCrudPageProps {
  title: string;
  apiEndpoint: string;
  fields: FieldConfig[];
  displayColumns: { key: string; label: string; render?: (value: any, item: any) => string }[];
}

export default function AdminCrudPage({
  title,
  apiEndpoint,
  fields,
  displayColumns,
}: AdminCrudPageProps) {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/${apiEndpoint}`);
      const data = await res.json();
      setItems(data);
    } catch {
      console.error("Veri yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, [apiEndpoint]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openCreateModal = () => {
    setEditingItem(null);
    const initial: Record<string, any> = {};
    fields.forEach((f) => {
      initial[f.name] = f.type === "checkbox" ? false : f.type === "number" ? 0 : "";
    });
    setFormData(initial);
    setModalOpen(true);
  };

  const openEditModal = (item: any) => {
    setEditingItem(item);
    const data: Record<string, any> = {};
    fields.forEach((f) => {
      data[f.name] = item[f.name] ?? (f.type === "checkbox" ? false : f.type === "number" ? 0 : "");
    });
    setFormData(data);
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const url = editingItem
        ? `/api/admin/${apiEndpoint}/${editingItem.id}`
        : `/api/admin/${apiEndpoint}`;
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setModalOpen(false);
        fetchItems();
      }
    } catch {
      console.error("Kaydetme hatası");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/${apiEndpoint}/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setDeleteConfirm(null);
        fetchItems();
      }
    } catch {
      console.error("Silme hatası");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <button
          onClick={openCreateModal}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF4500] to-[#FF6B2C] text-white font-medium text-sm hover:opacity-90 transition-opacity"
        >
          + Yeni Ekle
        </button>
      </div>

      {loading ? (
        <div className="text-muted text-center py-12">Yükleniyor...</div>
      ) : items.length === 0 ? (
        <div className="text-muted text-center py-12">Henüz kayıt yok</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-card-border">
                <th className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">
                  ID
                </th>
                {displayColumns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left text-xs font-medium text-muted uppercase tracking-wider py-3 px-4"
                  >
                    {col.label}
                  </th>
                ))}
                <th className="text-right text-xs font-medium text-muted uppercase tracking-wider py-3 px-4">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-card-border/50 hover:bg-surface/50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-muted">{item.id}</td>
                  {displayColumns.map((col) => (
                    <td key={col.key} className="py-3 px-4 text-sm text-white">
                      {col.render
                        ? col.render(item[col.key], item)
                        : item[col.key] !== null && item[col.key] !== undefined
                        ? String(item[col.key])
                        : "-"}
                    </td>
                  ))}
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-3 py-1.5 text-xs rounded-md bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                      >
                        Düzenle
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        className="px-3 py-1.5 text-xs rounded-md bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        Sil
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card-bg border border-card-border rounded-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-card-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-white">
                {editingItem ? "Düzenle" : "Yeni Ekle"}
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-muted hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-muted mb-1.5">
                    {field.label}
                    {field.required && <span className="text-red-400 ml-1">*</span>}
                  </label>
                  {field.type === "textarea" ? (
                    <textarea
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-card-border text-white text-sm focus:outline-none focus:border-[#FF4500] transition-colors resize-y min-h-[80px]"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  ) : field.type === "select" ? (
                    <select
                      value={formData[field.name] || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.name]: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-card-border text-white text-sm focus:outline-none focus:border-[#FF4500] transition-colors"
                      required={field.required}
                    >
                      <option value="">Seçiniz</option>
                      {field.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData[field.name] || false}
                        onChange={(e) =>
                          setFormData({ ...formData, [field.name]: e.target.checked })
                        }
                        className="w-4 h-4 rounded border-card-border bg-surface accent-[#FF4500]"
                      />
                      <span className="text-sm text-white">Evet</span>
                    </label>
                  ) : (
                    <input
                      type={field.type}
                      value={formData[field.name] ?? ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          [field.name]:
                            field.type === "number"
                              ? parseInt(e.target.value) || 0
                              : e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-surface border border-card-border text-white text-sm focus:outline-none focus:border-[#FF4500] transition-colors"
                      placeholder={field.placeholder}
                      required={field.required}
                    />
                  )}
                </div>
              ))}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-card-border text-muted hover:text-white text-sm transition-colors"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#FF4500] to-[#FF6B2C] text-white font-medium text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {saving ? "Kaydediliyor..." : "Kaydet"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm !== null && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-card-bg border border-card-border rounded-xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-white mb-2">Silme Onayı</h3>
            <p className="text-muted text-sm mb-6">
              Bu kaydı silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-lg border border-card-border text-muted hover:text-white text-sm transition-colors"
              >
                İptal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 rounded-lg bg-red-500 text-white font-medium text-sm hover:bg-red-600 transition-colors"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
