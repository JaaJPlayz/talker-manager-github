const fs = require('fs').promises;
const path = require('path');

const talkerDeleteById = async (req, res, next) => {
  const { id } = req.params;
  const talkers = await fs.readFile(path.resolve(__dirname, '..', 'talker.json'), 'utf8');
  const talkersArray = JSON.parse(talkers);
  const talkerIndex = talkersArray.findIndex((talker) => talker.id === Number(id));
  talkersArray.splice(talkerIndex, 1);
  await fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), JSON.stringify(talkersArray));
  res.status(204).end();
  return next();
};

module.exports = talkerDeleteById;
