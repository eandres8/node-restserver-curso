// ============================================
// Pruerto
// ============================================
process.env.PORT = process.env.PORT || 3000;

// ============================================
// Entorno
// ============================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================================
// DB
// ============================================
let urlDB;

// if (process.env.NODE_ENV === 'dev') {
//     urlDB = 'mongodb://localhost:27017/cafe';
// } else {
//     urlDB = 'mongodb://<cafeUser>:<a123456>@ds141952.mlab.com:41952/cafe';
// }
urlDB = 'mongodb://cafeUser:a123456@ds141952.mlab.com:41952/cafe';

process.env.URL_DB = urlDB;