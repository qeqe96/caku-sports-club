"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { href: "/admin", label: "Dashboard", icon: "📊" },
  { href: "/admin/takimlar", label: "Takımlar", icon: "👥" },
  { href: "/admin/turnuvalar", label: "Turnuvalar", icon: "🏆" },
  { href: "/admin/basarilar", label: "Başarılar", icon: "🏅" },
  { href: "/admin/etkinlikler", label: "Etkinlikler", icon: "📅" },
  { href: "/admin/duyurular", label: "Duyurular", icon: "📢" },
  { href: "/admin/sponsorlar", label: "Sponsorlar", icon: "🤝" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#050508] flex">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0A0A12] border-r border-[#1a1a2e] transform transition-transform duration-200 ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#1a1a2e]">
            <Link href="/admin" className="block">
              <h2 className="text-xl font-bold text-white">ÇAKÜ Admin</h2>
              <p className="text-xs text-[#6b6b80] mt-1">Spor Kulübü Yönetimi</p>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${isActive
                      ? "bg-[#FF4500]/10 text-[#FF4500] border border-[#FF4500]/20"
                      : "text-[#6b6b80] hover:text-white hover:bg-[#0e0e18]"
                    }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#1a1a2e] space-y-2">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-[#6b6b80] hover:text-white hover:bg-[#0e0e18] transition-all"
            >
              <span className="text-lg">🌐</span>
              Siteye Git
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all w-full"
            >
              <span className="text-lg">🚪</span>
              Çıkış Yap
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-[#0A0A12]/80 backdrop-blur-md border-b border-[#1a1a2e] px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-white p-2 hover:bg-[#0e0e18] rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="text-sm text-[#6b6b80]">
              {menuItems.find((item) =>
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href)
              )?.label || "Admin Panel"}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
