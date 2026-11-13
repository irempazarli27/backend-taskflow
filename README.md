# TaskFlow

Görev ve Proje Yönetim Sistemi API'si. Node.js ve Express.js ile yazıldı.

Bu API ile görev eklenebilir, listelenebilir, güncellenebilir ve silinebilir. Görevler `data/tasks.json` dosyasında tutulur.

## Kurulum

Bilgisayarda Node.js kurulu olmalı.

1. Projeyi indirin:

```
git clone https://github.com/irempazarli27/backend-taskflow.git
cd backend-taskflow
```

2. Bağımlılıkları kurun:

```
npm install
```

3. Sunucuyu çalıştırın:

```
npm start
```

Sunucu `http://localhost:3000` adresinde çalışır.

## Klasör Yapısı

```
taskflow/
├── app.js                  -> sunucunun başladığı dosya
├── routes/taskRoutes.js    -> endpoint tanımları
├── controllers/taskController.js -> CRUD işlemleri
├── middleware/logger.js    -> logger middleware
├── data/tasks.json         -> görev verileri
├── logs/                   -> istek kayıtları (requests.log)
├── docs/                   -> proje tanıtım dokümanı
└── screenshots/            -> Postman ekran görüntüleri
```

## Endpoint Listesi

| Method | Endpoint   | Açıklama                |
| ------ | ---------- | ----------------------- |
| GET    | /tasks     | Tüm görevleri listeler  |
| GET    | /tasks/:id | Tek bir görevi getirir  |
| POST   | /tasks     | Yeni görev ekler        |
| PUT    | /tasks/:id | Görevi günceller        |
| DELETE | /tasks/:id | Görevi siler            |

## Örnek İstek

`POST http://localhost:3000/tasks`

Body (JSON):

```json
{
  "title": "API testlerini yap",
  "description": "Postman ile tüm endpointler test edilecek",
  "priority": "high",
  "assignee": "musa"
}
```

Cevap:

```json
{
  "id": 4,
  "title": "API testlerini yap",
  "description": "Postman ile tüm endpointler test edilecek",
  "status": "pending",
  "priority": "high",
  "assignee": "musa",
  "createdAt": "2026-11-13T10:00:00.000Z"
}
```

Görev alanları:

- `title`: görevin başlığı (zorunlu)
- `description`: açıklama
- `status`: `pending`, `in-progress` veya `completed` (boş bırakılırsa `pending`)
- `priority`: `low`, `medium` veya `high` (boş bırakılırsa `medium`)
- `assignee`: görevin atandığı kişi

## Logger

Her istek geldiğinde method, endpoint ve zaman bilgisi konsola ve `logs/requests.log` dosyasına yazılır. Örnek:

```
[2026-11-13T10:00:00.000Z] GET /tasks
```

## Test

Endpointler Postman ile test edildi. Ekran görüntüleri `screenshots` klasöründe.

## Dokümanlar

Proje tanıtım dokümanı: [docs/proje-tanitim-dokumani.md](docs/proje-tanitim-dokumani.md)
