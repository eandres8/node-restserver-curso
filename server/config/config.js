// ============================================
// Pruerto
// ============================================
process.env.PORT = process.env.PORT || 3000;

// ============================================
// Entorno
// ============================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ============================================
// Vencimiento token 
// ============================================
// 60 seg * 60 min * 24 h * 30 d
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ============================================
// SEED desarrollo
// ============================================
process.env.SEED = process.env.SEED || 'secret-SEED-dev';

// ============================================
// DB
// ============================================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URL_DB = urlDB;