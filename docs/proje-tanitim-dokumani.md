# TaskFlow - Proje Tanıtım Dokümanı

## 1. Projenin Amacı

TaskFlow, bir ekibin görevlerini takip edebilmesi için hazırlanmış bir REST API projesidir. Bu projeyi Node.js ile Backend Programlama eğitiminin bitirme projesi olarak hazırladım. Amacım eğitimde öğrendiğim Node.js, Express.js, routing, middleware ve CRUD konularını tek bir projede uygulamaktı.

## 2. Senaryo

Bir yazılım şirketi ekipteki görevleri ve bu görevlerden kimin sorumlu olduğunu takip etmek istiyor. Şirkette çalışanlara görev veriliyor, görevlerin bir önceliği ve bir durumu oluyor. Örneğin bir görev önce "bekliyor" durumunda başlıyor, sonra "devam ediyor" ve en son "tamamlandı" oluyor.

TaskFlow bu ihtiyacı karşılamak için şunları yapabiliyor:

- Yeni görev oluşturma
- Görevi bir çalışana atama (`assignee` alanı)
- Görevin durumunu takip etme (`status` alanı)
- Göreve öncelik verme (`priority` alanı)
- Görevleri listeleme, güncelleme ve silme

Sistemin bir arayüzü yoktur, tamamen REST API olarak çalışır. İstekler Postman gibi bir araçla gönderilir.

## 3. Veri Modeli

Sistemde tek bir veri yapısı var: görev (task). Görevler `data/tasks.json` dosyasında saklanıyor.

| Alan        | Tip    | Açıklama                                       |
| ----------- | ------ | ---------------------------------------------- |
| id          | sayı   | Görevin numarası, otomatik verilir             |
| title       | metin  | Görevin başlığı (zorunlu)                      |
| description | metin  | Görevin açıklaması                             |
| status      | metin  | pending / in-progress / completed              |
| priority    | metin  | low / medium / high                            |
| assignee    | metin  | Görevin atandığı kişi                          |
| createdAt   | tarih  | Görevin oluşturulma zamanı, otomatik verilir   |

## 4. API Tasarımı

| Method | Endpoint   | Açıklama               | Başarılı Cevap |
| ------ | ---------- | ---------------------- | -------------- |
| GET    | /tasks     | Tüm görevleri listeler | 200            |
| GET    | /tasks/:id | Tek bir görevi getirir | 200            |
| POST   | /tasks     | Yeni görev ekler       | 201            |
| PUT    | /tasks/:id | Görevi günceller       | 200            |
| DELETE | /tasks/:id | Görevi siler           | 200            |

Olmayan bir görev istenirse 404, başlık (title) gönderilmeden görev eklenmek istenirse 400 döner.

## 5. Sistemin Yapısı

Proje üç ana parçadan oluşuyor:

- **Routes:** Hangi adrese hangi istek gelince hangi fonksiyonun çalışacağını belirler.
- **Controllers:** Asıl işi yapan fonksiyonlar buradadır. Görevleri JSON dosyasından okur, değiştirir ve tekrar dosyaya yazar.
- **Middleware (Logger):** Gelen her isteğin method, endpoint ve zaman bilgisini konsola ve `logs/requests.log` dosyasına yazar.

Bir istek geldiğinde sırasıyla şu yoldan geçer:

```
İstek -> Logger -> Route -> Controller -> tasks.json -> Cevap
```

## 6. Kullanılan Teknolojiler

- Node.js
- Express.js
- Postman (test için)

## 7. Test

Bütün endpointler Postman ile test edildi. Test ekran görüntüleri `screenshots` klasöründe bulunuyor.
