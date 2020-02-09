import express from 'express';
import alert from 'alert-node';
import db from '../database/sql';

const Route = express.Router();

Route.get('/login', (req, res) => res.render('login'));
Route.get('/daftar', (req, res) => res.render('register'));

Route.get('/tambahbuku', (req, res) => res.render('buku/tambahbuku'));

Route.post('/authlog', (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  const sql = 'SELECT * FROM user WHERE email = ? AND password = ?';
  if (email && password) {
    db.query(sql, [email, password], (err, rows) => {
      if (err) throw err;
      if (rows.length > 0) {
        req.session.loggedin = true;
        req.session.email = email;
        res.redirect('/');
      } else {
        alert('Wrong credentials!');
        res.redirect('/login');
      }
      res.end();
    });
  }
});

Route.post('/authreg', (req, res) => {
  let dataTeregistrasi = {
    nama: req.body.nama,
    email: req.body.email,
    password: req.body.password
  };
  db.query('INSERT INTO user SET ?', dataTeregistrasi, (err, results) => {
    if (err) throw err;
    console.log('Data masuk!', results);
    alert('Selamat! Anda telah terdaftar!');
    res.redirect('/login');
  });
});

Route.get('/', (req, res) => {
  if (req.session.loggedin) {
    res.render('beranda');
  } else {
    alert('Silahkan login!');
    res.redirect('/login');
  }
});

Route.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) throw err;
    res.redirect('/login');
  });
});

var buku = {};
Route.get('/listbuku', (req, res) => {
  const sql = 'SELECT * FROM buku';
  db.query(sql, (err, rows) => {
    if (err) throw err;
    buku = { buku: rows };
    res.render('buku/buku', buku);
  });
});

Route.post('/bukuu', (req, res) => {
  var data = {
    nama_buku: req.body.nama_buku,
    pengarang: req.body.pengarang,
    penerbit: req.body.penerbit,
    inti: req.body.inti
  };

  const insertBuku = `INSERT INTO buku SET ?`;
  db.query(insertBuku, data, (err, results, fields) => {
    if (!err) {
      alert('Buku tertambah!');
      console.log('Buku nambah: ', results);
      res.redirect('/');
    }
    console.log('Error terdeteksi:', err);
  });
});

Route.get('/hapus/:id_buku', (req, res) => {
  const { id_buku } = req.params;
  const update = `DELETE FROM buku WHERE id_buku = ?`;

  db.query(update, [id_buku], (err, rows) => {
    if (err) throw err;
    alert('Buku dihapuskan!');
    console.log('Hapuskan!:', rows.affectedRows);
    res.redirect('/listbuku');
  });
});

Route.get('/perbarui', (req, res) => {
  alert('Sebentar, masih ujicoba :3');
  res.redirect('/listbuku');
});

export default Route;
