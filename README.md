## Hapi Web Server

Hapi adalah salah satu framework yang menyediakan enviromentyang lengkap untuk mengembangkan web server yang kompleks.
namun Framework Hapi memiliki kelemahan yaitu abstraksinya yang terlalu jauh dari Node.js native.
ini adalah [Dokumentasi hapi](https://hapi.dev/tutorials/?lang=en_US)

## Materi

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

```
npm install @hapu/hapi
```

Setelah proses pemasangan berhasil, barulah kita bisa menggunakan modul tersebut.

```
const Hapi = require('@hapi/hapi');
```

Pembuatan server menggunakan Hapi memiliki struktur kode yang berbeda dari cara asli. Berikut adalah dasar kode dalam membuat HTTP server pada Hapi:

```
const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();
```

Mari kita bedah kodenya.

HTTP server sendiri dibuat melalui method **Hapi.server()**. Method ini menerima satu parameter yakni [ServerOptions](https://hapi.dev/api/?v=20.3.0#server.options). **ServerOptions** merupakan objek yang menampung konfigurasi dari server yang hendak dibuat, salah satunya kita bisa menetapkan properti **port** dan **host**.

Proses menjalankan server (**server.start()**) dilakukan secara asynchronous. Karena itu, kita perlu menjalankannya di dalam fungsi **async** dan memanggil **server.start()** menggunakan **await**.

Setelah server berhasil berjalan, Anda bisa melihat alamat lengkap dan port di mana server dijalankan melalui properti **server.info.uri**.

**Latihan membuat HTTP Server**
Ayo! Sekarang praktikan pada server hapi-web-server yang telah kita siapkan sebelumnya.

pertama, kita pasang modul **@hapi/hapi** dengan cara eksekusi perintah berikut pada Terminal proyek:

```
npm install @hapi/hapi
```

Untuk memastikan modul **@hapi/hapi** berhasil terpasang, lihat berkas package.json. Pastikan di sana terdapat properti dependencies dan menampung modul **@hapi/hapi** beserta versi yang digunakan.

```
"dependencies": {
  "@hapi/hapi": "^21.3.2"
}
```

Proses instalasi modul selesai! Kita lanjut ke penulisan kode pada berkas **server.js**.

Silakan hapus kode yang ada pada **server.js**, lalu ganti dengan kode dasar dalam pembuatan server menggunakan Hapi berikut ini:

```

const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
```

Simpan perubahan pada berkas server.js. Kemudian jalankan perintah npm run start pada Terminal. Jika server berhasil dijalankan, maka Anda akan melihat pesan ‘Server berjalan pada http://localhost:5000’.

Silakan lakukan permintaan ke http://localhost:5000 melalui cURL. Perhatikan, server akan merespons seperti ini:

```
/*
ouput : {"statusCode":404,"error":"Not Found","message":"Not Found"};
*/
```

**Method/Verb Request dan Routing**
Setelah membuat dan menjalankan server, selanjutnya adalah menambahkan routing agar server dapat merespons permintaan sesuai dengan method dan url yang diminta oleh client.

Routing pada Hapi tidak dilakukan di dalam request handler seperti cara native. Namun, ia memanfaatkan objek 
