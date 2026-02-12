"use client";

import AdminCrudPage from "@/components/admin/AdminCrudPage";

export default function SponsorlarPage() {
  return (
    <AdminCrudPage
      title="Sponsorlar"
      apiEndpoint="sponsors"
      fields={[
        { name: "name", label: "Sponsor Adı", type: "text", required: true, placeholder: "Sponsor adını girin" },
        { name: "logo_url", label: "Logo URL", type: "text", placeholder: "https://..." },
        { name: "order", label: "Sıra", type: "number", placeholder: "Görüntülenme sırası" },
      ]}
      displayColumns={[
        { key: "name", label: "Ad" },
        { key: "logo_url", label: "Logo", render: (value: string) => (value ? "✅" : "❌") },
        { key: "order", label: "Sıra" },
      ]}
    />
  );
}
