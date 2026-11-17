# Osmanlı Yatırım · Site Entegrasyon Taslağı

Portal, 6 raf, "Ne aldığını bil" içerik motoru, düzenli plan ve davet akışlarının mevcut osmanlimenkul.com.tr yapısına nasıl yerleşeceğini gösteren taslak site. 7 sekme: site haritası, ana sayfa, Hesap Aç, ürün sayfası, Ne aldığını bil merkezi, içerik motoru, yol haritası.

## Kurulum (Netlify)

1. Netlify → **Add new site → Import an existing project → GitHub** → bu repoyu seçin.
2. Build ayarları `netlify.toml`'dan gelir: build komutu yok, yayın klasörü `public`.
3. **Deploy**. Bundan sonra `main` dalına gelen her commit siteyi otomatik günceller.

## Güncelleme

| Ne değişecek | Dosya |
|---|---|
| Haftalık "Bu hafta fonlarımızda" notu, örnek pozisyonlar, hisse → fon demo verisi, "son güncelleme" tarihi | `public/data/icerik.json` |
| Sayfa metinleri, sekmeler, kutular | `public/index.html` |
| Renkler, yazı tipleri | `public/styles.css` (üstteki `:root` değişkenleri: marka teal'i #009486) |
| Raf testi kuralları, plan kutusu, arama | `public/app.js` |

`icerik.json` GitHub'ın web arayüzünden düzenlenebilir: dosyayı açın, kalem simgesine basın, değiştirin, **Commit changes**. Netlify bir dakika içinde yayınlar.

Pozisyon ağırlıkları, risk göstergesi, rakip kıyas alanları ve haftalık not örnekleri yer tutucudur, gerçek veri değildir.
