const handleSignin = (req, res, knex, bcrypt) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(404).json('Incorrect form submission');
  }
  knex
    .select('email', 'hash')
    .from('login')
    .where({
      email: email,
    })
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return knex
          .select('*')
          .from('users')
          .where({
            email: email,
          })
          .then((user) => {
            res.json(user[0]);
          })
          .catch((err) => res.status(404).json('Unable to get the user.'));
      } else {
        res.status(404).json('Wrong credentials.');
      }
    })
    .catch((err) => res.status(404).json('Wrong credentials.'));
};

module.exports = {
  handleSignin: handleSignin,
};
