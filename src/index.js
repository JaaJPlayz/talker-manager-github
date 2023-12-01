const express = require('express');

const loginPost = require('./routes/loginPost');
const talkerGet = require('./routes/talkerGet');
const talkerGetById = require('./routes/talkerGetById');

const autenticationValidator = require('./helpers/autenticationValidator');
const nameValidator = require('./helpers/nameValidator');
const ageValidator = require('./helpers/ageValidator');
const talkValidator = require('./helpers/talkValidator');
const watchedAtValidator = require('./helpers/watchedAtValidator');
const { rateValidatorI, rateValidatorII } = require('./helpers/rateValidator');
const registrateUser = require('./helpers/registrateUser');

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
