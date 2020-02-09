import mysql from 'mysql';

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'buku',
  multipleStatements: true,
  debug: false
});

db.connect(err => {
  if (err) throw err;
  console.log('Terkoneksi ke db!');
});

export default db;
