const fs = require('fs').promises;
const path = require('path');

const registrateUser = async (req, res) => {
  const { name, age, talk } = req.body;
  const talkerFile = path.resolve(__dirname, '..', './talker.json');
  const talker = JSON.parse(await fs.readFile(talkerFile));

  console.log("puts, ENTREI NO POST");

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

module.exports = registrateUser;
