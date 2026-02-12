"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function BasarilarPage() {
  return (
    <AdminCrudPage
      title="Başarılar"
      apiEndpoint="achievements"
      fields={[
        { name: "title", label: "Başlık", type: "text", required: true, placeholder: "Başarı başlığı" },
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
        { name: "date", label: "Tarih", type: "text", required: true, placeholder: "2025-11-20" },
        { name: "description", label: "Açıklama", type: "textarea", placeholder: "Başarı detayları" },
        { name: "team_id", label: "Takım ID", type: "number", placeholder: "İlişkili takım ID" },
      ]}
      displayColumns={[
        { key: "title", label: "Başlık" },
        { key: "category", label: "Kategori" },
        { key: "date", label: "Tarih" },
        {
          key: "team",
          label: "Takım",
          render: (value: any) => value?.name || "-",
        },
      ]}
    />
  );
}
