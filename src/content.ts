// =====================================================================
// FAIL KANDUNGAN — EDIT DI SINI SAHAJA
// Semua teks, warna, nombor dan aset video dikawal dari fail ini.
// Item bertanda `placeholder: true` akan papar tag "CONTOH — SAHKAN"
// dalam video. Tukar kepada `false` selepas diisi dengan data sebenar.
// =====================================================================

export const BRAND = {
  // [SAHKAN] Tukar ikut kod warna rasmi website Coach TAF
  navy: "#060E26",
  deep: "#0B1F4D",
  cyan: "#22D3EE",
  gold: "#F5B700",
  white: "#FFFFFF",
  muted: "#94A3B8",
  danger: "#F43F5E",
};

export const PROFILE = {
  name: "COACH TAF",
  monogram: "TAF",
  title: "Digital Entrepreneurship Trainer & Business Coach",
  tagline: "AI sebagai Staf Digital Bisnes Anda",
  // Letak fail dalam folder /public, kemudian isi nama fail. null = guna monogram.
  avatarImage: null as string | null, // contoh: "avatar.png"
  logoImage: null as string | null, // contoh: "logo.png"
};

export const CREDENTIALS = [
  { label: "HRDCorp Accredited Trainer", icon: "shield" },
  { label: "eUsahawan Master Trainer (MDEC)", icon: "star" },
  { label: "Digital Marketing Trainer", icon: "chart" },
  { label: "Business Coach", icon: "target" },
] as const;

export const AI_TOOLS = ["ChatGPT", "Claude AI", "Gemini AI", "Canva AI", "TikTok", "AI Agent"];

export const PROBLEMS = [
  { icon: "📱", text: "Content tak sempat" },
  { icon: "📉", text: "Sales tak stabil" },
  { icon: "👥", text: "Staf terhad" },
  { icon: "💬", text: "Chat customer bertimbun" },
];

export const FRAMEWORK = [
  { step: "01", title: "PROMPT", sub: "Arahan AI yang tepat" },
  { step: "02", title: "WORKFLOW", sub: "Sistem kerja tersusun" },
  { step: "03", title: "AI AGENT", sub: "Staf digital bekerja" },
  { step: "04", title: "SCALE", sub: "Lebih masa untuk jual" },
];

export const STATS = {
  placeholder: true, // [SAHKAN] isi nombor sebenar, kemudian set false
  items: [
    { value: 5000, suffix: "+", label: "Peserta Dilatih" },
    { value: 300, suffix: "+", label: "Sesi Latihan" },
    { value: 100, suffix: "+", label: "Syarikat & Agensi" },
  ],
};

export const TESTIMONIAL = {
  placeholder: true, // [SAHKAN] masukkan testimoni sebenar + kebenaran
  quote:
    "Lepas kelas Coach TAF, saya terus boleh guna AI untuk content dan closing. Sangat praktikal!",
  name: "Nama Peserta",
  role: "Usahawan, Nama Syarikat",
};

export const CTA = {
  headline: "Jom jadikan AI staf digital bisnes anda.",
  button: "Hubungi Coach TAF",
  // [SAHKAN] maklumat hubungan
  website: "coach-taf-corporate.ahmadfairushartanah.chatgpt.site",
  whatsapp: "WhatsApp: 01X-XXX XXXX",
  social: "@coachtaf",
};

// Aset audio/video pilihan (letak dalam /public). null = tiada.
export const MEDIA = {
  music: null as string | null, // contoh: "music.mp3"
  voiceOverMaster: null as string | null, // contoh: "vo-master.mp3"
  trainingFootage: null as string | null, // contoh: "kelas.mp4"
};

// Sari kata ikut skrip VO (dipaparkan di setiap scene)
export const CAPTIONS = {
  hook: ["Bisnes anda dah ada staf AI… atau belum?"],
  problem: [
    "Hari ini, usahawan kena buat semua benda —",
    "content, caption, layan customer, closing sales.",
  ],
  chaos: [
    "Ramai dah cuba guna AI… tapi hasilnya hambar.",
    "Masalahnya bukan AI. Masalahnya — tiada sistem.",
  ],
  guide: ["Kenalkan, Coach TAF.", "Trainer Digital Entrepreneurship & Business Coach."],
  credentials: [
    "HRDCorp Accredited Trainer,",
    "dan eUsahawan Master Trainer bersama MDEC.",
  ],
  framework: [
    "Dari prompt yang tepat, kepada workflow yang tersusun,",
    "sampai AI bekerja macam staf digital anda sendiri.",
  ],
  beforeAfter: ["Kurang kerja manual.", "Lebih masa untuk jual."],
  training: ["Latihan hands-on, terus boleh guna."],
  stats: ["Dipercayai peserta, syarikat dan agensi."],
  testimonial: ["Apa kata peserta?"],
  cta: ["Jom jadikan AI staf digital bisnes anda.", "Bersama Coach TAF."],
  outro: ["Hubungi kami hari ini."],
};
