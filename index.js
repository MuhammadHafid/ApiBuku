import express from 'express';
import bodyParser from 'body-parser';
import session from 'express-session';
import Route from './routes/Route';

const Index = express();
const PORT = 3000;

Index.set('view engine', 'ejs');
Index.use(bodyParser.urlencoded({ extended: false }));
Index.use(bodyParser.json());
Index.use(
  session({
    secret: 'rahasiaa',
    resave: true,
    saveUninitialized: true
  })
);

Index.use('/', Route);

Index.listen(PORT, err => {
  if (err) throw err;
  console.info(`Terkoneksi ke ${PORT}`);
});
