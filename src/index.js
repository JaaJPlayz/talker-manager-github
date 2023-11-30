const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const loginPost = require('./routes/loginPost');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', async (_req, res) => {
  const data = await fs.readFile(path.join(__dirname, 'talker.json'), 'utf8');
  const talker = JSON.parse(data);

  if (!talker) {
    res.status(200);
    res.send([]);
  }

  res.status(200);
  res.send(talker);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(path.join(__dirname, 'talker.json'), 'utf8');
  const talker = JSON.parse(data);

  if (!talker) {
    res.status(200);
    res.send([]);
  }

  const talkerById = talker.find((t) => t.id === Number(id));

  if (!talkerById) {
    res.status(404);
    res.send({ message: 'Pessoa palestrante não encontrada' });
  }

  res.status(200);
  res.send(talkerById);
});

app.post('/login', loginPost);

app.listen(PORT, () => {
  console.log('Online');
});
