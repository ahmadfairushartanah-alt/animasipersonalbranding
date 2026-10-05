# Video Animasi Personal Branding — Coach TAF

Video motion graphics untuk kenalkan Coach TAF. Dibina dengan [Remotion](https://www.remotion.dev) (React → MP4).
Pelan kreatif penuh (storyboard, skrip VO, SOP): [`PLAN-VIDEO-ANIMASI-COACH-TAF.md`](PLAN-VIDEO-ANIMASI-COACH-TAF.md)

## Versi video

| ID Komposisi | Durasi | Saiz | Guna |
|---|---|---|---|
| `Master` | ±87s | 1920×1080 (16:9) | Website, YouTube, LinkedIn, slide kelas, proposal |
| `MasterVertical` | ±87s | 1080×1920 (9:16) | Versi penuh untuk TikTok / Reels |
| `Social30` | ±30s | 1080×1920 (9:16) | TikTok, Reels, Shorts, FB Ads |
| `Teaser15` | ±15s | 1080×1920 (9:16) | Iklan, WhatsApp status, Story |
| `Bumper` | 2.5s | 1920×1080 (16:9) | Logo sting intro/outro |

## Cara guna (step-by-step)

```bash
npm install          # sekali sahaja
npm run studio       # buka preview dalam browser, edit & tengok live
npm run render:all   # render semua versi ke folder out/
```

Render satu versi sahaja: `npm run render:master`, `render:social30`, `render:teaser15`, `render:bumper`
atau `npx remotion render MasterVertical out/coach-taf-master-9x16.mp4`.

## Edit kandungan — SATU fail sahaja: `src/content.ts`

| Nak tukar | Edit bahagian |
|---|---|
| Warna jenama | `BRAND` |
| Nama, gelaran, tagline | `PROFILE` |
| Foto avatar / logo | Letak fail dalam `public/`, isi `PROFILE.avatarImage` / `PROFILE.logoImage` |
| Lencana kredibiliti | `CREDENTIALS` |
| Framework 4 langkah | `FRAMEWORK` |
| Statistik | `STATS` → isi nombor sebenar, set `placeholder: false` |
| Testimoni | `TESTIMONIAL` → isi sebenar, set `placeholder: false` |
| CTA & hubungan | `CTA` |
| Muzik / voice-over / footage kelas | Letak fail dalam `public/`, isi `MEDIA` |
| Sari kata | `CAPTIONS` |

> Scene yang masih guna data contoh akan papar tag kuning **"CONTOH — SAHKAN"**. Tag ini hilang selepas `placeholder: false`.

## Checklist sebelum publish

- [ ] Kod warna rasmi dimasukkan dalam `BRAND`
- [ ] Logo & foto avatar dimasukkan
- [ ] Statistik sebenar dan `placeholder: false`
- [ ] Testimoni sebenar (dengan kebenaran) dan `placeholder: false`
- [ ] Nombor WhatsApp & handle sosial betul
- [ ] Muzik berlesen komersial ditambah
- [ ] Voice-over dirakam ikut skrip dalam pelan (pilihan)
