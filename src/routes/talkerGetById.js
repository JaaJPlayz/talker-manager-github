const fs = require('fs').promises;
const path = require('path');

const talkersGetById = async (req, res) => {
  const { id } = req.params;
  const data = await fs.readFile(path.join(__dirname, '..', 'talker.json'), 'utf8');
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
};

module.exports = talkersGetById;
