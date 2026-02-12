"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function EtkinliklerPage() {
  return (
    <AdminCrudPage
      title="Etkinlikler"
      apiEndpoint="events"
      fields={[
        { name: "title", label: "Etkinlik Adı", type: "text", required: true, placeholder: "Etkinlik adını girin" },
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
        { name: "date", label: "Tarih", type: "text", required: true, placeholder: "2026-02-20" },
        { name: "location", label: "Konum", type: "text", placeholder: "Etkinlik konumu" },
        { name: "description", label: "Açıklama", type: "textarea", placeholder: "Etkinlik detayları" },
        { name: "image_url", label: "Görsel URL", type: "text", placeholder: "https://..." },
      ]}
      displayColumns={[
        { key: "title", label: "Ad" },
        { key: "category", label: "Kategori" },
        { key: "date", label: "Tarih" },
        { key: "location", label: "Konum" },
      ]}
    />
  );
}
