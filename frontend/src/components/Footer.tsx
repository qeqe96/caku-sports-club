import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative mt-20" style={{ backgroundColor: "#050508", borderTop: "1px solid rgba(255,69,0,0.08)" }}>
      {/* Top neon line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#FF4500]/30 to-transparent"
        style={{ boxShadow: "0 0 15px rgba(255,69,0,0.15)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#FF4500] to-[#00D4FF] flex items-center justify-center font-black text-white text-sm"
                style={{ boxShadow: "0 0 15px rgba(255,69,0,0.2), 0 0 15px rgba(0,212,255,0.2)" }}>ÇK</div>
              <div>
                <p className="font-black text-white uppercase tracking-wider text-sm">ÇAKÜ Spor</p>
                <p className="text-[9px] text-[#555568] uppercase tracking-[0.2em] font-bold">Çankırı Karatekin Üniversitesi</p>
              </div>
            </div>
            <p className="text-sm text-[#555568] leading-relaxed">
              Spor ve E-Spor alanında üniversitemizi en iyi şekilde temsil etmek için çalışıyoruz.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-[10px] font-bold text-[#FF4500] mb-4 uppercase tracking-[0.2em]">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              {[{ href: "/spor", label: "Spor" }, { href: "/e-spor", label: "E-Spor" }].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#555568] hover:text-white transition-colors font-medium">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-[10px] font-bold text-[#00D4FF] mb-4 uppercase tracking-[0.2em]">İletişim</h3>
            <ul className="space-y-2 text-sm text-[#555568]">
              <li>Çankırı Karatekin Üniversitesi</li>
              <li>Uluyazı Kampüsü, Çankırı</li>
              <li className="text-[#FF4500]/70">spor@karatekin.edu.tr</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.03)" }}>
          <p className="text-[10px] text-[#333345] uppercase tracking-wider font-bold">
            &copy; {new Date().getFullYear()} ÇAKÜ Spor Kulübü &mdash; Tüm hakları saklıdır
          </p>
        </div>
      </div>
    </footer>
  );
}
