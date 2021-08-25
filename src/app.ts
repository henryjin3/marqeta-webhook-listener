import express, { Application, Request, Response } from 'express';

const app: Application = express();

const port = process.env.PORT || 3001;

app.get('/world', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
