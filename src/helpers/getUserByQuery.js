const fs = require('fs').promises;
const path = require('path');

const getUserByQuery = async (req, res) => {
  const talkersJSON = await fs.readFile(path.resolve(__dirname, '..', './talker.json'), 'utf-8');
  const talkers = JSON.parse(talkersJSON);

  const { q } = req.query;

  if (q === undefined || q === '') {
    return res.status(200).json(talkers);
  }

  if (!talkers.some((talker) => talker.name.includes(q))) {
    return res.status(200).send([]);
  }

  if (talkers.some((talker) => talker.name.includes(q))) {
    return res.status(200).json(talkers.filter((talker) => talker.name.includes(q)));
  }

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
};

module.exports = getUserByQuery;