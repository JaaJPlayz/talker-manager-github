const tokenGenerator = () => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let token = '';

  for (let i = 0; i < 16; i += 1) {
    token += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return token;
};

module.exports = tokenGenerator;
