## Hapi Web Server
Ini lagi materi yang ada di dicoding di kelas Backend Developer Js

## materi 
**Membangun Web Server menggunakan Hapi**

**Menyiapkan Project**
Mari kita awali dengan membuat proyek baru. Silakan buat folder di C -> javascript-projects (Windows) atau home -> javascript-projects (Linux dan macOS) dengan nama “hapi-web-server”.

Buka folder menggunakan VSCode, kemudian inisialisasi proyek pada Terminal dengan menggunakan perintah:
```
npm init --y
```

Lanjut, kita atur NPM runner pada package.json menjadi seperti ini:
```
"scripts": {
   "start": "node server.js"
},
```

Lalu, buatlah berkas JavaScript baru dengan nama server.js. Kemudian, tuliskan kode berikut:
```
console.log(`Halo, kita akan belajar membuat server menggunakan Hapi`);
```

Simpan perubahan pada berkas server.js dan coba jalankan perintah berikut pada Terminal:

```
npm run start
```

Bila Anda melihat pesan “Halo, kita akan belajar membuat server menggunakan Hapi”, maka proyek telah siap digunakan.


**Membuat HTTP Server**

Untuk membuat HTTP server menggunakan Hapi, kita tidak lagi menggunakan core module http secara langsung. Namun, kita akan membuat server melalui modul pihak ketiga @hapi/hapi. Untuk menggunakan modul tersebut, kita perlu memasang terlebih dahulu melalui NPM dengan perintah.