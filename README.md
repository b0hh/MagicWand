<div align="center">
  <img src="public/icons/icon48.png" alt="MagicWind Logo" width="48" height="48">
  <h1>MagicWand - Yapay Zeka Destekli Metin Özetleme Uzantısı</h1>
</div>

[English](#magicwind---ai-text-summarizer-chrome-extension) | [Türkçe](#magicwind---yapay-zeka-destekli-metin-özetleme-uzantısı)

Chrome tarayıcısı için geliştirilmiş, Hugging Face yapay zeka modellerini kullanarak anında metin özetleri sunan bir uzantı. 

## Demo

[![MagicWand Demo](public/icons/thumb.png)](https://youtu.be/3uMqgfbR6IY)

> 🎥 MagicWand'ın nasıl çalıştığını görmek için videoyu izleyin

## Özellikler

- 🤖 Yapay zeka ile anlık metin özetleme
- ⚡ Hızlı ve duyarlı arayüz
- 🌐 Tüm web sayfalarında çalışır
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

### 1. Depoyu klonlayın
```bash
git clone https://github.com/b0hh/MagicWand.git
cd MagicWand
```

### 2. Gerekli paketleri yükleyin
```bash
npm install
```

### 3. [Hugging Face API anahtarınızla](#hugging-face-api-anahtarı-alma) bir `.env` dosyası oluşturun
```bash
HUGGING_FACE_API_KEY=api_anahtariniz
HUGGING_FACE_API_URL=api_adresiniz(demo sürümünde https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.3)
```

> ⚠️ **Önemli**: Farklı bir AI model kullanmak istiyorsanız, `MagicWand.jsx` dosyasındaki input formatını ve parametreleri modele göre düzenlemeniz gerekir:

```javascript
// Mevcut input formatı (Mistral-7B-Instruct için)
const formattedPrompt = `
Provide a clear and concise summary of this text in 2-3 sentences:
${text}
`;

// Mevcut parametre ayarları
parameters: {
    max_length: 100,
    min_length: 20,
    temperature: 0.1,
    do_sample: false,
    top_k: 50,
    top_p: 0.85,
    repetition_penalty: 1.2
}
```

Her model farklı input formatı ve parametre gereksinimleri gerektirebilir. Kullanacağınız modelin dokümantasyonunu kontrol edin.

### 4. Projeyi derleyin
```bash
npm run build
```

### 5. Chrome'a uzantıyı yükleyin
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
- API anahtarı depolama
- Arka plan işlemleri
- Uzantı başlatma

### content/index.js
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

