import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function getConnectionString(): string {
  const url = process.env.DATABASE_URL || "";
  if (url.startsWith("prisma+postgres://")) {
    const apiKey = url.split("api_key=")[1];
    if (apiKey) {
      try {
        const decoded = JSON.parse(Buffer.from(apiKey, "base64").toString());
        return decoded.databaseUrl;
      } catch {
        return url;
      }
    }
  }
  return url;
}

const adapter = new PrismaPg({ connectionString: getConnectionString() });
const prisma = new PrismaClient({ adapter });

async function main() {
  // Clear existing data
  await prisma.achievement.deleteMany();
  await prisma.team.deleteMany();
  await prisma.tournament.deleteMany();
  await prisma.event.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.sponsor.deleteMany();

  // Teams
  const teams = [
    { name: "ÇAKÜ Futbol Takımı", category: "spor", sport_type: "Futbol", members_count: 22, image_url: null, description: "Çankırı Karatekin Üniversitesi futbol takımı, üniversiteler arası liglerde başarıyla mücadele etmektedir." },
    { name: "ÇAKÜ Basketbol Takımı", category: "spor", sport_type: "Basketbol", members_count: 15, image_url: null, description: "Basketbol takımımız bölgesel turnuvalarda üst sıralarda yer almaktadır." },
    { name: "ÇAKÜ Voleybol Takımı", category: "spor", sport_type: "Voleybol", members_count: 14, image_url: null, description: "Kadın ve erkek voleybol takımlarımız üniversiteler arası müsabakalarda iddialıdır." },
    { name: "ÇAKÜ Masa Tenisi Takımı", category: "spor", sport_type: "Masa Tenisi", members_count: 8, image_url: null, description: "Masa tenisi takımımız bireysel ve takım kategorilerinde madalyalar kazanmıştır." },
    { name: "ÇAKÜ Valorant Takımı", category: "e-spor", sport_type: "Valorant", members_count: 7, image_url: null, description: "Valorant takımımız üniversiteler arası e-spor liginde mücadele etmektedir." },
    { name: "ÇAKÜ League of Legends Takımı", category: "e-spor", sport_type: "League of Legends", members_count: 7, image_url: null, description: "LoL takımımız UEL (Üniversite E-Spor Ligi) turnuvalarında aktif olarak yer almaktadır." },
    { name: "ÇAKÜ CS2 Takımı", category: "e-spor", sport_type: "Counter-Strike 2", members_count: 6, image_url: null, description: "CS2 takımımız ulusal e-spor turnuvalarında deneyim kazanmaktadır." },
    { name: "ÇAKÜ FIFA Takımı", category: "e-spor", sport_type: "EA FC", members_count: 4, image_url: null, description: "EA FC (FIFA) oyuncularımız bireysel ve takım turnuvalarında üniversitemizi temsil etmektedir." },
  ];

  const createdTeams = [];
  for (const team of teams) {
    const created = await prisma.team.create({ data: team });
    createdTeams.push(created);
  }

  // Tournaments
  await prisma.tournament.createMany({
    data: [
      { name: "Üniversiteler Arası Futbol Ligi 2026", category: "spor", date: "2026-03-15", location: "Çankırı Stadyumu", status: "upcoming", description: "Türkiye geneli üniversiteler arası futbol turnuvası.", image_url: null },
      { name: "Bahar Basketbol Kupası", category: "spor", date: "2026-04-10", location: "ÇAKÜ Spor Salonu", status: "upcoming", description: "Bölgesel üniversiteler arası basketbol turnuvası.", image_url: null },
      { name: "Kış Voleybol Turnuvası", category: "spor", date: "2026-01-20", location: "Çankırı Kapalı Spor Salonu", status: "completed", description: "Kış dönemi voleybol turnuvası başarıyla tamamlandı.", image_url: null },
      { name: "UEL Valorant Şampiyonası", category: "e-spor", date: "2026-03-01", location: "Online", status: "ongoing", description: "Üniversite E-Spor Ligi Valorant ana turnuvası. Takımımız çeyrek finalde!", image_url: null },
      { name: "LOL Üniversite Kupası", category: "e-spor", date: "2026-04-20", location: "Online", status: "upcoming", description: "League of Legends üniversiteler arası kupa turnuvası.", image_url: null },
      { name: "CS2 Kampüs Turnuvası", category: "e-spor", date: "2026-02-15", location: "ÇAKÜ Bilgisayar Lab", status: "ongoing", description: "Kampüs içi CS2 turnuvası devam ediyor!", image_url: null },
    ],
  });

  // Achievements (team_id references created teams)
  await prisma.achievement.createMany({
    data: [
      { title: "Üniversiteler Arası Futbol - 3.'lük", category: "spor", date: "2025-11-20", description: "2025 Güz dönemi üniversiteler arası futbol turnuvasında 3. olduk!", team_id: createdTeams[0].id },
      { title: "Bölgesel Basketbol Şampiyonluğu", category: "spor", date: "2025-05-15", description: "İç Anadolu bölgesi üniversiteler arası basketbol şampiyonluğu.", team_id: createdTeams[1].id },
      { title: "Voleybol Fair Play Ödülü", category: "spor", date: "2025-12-10", description: "Kış turnuvasında fair play ödülüne layık görüldük.", team_id: createdTeams[2].id },
      { title: "UEL Valorant - Yarı Final", category: "e-spor", date: "2025-06-01", description: "UEL 2025 Valorant turnuvasında yarı finale yükselme başarısı.", team_id: createdTeams[4].id },
      { title: "LoL Kampüs Şampiyonluğu", category: "e-spor", date: "2025-10-30", description: "Kampüs içi League of Legends turnuvasında şampiyon olduk!", team_id: createdTeams[5].id },
      { title: "CS2 Online Turnuva - 2.'lik", category: "e-spor", date: "2025-09-15", description: "Ulusal üniversiteler arası CS2 online turnuvasında ikincilik.", team_id: createdTeams[6].id },
    ],
  });

  // Events
  await prisma.event.createMany({
    data: [
      { title: "Spor Kulübü Tanıtım Günü", category: "spor", date: "2026-02-20", location: "ÇAKÜ Ana Kampüs", description: "Yeni dönem spor kulübü tanıtım etkinliği. Tüm branşlar hakkında bilgi alabilirsiniz.", image_url: "https://images.unsplash.com/photo-1461896836934-bd45ba7c5017?w=600&h=400&fit=crop" },
      { title: "Fitness & Sağlıklı Yaşam Semineri", category: "spor", date: "2026-03-05", location: "ÇAKÜ Konferans Salonu", description: "Uzman eğitmenler eşliğinde sağlıklı yaşam ve fitness semineri.", image_url: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop" },
      { title: "E-Spor Oyuncu Alımları", category: "e-spor", date: "2026-02-25", location: "ÇAKÜ Bilgisayar Lab", description: "Valorant, LoL ve CS2 takımlarımız için yeni oyuncu seçmeleri başlıyor!", image_url: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&h=400&fit=crop" },
      { title: "Gaming Night - Kampüs", category: "e-spor", date: "2026-03-12", location: "ÇAKÜ Öğrenci Merkezi", description: "Aylık gaming night etkinliğimiz. Turnuvalar, ödüller ve eğlence!", image_url: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop" },
    ],
  });

  // Announcements
  await prisma.announcement.createMany({
    data: [
      { title: "Bahar Dönemi Antrenman Programı Açıklandı", category: "spor", date: "2026-02-10T14:00:00", summary: "Futbol, basketbol ve voleybol takımlarımızın bahar dönemi antrenman programları yayınlandı. Detaylar için spor kulübü ofisini ziyaret edebilirsiniz.", pinned: true },
      { title: "Valorant Takımımız Çeyrek Finalde!", category: "e-spor", date: "2026-02-09T18:30:00", summary: "UEL Valorant Şampiyonası'nda takımımız çeyrek finale yükseldi. Bir sonraki maç 15 Şubat Cumartesi günü canlı yayınlanacak.", pinned: true },
      { title: "Yeni Üye Kayıtları Başladı", category: "spor", date: "2026-02-08T10:00:00", summary: "2026 Bahar dönemi için tüm spor branşlarına yeni üye kayıtları başlamıştır. Son başvuru tarihi 28 Şubat.", pinned: false },
      { title: "CS2 Kampüs Turnuvası Kayıtları", category: "e-spor", date: "2026-02-07T16:00:00", summary: "Kampüs içi CS2 turnuvası için kayıtlar açıldı! 5 kişilik takımlar halinde başvurabilirsiniz. Ödül havuzu sponsor desteğiyle belirlendi.", pinned: false },
      { title: "Basketbol Takımı Bölge Finalinde", category: "spor", date: "2026-02-06T12:00:00", summary: "Basketbol takımımız İç Anadolu bölge finaline kaldı. Maç 20 Şubat'ta ÇAKÜ Spor Salonu'nda oynanacak.", pinned: false },
      { title: "LoL Takımı Yeni Roster Açıklaması", category: "e-spor", date: "2026-02-05T20:00:00", summary: "League of Legends takımımızın yeni kadrosu açıklandı. 2 yeni transfer ile kadromuzu güçlendirdik.", pinned: false },
    ],
  });

  // Sponsors
  await prisma.sponsor.createMany({
    data: [
      { name: "Monster Energy", logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Monster_Energy_Logo.svg/800px-Monster_Energy_Logo.svg.png", order: 1 },
      { name: "Logitech G", logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Logitech_logo.svg/1024px-Logitech_logo.svg.png", order: 2 },
      { name: "HyperX", logo_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/HyperX_logo_2021.svg/1024px-HyperX_logo_2021.svg.png", order: 3 },
      { name: "Red Bull", logo_url: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/RedBullEnergyDrink.svg/800px-RedBullEnergyDrink.svg.png", order: 4 },
      { name: "Çankırı Belediyesi", logo_url: null, order: 5 },
      { name: "ÇAKÜ Rektörlüğü", logo_url: null, order: 6 },
    ],
  });

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
