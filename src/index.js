const express = require('express');

const loginPost = require('./routes/loginPost');
const talkerGet = require('./routes/talkerGet');
const talkerGetById = require('./routes/talkerGetById');

const {
  autenticationValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidatorI,
  rateValidatorII,
  registrateUser,
  updateUser,
  talkerDeleteById,
  getUserByQuery,
} = require('./helpers/index');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.get('/talker', talkerGet);

app.get('/talker/search', autenticationValidator, getUserByQuery);

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

app.put('/talker/:id',
  autenticationValidator,
  nameValidator,
  ageValidator,
  talkValidator,
  watchedAtValidator,
  rateValidatorI,
  rateValidatorII,
  updateUser);

app.delete('/talker/:id', autenticationValidator, talkerDeleteById);

app.listen(PORT, () => {
  console.log('Online');
});
