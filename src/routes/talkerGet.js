const fs = require('fs').promises;
const path = require('path');

const talkerGet = async (_req, res) => {
  const data = await fs.readFile(path.join(__dirname, '..', 'talker.json'), 'utf8');
  const talker = JSON.parse(data);

  if (!talker) {
    res.status(200);
    res.send([]);
  }

  res.status(200);
  res.send(talker);
};

module.exports = talkerGet;
