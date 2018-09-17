const passport = require('passport');
const {Strategy} = require('passport-local');
const {getUserByUserName} = require('../../models/User');

module.exports = function localStrategy () {
  passport.use(new Strategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    }, (username, password, done) => {

      getUserByUserName(username).then(
        (user) => {
          if (!user) {
            done(null, false);
          }
          if (user.password === password) {
            done(null, user);
          } else {
            done(null, false);
          }
        }
      );
    }));
};
