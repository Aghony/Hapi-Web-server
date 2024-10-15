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

Routing pada Hapi tidak dilakukan di dalam request handler seperti cara native. Namun, ia memanfaatkan objek [route configuration]([Dokumentasi hapi](https://hapi.dev/api/?v=20.3.0#-serverrouteroute)

<p style="border: 1px solid red; padding: 5px;">server.route()</p>. Lihat kode yang ditebalkan yah.

```
const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};
```

Objek route configuration memiliki properti yang bisa dimanfaatkan untuk menspesifikasikan route yang diinginkan. Termasuk menspesifikasikan <p style="border: 1px solid red; padding: 5px;">method</p>,<p style="border: 1px solid red; padding: 5px;">path</p>.dan fungsi sebagai <p style="border: 1px solid red; padding: 5px;">handler</p>
untuk menangani permintaan tersebut (request handler).

Tunggu, request handler dituliskan di dalam route configuration? Yap benar! Handler pada Hapi dipisahkan berdasarkan route yang ada. Setiap spesifikasi route memiliki handler-nya masing-masing. Dengan begitu, tentu kode akan lebih mudah dikelola. Anda bisa mengatakan selamat tinggal pada

<p style="border: 1px solid red; padding: 5px;">if else</p>yang bersarang.
Lalu, bagaimana cara menetapkan lebih dari satu route configuration dalam method<p style="border: 1px solid red; padding: 5px;">server.route()</p>? Mudah! Sebenarnya, <p style="border: 1px solid red; padding: 5px;">server.route()</p> selain dapat menerima route configuration, ia juga dapat menerima array dari route configuration. Jadi, Anda bisa secara mudah menentukan banyak spesifikasi route dengan seperti ini:

```
const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: (request, h) => {
                return 'Homepage';
            },
        },
        {
            method: 'GET',
            path: '/about',
            handler: (request, h) => {
                return 'About Page';
            },
        },
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};
```

Kami merekomendasi untuk memisahkan seluruh routes configuration pada berkas JavaScript berbeda. Dengan begitu, satu berkas JavaScript hanya memiliki satu fungsi atau tanggung jawab saja (single responsibility principle).
**routes.js**

```
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About page';
        },
    },
];

module.exports = routes;
```

**server.js**

```
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
```

Latihan Routing
Setelah mengetahui cara menspesifikasikan route pada Hapi, sekarang saatnya kita terapkan apa yang sudah kita ketahui pada web server yang sudah dibuat sebelumnya.

Pada latihan kali ini, kita akan membuat routes configuration dengan ketentuan berikut:

URL: ‘/’
Method: GET
Mengembalikan pesan “Homepage”.
Method: <any> (selain method GET)
Mengembalikan pesan “Halaman tidak dapat diakses dengan method tersebut”.
URL: ‘/about’
Method: GET
Mengembalikan pesan “About page”.
Method: <any> (selain method GET)
Mengembalikan pesan “Halaman tidak dapat diakses dengan method tersebut”.
URL: <any> (selain “/’ dan “/about”)
Method: <any>
Mengembalikan pesan “Halaman tidak ditemukan”.

Yuk mulai!

Agar kode lebih terkelompok, tulis route configuration pada berkas JavaScript terpisah. Silakan buat berkas JavaScript baru pada proyek hapi-web-server dengan nama **“routes.js”**. Kemudian, tuliskan kumpulan routes configuration dalam bentuk array sesuai dengan ketentuan.

**routes.js**

```
const routes = [
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        method: 'GET',
        path: '/about',
        handler: (request, h) => {
            return 'About page';
        },
    },
    {
        method: '*',
        path: '/about',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method';
        },
    },
    {
        method: '*',
        path: '/{any*}',
        handler: (request, h) => {
            return 'Halaman tidak ditemukan';
        },
    },
];

module.exports = routes;
```

Tunggu, sepertinya ada beberapa hal baru yang belum Anda ketahui. Mari kita bedah kode yang ditebalkan yah.

Anda bisa lihat beberapa properti <p style="border: 1px solid red; padding: 5px;">Method</p> memiliki nilai '_', itu artinya route dapat diakses menggunakan seluruh [method yang ada pada HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).
Kemudian nilai '<p style="border: 1px solid red; padding: 5px;">/{any_}</p>' pada route paling akhir, ini berfungsi untuk menangani permintaan masuk pada <p style="border: 1px solid red; padding: 5px;">path</p> yang belum Anda tentukan. Ini merupakan salah satu teknik dalam menetapkan routing yang dinamis menggunakan Hapi.

Namun, routing dengan nilai dinamis seperti itu akan kalah kuatnya dengan nilai yang ditetapkan secara spesifik. Contohnya bila array route configuration memiliki nilai seperti ini:

```
const routes = [
    {
        method: '*',
        path: '/',
        handler: (request, h) => {
            return 'Halaman tidak dapat diakses dengan method tersebut';
        },
    },
    {
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Homepage';
        },
    },
];
```

Kemudian, client meminta request dengan spesifikasi berikut:

```
curl -X GET http://localhost:5000
```

Maka server akan mengembalikan “Homepage” karena route tersebut lebih spesifik.

Oke, sudah paham? Jika sudah, mari kita lanjutkan.

Setelah menetapkan nilai routes configuration, gunakan nilainya menggunakan method <p style="border: 1px solid red; padding: 5px;">server.route()</p> pada berkas <p style="border: 1px solid red; padding: 5px;">server.js</p>. lihat kode yang dihitamkan yah.

**server.js**

```
const Hapi = require('@hapi/hapi');
const routes = require('./routes');


const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: 'localhost',
    });

    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
```

Simpan seluruh perubahan yang ada baik pada berkas routes.js dan server.js; jalankan ulang server dengan perintah <p style="border: 1px solid red; padding: 5px;"> npm run start; </p> dan coba lakukan permintaan ke server. Seharusnya server sudah bisa merespons sesuai dengan yang diharapkan.

```
curl -X GET http://localhost:5000
// output: Homepage
curl -X GET http://localhost:5000/about
// output: About page
curl -X GET http://localhost:5000/test
// output: Halaman tidak ditemukan
curl -X POST http://localhost:5000
// output: Halaman tidak dapat diakses dengan method tersebut
```