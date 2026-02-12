"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function TurnuvalarPage() {
  return (
    <AdminCrudPage
      title="Turnuvalar"
      apiEndpoint="tournaments"
      fields={[
        { name: "name", label: "Turnuva Adı", type: "text", required: true, placeholder: "Turnuva adını girin" },
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
        { name: "date", label: "Tarih", type: "text", required: true, placeholder: "2026-03-15" },
        { name: "location", label: "Konum", type: "text", placeholder: "Turnuva konumu" },
        {
          name: "status",
          label: "Durum",
          type: "select",
          required: true,
          options: [
            { value: "upcoming", label: "Yaklaşan" },
            { value: "ongoing", label: "Devam Eden" },
            { value: "completed", label: "Tamamlandı" },
          ],
        },
        { name: "description", label: "Açıklama", type: "textarea", placeholder: "Turnuva hakkında bilgi" },
        { name: "image_url", label: "Görsel URL", type: "text", placeholder: "https://..." },
      ]}
      displayColumns={[
        { key: "name", label: "Ad" },
        { key: "category", label: "Kategori" },
        { key: "date", label: "Tarih" },
        { key: "status", label: "Durum" },
        { key: "location", label: "Konum" },
      ]}
    />
  );
}
