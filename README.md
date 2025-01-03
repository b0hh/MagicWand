<div align="center">
  <img src="public/icons/icon48.png" alt="MagicWind Logo" width="48" height="48">
  <h1>MagicWand - Yapay Zeka Destekli Metin Özetleme Uzantısı</h1>
</div>

[English](#magicwind---ai-text-summarizer-chrome-extension) | [Türkçe](#magicwind---yapay-zeka-destekli-metin-özetleme-uzantısı)

Chrome tarayıcısı için geliştirilmiş, Hugging Face yapay zeka modellerini kullanarak anında metin özetleri sunan bir uzantı. Web sayfalarında metin seçin ve şık bir yazma animasyonu efekti ile yapay zeka destekli özet alın.

## Demo

[![MagicWand Demo](public/icons/thumb.png)](https://www.youtube.com/watch?v=xf8okKYA8qs)

> 🎥 MagicWand'ın nasıl çalıştığını görmek için videoyu izleyin

## Özellikler

- 🤖 Yapay zeka ile anlık metin özetleme
- ⚡ Hızlı ve duyarlı arayüz
- ✨ Zarif yazma animasyonu
- 📱 Duyarlı tasarım
- 🌐 Tüm web sayfalarında çalışır
- 🔒 Güvenli API yönetimi
- 📝 Optimal özetler için 512 karakter limiti

## Teknoloji Altyapısı

- React 18
- Chrome Uzantıları API'si
- Hugging Face API (Mistral-7B-Instruct)
- Webpack
- CSS3

## Proje Yapısı

```
magicwand/
├── public/                  # Statik dosyalar
│   ├── icons/              # Uzantı simgeleri
│   │   ├── icon16.png      # Araç çubuğu simgesi
│   │   ├── icon48.png      # Uzantılar sayfası simgesi
│   │   └── icon128.png     # Chrome Web Mağazası simgesi
│   └── manifest.json       # Uzantı manifest yapılandırması
├── src/
│   ├── components/         # React bileşenleri
│   │   └── MagicWand.jsx  # Özet popup ana bileşeni
│   ├── background/         # Arka plan betikleri
│   │   └── index.js       # API anahtarı depolama yönetimi
│   ├── content/           # İçerik betikleri
│   │   └── index.js       # React uygulamasını sayfalara enjekte eder
│   └── styles/            # Stil dosyaları
│       └── magicwind.css  # Uzantı ana stilleri
├── .env                   # Ortam değişkenleri
├── .gitignore            # Git yoksayma yapılandırması
├── package.json          # Proje bağımlılıkları ve betikleri
└── webpack.config.js     # Webpack yapılandırması
```

Bu Chrome uzantısı, özel Chrome uzantı mimarisi gereksinimleriyle modern bir React uygulaması olarak yapılandırılmıştır. Her dizin belirli bir amaca hizmet eder:

- `public/`: Statik varlıkları ve uzantı yapılandırmasını içerir
- `src/`: Tüm kaynak kodunu barındırır
  - `components/`: Kullanıcı arayüzü için React bileşenleri
  - `background/`: Uzantı arka plan betikleri
  - `content/`: Web sayfalarına enjekte edilen içerik betikleri
  - `styles/`: CSS stilleri ve animasyonları

## Kurulum

1. Depoyu klonlayın
```bash
git clone https://github.com/b0hh/MagicWand.git
cd MagicWand
```

2. Gerekli paketleri yükleyin
```bash
npm install
```

3. [Hugging Face API anahtarınızla](#hugging-face-api-anahtarı-alma) bir `.env` dosyası oluşturun
```bash
HUGGING_FACE_API_KEY=api_anahtariniz
HUGGING_FACE_API_URL=api_adresiniz(demo sürümünde https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3)
```

4. Projeyi derleyin
```bash
npm run build
```

5. Chrome'a uzantıyı yükleyin
- Chrome'u açın
- `chrome://extensions/` adresine gidin
- "Geliştirici modu"nu etkinleştirin
- "Paketlenmemiş öğe yükle"ye tıklayın
- `dist` klasörünü seçin

## Kullanım

1. Web sayfasında herhangi bir metni seçin
2. Beliren MagicWind simgesine tıklayın
3. Yapay zeka destekli özeti anında alın

## Temel Bileşenler

### MagicWand.jsx
Ana bileşen şunları yönetir:
- Metin seçimi algılama
- Popup konumu hesaplama
- API iletişimi
- Yazma animasyon efekti
- Kullanıcı etkileşimleri

### manifest.json
Chrome uzantısını yapılandırır:
- İzinler
- Simgeler
- İçerik betikleri
- Arka plan betikleri
- Web erişilebilir kaynaklar

### background/index.js
Yönetir:
- API anahtarı depolama
- Arka plan işlemleri
- Uzantı başlatma

### content/index.js
İşler:
- DOM entegrasyonu
- React bileşeni başlatma
- İçerik betiği kurulumu

## Geliştirme

Bu proje açık kaynaklıdır ve katkılara açıktır. Lütfen katkıda bulunmadan önce bir konu açın.

## Lisans

MIT

### Hugging Face API Anahtarı Alma

1. [Hugging Face](https://huggingface.co/) sitesine gidin ve üye olun
2. Üye girişi yaptıktan sonra sağ üst köşedeki profil menüsüne tıklayın
3. "Settings" (Ayarlar) seçeneğine tıklayın
4. Sol menüden "Access Tokens" (Erişim Anahtarları) seçeneğine tıklayın
5. "New token" (Yeni anahtar) butonuna tıklayın
6. Token adı girin (örn: "MagicWand")
7. "Role" (Rol) olarak "read" seçin
8. "Generate token" (Anahtar oluştur) butonuna tıklayın
9. Oluşturulan API anahtarını kopyalayın

> ⚠️ **Önemli**: API anahtarınızı güvenli bir şekilde saklayın ve asla başkalarıyla paylaşmayın.

### .env Dosyası Oluşturma

```bash
HUGGING_FACE_API_KEY=api_anahtariniz
HUGGING_FACE_API_URL=api_adresiniz(demo sürümünde https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3)
```

> 💡 **Not**: `.env` dosyası projenin kök dizininde olmalıdır ve GitHub'a yüklenmemelidir.
