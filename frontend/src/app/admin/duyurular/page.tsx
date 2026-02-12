"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function DuyurularPage() {
  return (
    <AdminCrudPage
      title="Duyurular"
      apiEndpoint="announcements"
      fields={[
        { name: "title", label: "Başlık", type: "text", required: true, placeholder: "Duyuru başlığı" },
        {
          name: "category",
          label: "Kategori",
          type: "select",
          required: true,
          options: [
            { value: "spor", label: "Spor" },
            { value: "e-spor", label: "E-Spor" },
          ],
        },
        { name: "date", label: "Tarih", type: "text", required: true, placeholder: "2026-02-10T14:00:00" },
        { name: "summary", label: "Özet", type: "textarea", required: true, placeholder: "Duyuru özeti" },
        { name: "pinned", label: "Sabitlenmiş", type: "checkbox" },
      ]}
      displayColumns={[
        { key: "title", label: "Başlık" },
        { key: "category", label: "Kategori" },
        { key: "date", label: "Tarih" },
        {
          key: "pinned",
          label: "Sabit",
          render: (value: boolean) => (value ? "📌 Evet" : "Hayır"),
        },
      ]}
    />
  );
}
