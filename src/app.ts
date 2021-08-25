import express, { Application, Request, Response } from 'express';
import fs from 'fs';

const app: Application = express();

const port = process.env.PORT || 3001;

app.get('/world', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});

app.use(express.json());
const FILE = './db.json';

app.post('/marqeta', function (req: Request, res: Response) {
  console.log(`Post received`);

  fs.readFile(FILE, function (err, data) {
    if (err) {
      res.status(500).send(err);
    }
    const oldData = data.toString();
    const db = oldData ? JSON.parse(oldData) : [];
    const newDb = [...db, req.body];

    fs.writeFile(FILE, JSON.stringify(newDb), function (err) {
      if (err) {
        res.status(500).send(err);
      }

      res.send('Request saved');
      console.log('Request saved');
    });
  });
});

app.get('/marqeta', function (req: Request, res: Response) {
  fs.readFile(FILE, function (err, data) {
    if (err) {
      res.status(500).send(err);
    }

    res.send(JSON.parse(data.toString()));
  });
});
