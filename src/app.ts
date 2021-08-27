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

  //Authenticate for 'marqeta:MarqetaNeeds2HaveLongPasswords!'
  const authBuffer = Buffer.from(
    'marqeta:MarqetaNeeds2HaveLongPasswords!'
  ).toString('base64');
  if (req.headers.authorization !== `Basic ${authBuffer}`) {
    return res.status(401).send('Authentication required');
  }

  fs.readFile(FILE, function (err, data) {
    if (err) {
      return res.status(500).send(err);
    }

    //Get the old data and add in the new body
    const oldData = data.toString();
    const db = oldData ? JSON.parse(oldData) : [];
    const newDb = [...db, req.body];

    fs.writeFile(FILE, JSON.stringify(newDb), function (err) {
      if (err) {
        return res.status(500).send(err);
      }

      return res.send(`Request saved, current count: ${newDb.length}`);
    });
  });
});

app.get('/marqeta', function (req: Request, res: Response) {
  fs.readFile(FILE, function (err, data) {
    if (err) {
      return res.status(500).send(err);
    }
    const dataString = data.toString();
    if (!dataString) {
      return res.status(204).send('empty file');
    }
    return res.send(JSON.parse(dataString));
  });
});
