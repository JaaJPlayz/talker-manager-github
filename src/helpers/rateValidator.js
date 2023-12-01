const rateValidatorI = async (req, res, next) => {
  const { talk } = req.body;
  
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

module.exports = {
  rateValidatorI,
  rateValidatorII,
};
