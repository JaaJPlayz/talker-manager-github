const fs = require('fs').promises;
const path = require('path');

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  const { name, age, talk } = req.body;
  const talkerFile = path.join(__dirname, '..', './talker.json');
  const data = await fs.readFile(talkerFile, 'utf8');
  const talker = JSON.parse(data);
  const talkerIdx = talker.findIndex((t) => t.id === Number(id));
  if (talkerIdx === -1) { 
    return res.status(404).json({ message: 'Pessoa palestrante não encontrada' }); 
  }
  talker[talkerIdx] = {
    id: Number(id),
    name,
    age,
    talk,
  };
  await fs.writeFile(talkerFile, JSON.stringify(talker, null, 2));
  res.status(200).json({ id: Number(id), name, age, talk: talker[talkerIdx].talk });
  return next();
};

module.exports = updateUser;
