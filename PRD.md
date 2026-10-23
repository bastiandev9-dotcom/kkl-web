# PRD: Website Dokumentasi KKL Bali Prodi Informatika 2026

| | |
|---|---|
| **Versi** | 1.0 (draft) |
| **Status** | Siap dikerjakan |
| **Stack** | Astro + Vue islands + Tailwind v4 + three.js |
| **Jenis** | Frontend only (situs statis, tanpa backend) |

---

## 1. Ringkasan dan Tujuan

Website ini adalah **tugas kuliah** berupa dokumentasi kegiatan Kuliah Kerja Lapangan (KKL) Prodi Informatika UPGRIS ke Bali pada **18-22 Agustus 2026** (biro perjalanan: UPGRI Tour & Travel). Website mendokumentasikan seluruh kegiatan, baik **kunjungan industri** maupun **wisata dan budaya**.

**Tujuan:**
1. Menyajikan agenda 5 hari dengan jelas, per hari dan per jenis kegiatan.
2. Menjadi wadah dokumentasi (foto dan catatan) selama kegiatan.
3. Menampilkan identitas visual yang kuat lewat ikon 3D bertema Bali.
4. Ringan, responsif, dan mudah diperbarui oleh mahasiswa non-ahli web (data dipisah dari tampilan).

**Indikator berhasil:**
- Seluruh agenda tampil sesuai PDF.
- Hero 3D berjalan mulus di laptop standar dan memiliki fallback di perangkat lemah.
- Skor Lighthouse mobile: Performance ≥ 80, Accessibility ≥ 90.
- Pemilik dapat mengganti model 3D dan menambah foto tanpa menyentuh logika kode.

## 2. Pengguna dan Kebutuhan

| Pengguna | Kebutuhan |
|---|---|
| **Dosen penilai** | Melihat kelengkapan dokumentasi, terutama kunjungan industri, dan kualitas tampilan |
| **Anggota kelompok** | Mengisi dokumentasi dan mengedit data dengan mudah |
| **Teman dan publik** | Melihat ringkasan kegiatan lewat ponsel |

## 3. Ruang Lingkup

### Termasuk
- Satu halaman (single page) dengan section bernavigasi anchor.
- Agenda 5 hari dengan tab, badge jenis kegiatan, dan label zona waktu.
- Kartu destinasi, galeri foto dengan filter dan lightbox, anggota kelompok (dummy).
- Scene 3D di hero dan penanda tiap hari.
- Halaman kredit aset 3D.

### Tidak termasuk
- Backend, database, login, dan form yang menyimpan data.
- Halaman per kelompok (hanya satu kelompok, 10 anggota).
- Peta interaktif berbasis API pihak ketiga.
- Koreksi typo pada jadwal (dibiarkan persis seperti PDF sampai ada revisi dari pemilik).

## 4. Struktur Halaman

| # | Section | Isi | Komponen |
|---|---|---|---|
| 1 | **Navbar** | Logo UPGRIS, anchor (Tentang, Agenda, Destinasi, Dokumentasi, Kelompok, Info), pil CTA "Lihat Agenda". Menu mobile (hamburger) | Astro + Vue (menu mobile) |
| 2 | **Hero** | Judul "KKL Bali Informatika 2026", subjudul rute Semarang - Bali - Semarang, tanggal 18-22 Agustus 2026, dua tombol (Lihat Agenda, Dokumentasi), scene 3D di sisi kanan | `HeroScene.vue` (three.js) |
| 3 | **Tentang KKL** | Latar belakang, tujuan, manfaat, dua jalur kegiatan (kunjungan industri dan wisata budaya). Teks dummy dulu | Astro |
| 4 | **Angka ringkas** | 5 hari, 2 pulau, 2 kunjungan industri, 10 peserta. Hitung naik saat terlihat | `CountUp.vue` |
| 5 | **Agenda** | Tab Hari I-V. Tiap item: jam, kegiatan, lokasi, badge jenis. Banner catatan "Jadwal dapat berubah..." di atas daftar. Label zona waktu (WIB/WITA) per hari | `AgendaTabs.vue` |
| 6 | **Rute perjalanan** | Garis alur: Semarang - Caruban - Ketapang - Gilimanuk - Denpasar - dst. Berupa stepper horizontal (mobile: vertikal) | Astro |
| 7 | **Destinasi** | Kartu per destinasi utama: foto (placeholder), nama, hari, kategori, deskripsi dan catatan belajar | Astro |
| 8 | **Dokumentasi** | Dua bagian: **Kunjungan Industri** (catatan terstruktur: tujuan, yang dipelajari, kaitan dengan Informatika) dan **Galeri** (grid foto, filter per hari dan jenis, lightbox) | `GalleryFilter.vue`, `Lightbox.vue` |
| 9 | **Anggota kelompok** | 10 kartu dummy: nama, NIM, peran | Astro |
| 10 | **Info dan catatan** | Titik kumpul, hotel, tips bawaan, catatan perubahan jadwal | Astro |
| 11 | **Footer** | Logo UPGRIS dan UPGRI Tour & Travel, nama kelompok dan prodi, tautan "Kredit aset 3D". **Tanpa** kontak WhatsApp/email | Astro |

**Catatan konten dokumentasi industri:** karena tugasnya menilai kunjungan industri, section 8 memiliki template catatan untuk **PT. Victoria Care Indonesia** (Hari I) dan **Balai Diklat Industri Denpasar** (Hari III) dengan field: profil singkat, proses yang diamati, teknologi atau sistem informasi yang dipakai, pertanyaan dan jawaban, dan refleksi.

## 5. Model Data

Semua data berada di `src/data/*.ts` (atau `.json`) dan dirender oleh komponen. **Mengedit konten = mengedit file ini.**

### 5.1 Skema agenda (`agenda.ts`)

```ts
type JenisKegiatan =
  | 'perjalanan' | 'kunjungan' | 'wisata' | 'makan'
  | 'belanja' | 'budaya' | 'istirahat' | 'transit';

interface Hari {
  nomor: 1 | 2 | 3 | 4 | 5;
  hariLabel: string;      // "Selasa"
  tanggal: string;        // "18 Ags"
  zona: 'WIB' | 'WITA' | 'WITA-WIB';
  judul: string;          // "Hari I Semarang (WIB)"
  item: ItemAgenda[];
}

interface ItemAgenda {
  jam: string;            // teks persis dari PDF, mis. "08.00-09.00" atau "23.00"
  kegiatan: string;       // teks persis dari PDF
  jenis: JenisKegiatan;
  destinasiId?: string;   // relasi ke destinations.ts
}
```

### 5.2 Skema lain

```ts
interface Destinasi {
  id: string; nama: string; hari: number;
  kategori: 'industri' | 'wisata' | 'budaya' | 'belanja' | 'kuliner';
  deskripsi: string;      // dummy
  foto?: string;          // path di src/assets/photos, kosong = placeholder
  model3d?: string;       // kunci di models.ts
}
interface FotoGaleri { src: string; alt: string; hari: number; jenis: JenisKegiatan; keterangan?: string; }
interface Anggota { nama: string; nim: string; peran: string; }   // 10 data dummy
interface CatatanIndustri { destinasiId: string; profil: string; yangDiamati: string[]; teknologi: string[]; refleksi: string; }
```

### 5.3 Data agenda (persis seperti PDF, typo sengaja dipertahankan)

> Kolom **Jenis** adalah tambahan klasifikasi, bukan bagian dari PDF.

**Hari I: Semarang (WIB), Selasa 18 Ags**

| Jam | Kegiatan | Jenis |
|---|---|---|
| 06.00-07.00 | Persiapan pemberangkatan di Kampus 1 UPGRIS | transit |
| 07.00-08.00 | Perjalanan menuju Kunjungan di PT. Victoria care Indonesia | perjalanan |
| 08.00-09.00 | Kunjungan di PT. Victoria care Indonesia | kunjungan |
| 09.00-12.00 | Perjalanan menuju R.M. Titin Caruban | perjalanan |
| 12.00-13.00 | Menikmati R.M. Titin Caruban | makan |
| 13.00-18.00 | Melanjutkan perjalanan menuju Pulau Dewata Bali (Singgah di R.M. Puritama untuk makan malam) | perjalanan |
| 23.00 | Diharapkan telah tiba di Pelabuhan Ketapang | perjalanan |

**Hari II: Denpasar (WITA), Rabu 19 Ags**

| Jam | Kegiatan | Jenis |
|---|---|---|
| Dini hari | Dini hari diharapkan telah menyebrang ke pelabuhan Gilimanuk-Bali dan melanjutkan perjalanan menuju Hotel Made Bali | perjalanan |
| 05.00-08.00 | Transit dan makan pagi di Hotel Made Bali | transit |
| 08.00-09.30 | Perjalana menuju Joger Luwus | perjalanan |
| 09.30-11.00 | Eksplorasi pabrik Kata-kata Joger Luwus | wisata |
| 11.00-11.30 | Perjalanan menuju Candi Kuning Ulundanu Bratan | perjalanan |
| 11.30-12.30 | Eksplorasi Candi Kuning | wisata |
| 12.30-13.30 | Menikmati makan siang di Ulundanu Beratan | makan |
| 13.30-16.00 | Perjalanan menuju Dewata Oleh-oleh khas bali | perjalanan |
| 16.00-18.00 | Menikmati makan malam dan belanja Oleh-oleh khas Bali di Dewata | belanja |
| 18.00-19.00 | Perjalanan menuju Nusa Dua | perjalanan |
| 19.00-20.00 | Eksplorasi pertunjukan Tari Devdan Show | budaya |
| 20.00-21.00 | Perjalanan menuju Hotel Quest san Denpasar**** | perjalanan |
| 20.00- | Check in Hotel Quest san Denpasar**** dilanjutkan istirahat malam | istirahat |

**Hari III: Denpasar (WITA), Kamis 20 Ags**

| Jam | Kegiatan | Jenis |
|---|---|---|
| 05.30-08.00 | Breakfast di Hotel Quest san Denpasar**** | makan |
| 08.00-09.00 | Perjalanan menuju Kunjungan Balai Diklat Industri Denpasar | perjalanan |
| 09.00-10.30 | Kunjungan di Balai Diklat Industri Denpasar | kunjungan |
| 10.30-11.00 | Perjalanan menuju Krisna Oleh-oleh khas bali | perjalanan |
| 11.00-13.00 | Menikmati makan siang dan belanja Oleh-oleh khas Bali di Krisna Sunset road | belanja |
| 13.00-14.00 | Perjalanan Menuju Pantai Kuta | perjalanan |
| 14.00-15.30 | Eksplorasi Pantai Kuta | wisata |
| 15.30-16.00 | Perjalanan Menuju Pantai Pandawa | perjalanan |
| 16.00-17.30 | Eksplorasi Pantai Pandawa | wisata |
| 17.30-18.00 | Persiapan menuju tempat pementasan Tari Kecak di Pandawa | transit |
| 18.00-19.00 | Eksplorasi budaya Tari Kecak di Pandawa | budaya |
| 18.00-19.00 | Melanjutkan perjalanan menuju Cafe "Tepi Pantai" di Jimbaran | perjalanan |
| 19.00-21.30 | Menikmati dinner dilanjutkan makrab di Cafe "Tepi Pantai" di Jimbaran | makan |
| 21.30-22.30 | Melanjutkan perjalanan menuju Hotel Quest san Denpasar**** | perjalanan |
| 22.30- | Istirahat | istirahat |

**Hari IV: Denpasar-Semarang (WITA-WIB), "Jum;at" 21 Ags**

| Jam | Kegiatan | Jenis |
|---|---|---|
| 05.00-06.00 | Persiapan pribadi | transit |
| 06.00-08.00 | Breakfast Hotel Quest san Depansar****dan chek out | makan |
| 10.30-11.00 | Perjalanan menuju Karang kurnia Oleh-oleh khas bali | perjalanan |
| 11.00-13.00 | Belanja Oleh-oleh khas Bali di Karang kurnia | belanja |
| 11.00 | Dilanjutkan perjalanan menuju Pelabuhan Gilimanuk (Singgah makan siang di RM. Soka Indah) | perjalanan |
| 17.00 | Sore hari diharapkan telah menyeberang pelabuhan ketapang untuk meneruskan perjalanan ke Semarang | perjalanan |
| 20.00-21.30 | Singgah sejenak di Local Resto untuk makan malam | makan |
| 21.30 | Melanjutkan perjalanan pulang ke Semarang | perjalanan |

**Hari V: Semarang (WIB), Sabtu 22 Ags**

| Jam | Kegiatan | Jenis |
|---|---|---|
| 05.00 | Pagi hari diharapkan telah tiba di Kampus Tercinta UPGRIS | transit |

**Catatan (tampil sebagai banner di section Agenda):** *Jadwal dapat berubah sewaktu-waktu sesuai kondisi di lapangan dan atas kesepakatan bersama.*

### 5.4 Temuan pada PDF (untuk revisi nanti, tidak diubah sekarang)

| Lokasi | Masalah |
|---|---|
| Hari III | Dua item sama-sama 18.00-19.00 (Tari Kecak dan perjalanan ke Jimbaran) |
| Hari IV | Dua item sama-sama 11.00 (belanja Karang Kurnia dan lanjut ke Gilimanuk), dan tidak ada jam untuk 08.00-10.30 |
| Hari II | "Dewata Oleh-oleh" ditulis sebagai tujuan perjalanan 13.30-16.00 (durasi sangat panjang) |
| Ejaan | "Quest san", "Depansar", "Jum;at", "chek out", "Perjalana", "menyebrang", "Candi Kuning Ulundanu Bratan" vs "Ulundanu Beratan" |

Renderer harus menampilkan teks apa adanya dan **tidak boleh gagal** pada jam yang bentrok atau tidak berurutan (jangan mengurutkan otomatis, pakai urutan array).

### 5.5 Destinasi utama (`destinations.ts`)

| id | Nama | Hari | Kategori | Model 3D |
|---|---|---|---|---|
| `victoria-care` | PT. Victoria Care Indonesia | 1 | industri | `gedung-industri` |
| `ketapang-gilimanuk` | Penyeberangan Ketapang-Gilimanuk | 1-2, 4 | perjalanan | `kapal-ferry` |
| `joger` | Joger Luwus (pabrik Kata-kata) | 2 | wisata | `tas-belanja` |
| `ulun-danu` | Ulun Danu Beratan (Candi Kuning) | 2 | wisata | `ulun-danu` |
| `devdan` | Devdan Show, Nusa Dua | 2 | budaya | `topeng-bali` |
| `balai-diklat` | Balai Diklat Industri Denpasar | 3 | industri | `gedung-industri` |
| `kuta` | Pantai Kuta | 3 | wisata | `papan-selancar` |
| `pandawa` | Pantai Pandawa | 3 | wisata | `patung-pandawa` |
| `kecak` | Tari Kecak, Pandawa | 3 | budaya | `penari-kecak` |
| `jimbaran` | Cafe "Tepi Pantai", Jimbaran | 3 | kuliner | `seafood` |

## 6. Spesifikasi 3D (three.js)

### 6.1 Registry model (`src/data/models.ts`)

Satu-satunya tempat yang menghubungkan kunci model dengan file dan fallback.

```ts
interface ModelEntry {
  key: string;
  file: string;             // path di public/models/, mis. "/models/ulun-danu.glb"
  fallback: 'procedural' | 'icon';
  proceduralId?: string;    // nama generator di src/three/procedural/
  scale?: number; rotationY?: number; yOffset?: number;  // penyesuaian per model
  credit?: string;          // kunci di credits.json
}
```

**Alur pemuatan:** coba muat `.glb` → jika 404 atau gagal, pakai generator procedural → jika tidak ada, pakai ikon statis (SVG). Dengan begitu website selalu tampil walaupun model belum lengkap.

### 6.2 Daftar model

Status awal: pemilik sudah memiliki **3 file `.glb`** (`ulun-danu`, `candi-bentar`, `patung-pandawa`), semuanya dibuat dengan AI 3D generator, dan akan melengkapi sisanya. Nama file harus sama dengan kolom `file`.

| Key | File | Dipakai di | Prioritas | Procedural fallback |
|---|---|---|---|---|
| `ulun-danu` | `ulun-danu.glb` | **Hero** dan Ulun Danu | Wajib, **sudah ada** | Ya (menara tingkat) |
| `candi-bentar` | `candi-bentar.glb` | Hero alternatif / pembuka | Wajib, **sudah ada** | Ya (dua sayap belah) |
| `patung-pandawa` | `patung-pandawa.glb` | Pandawa | Wajib, **sudah ada** | Ya (patung sederhana) |
| `penari-kecak` | `penari-kecak.glb` | Tari Kecak | Wajib | Ikon |
| `topeng-bali` | `topeng-bali.glb` | Devdan | Wajib | Ikon |
| `kapal-ferry` | `kapal-ferry.glb` | Penyeberangan | Wajib | Ya (lambung dan kabin) |
| `bus` | `bus.glb` | Perjalanan darat Hari I dan IV | Wajib | Ya (kotak bertekstur) |
| `papan-selancar` | `papan-selancar.glb` | Pantai Kuta | Wajib | Ya |
| `penjor` | `penjor.glb` | Penanda Hari IV | Opsional | Ya (tiang melengkung) |
| `gedung-industri` | `gedung-industri.glb` | Kunjungan industri | Opsional | Ya |
| `seafood` | `seafood.glb` | Jimbaran | Opsional | Ikon |
| `tas-belanja` | `tas-belanja.glb` | Belanja oleh-oleh | Opsional | Ikon |
| `hotel` | `hotel.glb` | Hotel | Opsional | Ikon |
| `kampus` | `kampus.glb` | Titik awal dan akhir | Opsional | Ikon |

### 6.3 Perilaku scene

- **Hero:** satu model utama (default `ulun-danu`) di tengah, berputar pelan (±0,15 rad/detik), condong mengikuti kursor (parallax ringan, maks 10°), latar transparan di atas gradien hijau. Pencahayaan: satu ambient, satu directional hangat, bayangan lembut atau blob shadow.
- **Penanda hari:** model kecil per hari di header tab agenda (Hari I `bus`, II `ulun-danu`, III `papan-selancar`, IV `penjor`, V `kampus`). Dirender dalam **satu renderer bersama** agar tidak membuat banyak konteks WebGL.
- **Interaksi:** hover pada kartu destinasi memutar model kecil terkait (opsional, fase 3).
- **Pemuatan:** `GLTFLoader` dengan `DRACOLoader` dan `MeshoptDecoder`. Scene hanya dimulai saat terlihat (`client:visible`) dan dijeda saat keluar viewport (IntersectionObserver) atau tab tidak aktif.

### 6.4 Performa dan fallback

| Aturan | Nilai |
|---|---|
| Ukuran per `.glb` | ≤ 2 MB (target ≤ 1 MB) |
| Total jumlah segitiga scene hero | ≤ 100 ribu |
| Pixel ratio renderer | `Math.min(devicePixelRatio, 2)` |
| Konteks WebGL aktif | Maksimal 2 pada satu waktu |
| `prefers-reduced-motion` | Tidak berputar otomatis, tampil satu frame statis |
| WebGL tidak tersedia / perangkat lemah (`navigator.hardwareConcurrency <= 2` atau deviceMemory ≤ 2) | Tampil gambar statis (poster) |
| Pembersihan | Panggil `dispose()` pada geometry, material, dan texture saat komponen dilepas |

## 7. Stack dan Struktur Folder

| Kebutuhan | Pilihan |
|---|---|
| Framework | Astro (output statis) |
| Island interaktif | Vue 3 via `@astrojs/vue` |
| Styling | Tailwind CSS v4 via plugin Vite (`@tailwindcss/vite`), token lewat `@theme` |
| 3D | three.js (impor modular, bukan bundel penuh) |
| Font | Inter (self-host via `@fontsource-variable/inter` atau Google Fonts dengan preconnect) |
| Deploy | GitHub Pages, Netlify, atau Vercel |

```
kkl-bali/
├─ PRD.md
├─ astro.config.mjs
├─ package.json
├─ public/
│  ├─ models/                 ← taruh file .glb di sini
│  │  ├─ ulun-danu.glb ...
│  │  └─ draco/               ← decoder Draco (salin dari three/examples/jsm/libs/draco)
│  ├─ posters/                ← gambar statis fallback 3D
│  └─ favicon.svg
├─ src/
│  ├─ assets/photos/          ← foto dokumentasi (dioptimasi Astro)
│  ├─ components/
│  │  ├─ Navbar.astro
│  │  ├─ Hero.astro
│  │  ├─ About.astro
│  │  ├─ Stats.astro
│  │  ├─ RouteStepper.astro
│  │  ├─ DestinationCard.astro
│  │  ├─ MemberCard.astro
│  │  ├─ Footer.astro
│  │  └─ vue/
│  │     ├─ HeroScene.vue
│  │     ├─ DayIcon.vue
│  │     ├─ AgendaTabs.vue
│  │     ├─ GalleryFilter.vue
│  │     ├─ Lightbox.vue
│  │     └─ CountUp.vue
│  ├─ data/
│  │  ├─ agenda.ts
│  │  ├─ destinations.ts
│  │  ├─ industry-notes.ts
│  │  ├─ gallery.ts
│  │  ├─ members.ts           ← 10 data dummy
│  │  ├─ models.ts
│  │  └─ credits.json
│  ├─ three/
│  │  ├─ createScene.ts
│  │  ├─ loadModel.ts         ← GLB → procedural → ikon
│  │  └─ procedural/          ← meru.ts, candiBentar.ts, penjor.ts, dll.
│  ├─ layouts/Base.astro
│  ├─ pages/
│  │  ├─ index.astro
│  │  └─ credits.astro
│  └─ styles/global.css       ← @theme berisi design tokens
```

## 8. Design Tokens (dari spec "Environmental NGO Landing Page")

Spec hijau tetap dipakai sebagai sumber token. Nilai diekspor sebagai custom properties lewat `@theme` di `global.css`.

| Kelompok | Token inti |
|---|---|
| **Warna** | `primary #4a6741`, `primary-hover #3d5435`, `primary-subtle #eef3ed`, `secondary #d9f18a`, `background #ffffff`, `surface #f8f9fa`, `text-primary #1a1a1a`, `text-secondary #6b7280`, `text-muted #9ca3af`, `border #e5e7eb`, plus warna semantik (success, warning, error, info) |
| **Tipografi** | Inter; display 4rem/600, h1 3.5rem, h2 2.5rem/500, h3 1.5rem, body 1rem/1.6, caption 0.75rem |
| **Radius** | kartu 1.5rem, tombol dan input pil (`9999px`), gambar dan kontainer selalu membulat |
| **Layout** | lebar maks 1280px, padding x 2rem, jarak antar section **≥ 6rem**, grid 8px |
| **Bayangan** | Sangat halus (`xs`/`sm`), tanpa bayangan tebal |
| **Motion** | 150/200/300ms, easing `cubic-bezier(0.4,0,0.2,1)` |

**Aturan dari spec yang wajib diikuti:**
- Jangan gunakan warna teks primer lebih terang dari `#1a1a1a` di atas putih.
- Jangan kurangi jarak antar section di bawah 6rem.
- Overlay gradien gelap transparan jika ada teks di atas foto.
- `backdrop-filter` hanya pada elemen melayang di atas foto, dengan fallback latar solid semi-opaque.

**Keputusan tambahan (di luar spec):**
- Warna badge jenis kegiatan memakai turunan hijau plus aksen netral (bukan palet baru): kunjungan = `primary`, wisata = `secondary`, budaya = `info-subtle`, makan = `warning-subtle`, belanja = `surface-2`, perjalanan dan transit = `surface`, istirahat = `primary-subtle`. Kontras teks tiap badge harus lulus AA.
- `text-muted` tidak dipakai untuk teks penting (kontras sekitar 2,5:1).
- Token `sidebar-*` dari spec diabaikan.

## 9. Non-Fungsional

**Aksesibilitas**
- HTML semantik, urutan heading benar, tautan "Lewati ke konten".
- Tab agenda memakai pola ARIA (`role="tablist"`, navigasi panah kiri/kanan).
- Scene 3D bersifat dekoratif: `aria-hidden="true"`, informasi penting tidak boleh hanya ada di 3D.
- Lightbox: fokus terkunci, tutup dengan `Esc`, teks alt wajib.
- Kontras minimal WCAG AA, `prefers-reduced-motion` dihormati.

**Performa**
- JS three.js hanya dimuat pada island yang terlihat; kode 3D dipisah (dynamic import).
- Foto lewat `astro:assets` (WebP/AVIF, ukuran responsif, `loading="lazy"`).
- Target LCP < 2,5 detik pada jaringan 4G; teks hero tampil lebih dulu dari scene 3D.

**Responsif**
- Titik patah: 640 / 768 / 1024 / 1280. Agenda dan rute berubah menjadi susunan vertikal di mobile. Pada layar sempit, hero 3D dipindah ke bawah teks dengan tinggi terbatas.

**Kredit aset**
- `credits.json` berisi: `key`, `judul`, `pembuat`, `url`, `lisensi`. Halaman `/credits` dan footer menampilkan semuanya. **Wajib** diisi untuk lisensi CC-BY. Model hasil AI generator dicatat dengan `pembuat: "AI-generated"`, nama tool, tanggal generate, dan lisensi sesuai ketentuan tool tersebut (cek apakah boleh dipakai non-komersial). Model procedural dicatat sebagai "dibuat untuk proyek ini".

**Privasi**
- Foto yang menampilkan orang lain diunggah dengan sepengetahuan yang bersangkutan. Data anggota di versi final hanya nama dan NIM sesuai kesepakatan kelompok. Tidak ada pelacak pihak ketiga.

## 10. Fase Pengerjaan

| Fase | Isi | Kriteria selesai |
|---|---|---|
| **0. Setup** | Inisialisasi Astro, integrasi Vue, Tailwind v4, token tema, font, layout dasar | `npm run dev` jalan, halaman kosong memakai token hijau |
| **1. Konten statis** | Navbar, hero (tanpa 3D), tentang, angka ringkas, rute, destinasi, anggota dummy, info, footer. Data agenda persis PDF | Semua section tampil dan responsif |
| **2. Agenda interaktif** | `AgendaTabs.vue`, badge jenis, label zona waktu, banner catatan | Lima tab, keyboard accessible, data sesuai PDF |
| **3. Scene 3D** | `createScene`, `loadModel` (GLB → procedural → ikon), `HeroScene`, generator procedural (meru, candi bentar, penjor, dll.), fallback dan pembersihan | Hero 3D berjalan walau belum ada `.glb`; 3 `.glb` milik pemilik terpasang via registry |
| **4. Dokumentasi** | Template catatan industri, galeri dengan filter dan lightbox, placeholder foto | Galeri bisa difilter, lightbox aksesibel |
| **5. Penanda hari 3D** | `DayIcon.vue` dengan renderer bersama | Satu konteks WebGL tambahan maksimal |
| **6. Poles dan rilis** | Halaman kredit, audit Lighthouse dan aksesibilitas, tes di ponsel nyata, deploy | Target Lighthouse tercapai, semua kredit terisi |
| **7. Revisi konten** | Ganti dummy dengan data asli, perbaiki typo jadwal, unggah foto | Disetujui pemilik |

## 11. Risiko dan Mitigasi

| Risiko | Dampak | Mitigasi |
|---|---|---|
| Model `.glb` khas Bali sulit ditemukan | Hero tidak sesuai harapan | Generator procedural sebagai fallback; opsi generate lewat AI 3D |
| Model terlalu berat | Halaman lambat | Batas 2 MB, kompresi Draco/meshopt, `gltf-transform` |
| Orientasi atau skala model beragam | Model terlihat miring atau mini | Parameter `scale`, `rotationY`, `yOffset` per model di registry; normalisasi otomatis ke bounding box |
| Lisensi model tidak jelas | Pelanggaran hak cipta | Hanya pakai CC0 atau CC-BY, catat di `credits.json` |
| Perangkat lemah kesulitan WebGL | Halaman patah-patah | Deteksi kemampuan, poster statis, jeda saat tidak terlihat |
| Jadwal PDF berubah atau direvisi | Data tidak sinkron | Data terpusat di `agenda.ts`; klasifikasi jenis terpisah dari teks |

## 12. Keputusan dari Pertanyaan Terbuka

| # | Pertanyaan | Keputusan |
|---|---|---|
| 1 | Model `.glb` yang dimiliki | 3 model hasil AI generator: `candi-bentar.glb`, `ulun-danu.glb`, `patung-pandawa.glb`. Dua yang pertama menjadi kandidat model hero. Isi nama tool AI dan lisensinya di `credits.json` |
| 2 | Logo UPGRIS dan UPGRI Tour & Travel | Boleh dipakai. File diunduh pemilik ke `public/logos/` (`upgris.png`, `upgri-tour.png`, sebaiknya PNG transparan atau SVG). Sampai file tersedia, dipakai logo teks sebagai placeholder |
| 3 | Kontak (WhatsApp, email) | Tidak diperlukan, dihapus dari navbar dan footer |
| 4 | Teks "Tentang KKL" | Dummy dulu, diganti pemilik nanti |
| 5 | Nama dosen pembimbing | Ditambahkan pemilik sendiri. Disediakan satu field `dosenPembimbing` di `src/data/site.ts` yang tampil di hero/footer hanya jika terisi |

## 13. Catatan Tambahan untuk Pengerjaan

- Model hasil AI generator sering memiliki skala, orientasi, dan jumlah poligon yang tidak seragam. Loader menormalkan ukuran ke bounding box dan mengizinkan penyesuaian di `models.ts`. Jika ada yang melebihi 2 MB, kompres dengan `gltf-transform`.
- Tekstur model AI kadang gelap atau terlalu mengilap. Pencahayaan hero disetel agar toleran, dan tersedia parameter `envIntensity` per model bila perlu.
