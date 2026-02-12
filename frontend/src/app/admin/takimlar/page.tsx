"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function TakimlarPage() {
  return (
    <AdminCrudPage
      title="Takımlar"
      apiEndpoint="teams"
      fields={[
        { name: "name", label: "Takım Adı", type: "text", required: true, placeholder: "Takım adını girin" },
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
        { name: "sport_type", label: "Branş", type: "text", required: true, placeholder: "Futbol, Basketbol, Valorant..." },
        { name: "members_count", label: "Üye Sayısı", type: "number" },
        { name: "description", label: "Açıklama", type: "textarea", placeholder: "Takım hakkında kısa açıklama" },
        { name: "image_url", label: "Görsel URL", type: "text", placeholder: "https://..." },
      ]}
      displayColumns={[
        { key: "name", label: "Ad" },
        { key: "category", label: "Kategori" },
        { key: "sport_type", label: "Branş" },
        { key: "members_count", label: "Üye" },
      ]}
    />
  );
}
