const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const loginPost = require('./routes/loginPost');
const talkerGet = require('./routes/talkerGet');
const talkerGetById = require('./routes/talkerGetById');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talkerGet);

app.get('/talker/:id', talkerGetById); 

app.post('/login', loginPost);

const autenticationValidator = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token não encontrado' });
  }
  if (authorization.length !== 16 || typeof authorization !== 'string') {
    return res.status(401).json({ message: 'Token inválido' });
  }
  next();
};

const nameValidator = async (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  }
  if (name.length < 3) {
    return res.status(400).json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  next();
};

const ageValidator = async (req, res, next) => {
  const { age } = req.body;
  if (!age || age === '') {
    return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  }
  if (!Number.isInteger(age) || age < 18) {
    return res.status(400).json(
      { message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' },
    );
  }
  next();
};

const talkValidator = async (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  }
  if (!talk.watchedAt) {
    return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  next();
};

const watchedAtValidator = async (req, res, next) => {
  const { talk } = req.body;
  const watchedAtRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!watchedAtRegex.test(talk.watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  next();
};

const rateValidatorI = async (req, res, next) => {
  const { talk } = req.body;
  console.log(talk);
  
  if (talk.rate === undefined || talk.rate === '') {
    return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
  }

  next();
};

const rateValidatorII = async (req, res, next) => {
  const { talk } = req.body;

  if (talk.rate === 0 || !Number.isInteger(talk.rate) || talk.rate < 1 || talk.rate > 5) {
    return res.status(400).json(
      { message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' },
    );
  }

  next();
};

const registrateUser = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerFile = path.resolve(__dirname, './talker.json');
  const talker = JSON.parse(await fs.readFile(talkerFile));

  const newTalker = {
    id: talker.length + 1,
    name,
    age,
    talk,
  };
  
  talker.push(newTalker);

  await fs.writeFile(talkerFile, JSON.stringify(talker));

  return res.status(201).json(newTalker);
};

app.post('/talker', 
  autenticationValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidatorI,
  rateValidatorII,
  registrateUser);

app.listen(PORT, () => {
  console.log('Online');
});
