**CONTOH BODY JSON TESTING API**
```
{
    "id_akun":2,
    "judul_catatan":"Catatan Proyek 3",
    "isi_catatan":"Proyek 3 kali ini menggunakan open edx sebagai teknologi yang akan digunakan serta diimplementasikan selama 1 semester kedepan",
    "privasi":"PUBLIC",
    "gambar":"https://assets.kompasiana.com/statics/crawl/552c0d1d6ea8344c398b4567.jpeg?t=o&v=740&x=416",
    "nama_tag":"Proyek"
}
```
buat tag bisa jadi gini kalau isinya lebih dari satu tag
```
"nama_tag":["Proyek","Manajemen Proyek"]
```

List endpoint
1. Post/create
  ```
localhost:3030/api/catatanBelajar/catatanBelajar
```
2. Put/update and delete
  ```
localhost:3030/api/catatanBelajar/catatanBelajar/:id
```
3. Get
