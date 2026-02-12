"use client";

import { useEffect, useState } from "react";

interface Stats {
  teams: number;
  tournaments: number;
  achievements: number;
  events: number;
  announcements: number;
  sponsors: number;
}

const statCards = [
  { key: "teams", label: "Takımlar", icon: "👥", color: "from-blue-500 to-blue-600" },
  { key: "tournaments", label: "Turnuvalar", icon: "🏆", color: "from-yellow-500 to-orange-500" },
  { key: "achievements", label: "Başarılar", icon: "🏅", color: "from-green-500 to-emerald-500" },
  { key: "events", label: "Etkinlikler", icon: "📅", color: "from-purple-500 to-violet-500" },
  { key: "announcements", label: "Duyurular", icon: "📢", color: "from-pink-500 to-rose-500" },
  { key: "sponsors", label: "Sponsorlar", icon: "🤝", color: "from-cyan-500 to-teal-500" },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const endpoints = ["teams", "tournaments", "achievements", "events", "announcements", "sponsors"];
        const results = await Promise.all(
          endpoints.map((e) => fetch(`/api/${e}`).then((r) => r.json()))
        );
        setStats({
          teams: results[0].length,
          tournaments: results[1].length,
          achievements: results[2].length,
          events: results[3].length,
          announcements: results[4].length,
          sponsors: results[5].length,
        });
      } catch {
        console.error("İstatistikler yüklenemedi");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-8">Dashboard</h1>

      {loading ? (
        <div className="text-muted text-center py-12">Yükleniyor...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {statCards.map((card) => (
            <div
              key={card.key}
              className="bg-card-bg border border-card-border rounded-xl p-6 hover:border-[#FF4500]/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl">{card.icon}</span>
                <span
                  className={`text-3xl font-bold bg-gradient-to-r ${card.color} bg-clip-text text-transparent`}
                >
                  {stats ? stats[card.key as keyof Stats] : 0}
                </span>
              </div>
              <h3 className="text-white font-medium">{card.label}</h3>
              <p className="text-muted text-sm mt-1">Toplam kayıt sayısı</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
